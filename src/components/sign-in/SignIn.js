import React from "react";
import './SignIn.css';
import Tags from "../tags/Tags";
import {USER_SESSION_KEY, signedIn, isOldThan18YearsOld, authOnApi, apiToken} from "../../services/Util";
import {withRouter} from "react-router-dom";



class SignIn extends React.Component {
    constructor(props) {
        super(props);

        //? Authenticate to get the Token that will allow any further call to the API
        

        //! 3. Comprobar si ya ha iniciado sesión, si es así redirigir a /home
        if (signedIn()) {
            props.history.push("/home")
        } else {
            props.history.push("/sign-in")
        }

        
        authOnApi();
        console.log(apiToken)

        this.state = {
            name: "",
            surname: "",
            birthday: ""
        };

        this.handleTyping = this.handleTyping.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

       

    handleTyping(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSignIn(e) {
        e.preventDefault();

        const {name, surname, birthday, tag} = this.state;

        //! 3. Realizar las validaciones de name, surname y birthday. Debe ser mayor de 18 años
        if (this.state.name.trim().length < 4) {
            alert("Your name cannot be this short. We need at least 4 characters");
            return;
          }

        if (this.state.surname.trim().length < 4) {
            alert("Your second name cannot be this short. We need at least 4 characters");
            return;
        }

        if (!isOldThan18YearsOld(this.state.birthday)){
            alert("We are sorry, but you have to be at least 18 years old");
            return;
        }

        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify({
            name: name.trim(),
            surname: surname.trim(),
            birthday,
            tag: tag && tag.trim().length ? tag.trim() : null
        }));

        this.props.history.push("/home/search")
    }

    render() {
        return (
            <div className={`contact-us container`}>
                <h2>Welcome to Wallakeep!</h2>
                <h4>Please sign up to continue</h4>

                <form className="row mt-4" onSubmit={this.handleSignIn}>
                    <div className="col-4">
                        <input type="text" name="name" value={this.state.name} className={`form-control`} onChange={this.handleTyping} placeholder="Name"/>
                    </div>
                    <div className="col-4">
                        <input type="text" name="surname" value={this.state.surname} className={`form-control`} onChange={this.handleTyping} placeholder="Surname"/>
                    </div>
                    <div className="col-4">
                        <input type="date" name="birthday" value={this.state.birthday} className={`form-control`} onChange={this.handleTyping} placeholder="Birthday" />
                    </div>
                    <div className="col-4 mt-4">
                        <Tags name="tag" onTagChange={this.handleTyping} firstOptionName="Favourite tag" class="form-control" value={this.state.tag}/>
                    </div>

                    <div className="col-12 mt-4">
                        <button className="btn-primary btn">Sign in</button>
                    </div>
                    
                </form>

            </div>
        );
    }
}

export default withRouter(SignIn);

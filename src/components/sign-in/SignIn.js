import React from "react";
import './SignIn.css';
import Tags from "../tags/Tags";
import Header from "../header/Header";
import {USER_SESSION_KEY, signedIn, isOldThan18YearsOld} from "../../services/Util";
import {withRouter} from "react-router-dom";

//? An auth request will be sent to nodepop API through Tags component asking for a valid token that will be stored on Session Storage.
//? That´s the easiest way I found to do it, but I'm not quite sure if that´s the best place to do it.

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        //* 3. Comprobar si ya ha iniciado sesión, si es así redirigir a /home
        if (signedIn()) {
            props.history.push("/home")
        } else {
            props.history.push("/sign-in")
        }


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

        //* 3. Realizar las validaciones de name, surname y birthday. Debe ser mayor de 18 años
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
            <div>
            <Header />
            <div className={`container`} id="signInForm">
                <div className={`row justify-content-center`}>
                    <form className={`col-4`} onSubmit={this.handleSignIn}>
                        <div>
                            <h3>Please Sign In</h3>
                        </div>
                        <div>
                            <input type="text" name="name" value={this.state.name} className={`form-control`} onChange={this.handleTyping} placeholder="Name"/>
                        </div>
                        <div>
                            <input type="text" name="surname" value={this.state.surname} className={`form-control`} onChange={this.handleTyping} placeholder="Surname"/>
                        </div>
                        <div>
                            <input type="date" name="birthday" value={this.state.birthday} className={`form-control`} onChange={this.handleTyping} placeholder="Birthday" />
                        </div>
                        <div>
                                <Tags name="tag" onTagChange={this.handleTyping} firstOptionName="Favourite tag" class="form-control" value={this.state.tag}/>
                        </div>
                        <div>
                            <button className="btn-info btn">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(SignIn);

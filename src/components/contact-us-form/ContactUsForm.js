import React from "react";
import "./ContactUsForm.css";
import {signedIn, currentUser} from "../../services/Util";


//! 3. El nombre y apellidos del formulario deben inicializarse a los valores del nombre y apellidos del currentUser()

const initialState = () => {
    return {
        name: currentUser().name.length ? currentUser().name.trim() : "",
        surname: currentUser().surname.length ? currentUser().surname.trim() : "",
        subject: "" ,
        message: ""
    }
};


export default class ContactUsForm extends React.Component {
    constructor(props) {
        super(props);

        //! 3. Comprobar que el usuario se ha registrado
        if (!signedIn()) {
            props.history.push("/sign-in")
        }

        this.state = initialState();
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
    }

    //! 3. Gestionar el formulario y verificar la información (onChange)
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
    
        this.setState({
          [name]: value
        });
      }

     //! 3. Una vez verificada enviar a través de this.props.onSubmit
    handleSubmit(event){
        event.preventDefault();
        const { name, surname, subject, message } = this.state;

        if(!this.fieldValidation(name, 4, "Name")) return;
        if(!this.fieldValidation(surname, 4, "Surname")) return;
        if(!this.fieldValidation(subject, 5, "Subject")) return;
        if(!this.fieldValidation(message, 10, "Message")) return;
            
        this.props.onSubmit({
            name, 
            surname,
            subject,
            message
          });
    }

    fieldValidation(fieldValue, minChars, fieldName){
       
        if (fieldValue.trim().length === 0) {
            alert(`The ${fieldName} cannot be empty`);
            return false            
        } 
        
        if (fieldValue.trim().length <= minChars) {
            alert(`The ${fieldName} must be bigger than ${minChars} characters`);
            return false
        } 
        
        return true    
    }


    render() {
        return <>
            <h4 className={`ml-2 mb-4`}>Contact with the WallaKeep team</h4>

            <form onSubmit={this.handleSubmit}>
                <div>
                    <h5 className={`ml-2`}><b>Name</b></h5>
                    <input className={`form-control d-block contact-form-input`} type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div>
                    <h5 className={`ml-2`}><b>Surname</b></h5>
                    <input className={`form-control d-block contact-form-input`} type="text" name="surname" value={this.state.surname} onChange={this.handleChange}/>
                </div>
                <div>
                    <h5 className={`ml-2`}><b>Subject</b></h5>
                    <input className={`form-control d-block contact-form-input`} type="text" name="subject" value={this.state.subject} onChange={this.handleChange}/>
                </div>
                <div>
                    <h5 className={`ml-2`}><b>Message</b></h5>
                    <textarea className={`form-control d-block contact-form-input`} name="message" cols="30" rows="10" value={this.state.message} onChange={this.handleChange}/>
                </div>
                <div className={`ml-2`}>
                    <button type="submit" className="btn-primary btn">Save</button>
                </div>
            </form>
        </>;
    }
}

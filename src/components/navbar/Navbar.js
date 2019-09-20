import {Link, withRouter} from "react-router-dom";
import React from "react";
import './Navbar.css';
import {currentUser, logout, signedIn} from "../../services/Util";

// ESTE FICHERO NO HAY QUE TOCARLO

const HOME_PATH = "/home/";
const SEARCH_PATH = "/home/search";
const CONTACT_US_PATH = "/home/contact-us";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        //* 3. Comprobar que el usuario se ha registrado
        if (!signedIn()) {
            props.history.push("/sign-in")
        }

        this.state = {
            location: props.location.pathname
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        logout();
        this.props.history.push("/sign-in")
    }

    isActive(path) {
        return this.props.location.pathname.toLowerCase() === path ? "active" : "";
    }

    render() {
        return (
            <div className="container" id="navbar">
                <button className={`btn btn-info ${this.isActive(HOME_PATH)}`}><
                    Link to={HOME_PATH}> Home </Link>
                </button>
                <button className={`btn btn-info ${this.isActive(SEARCH_PATH)}`}>
                    <Link to={SEARCH_PATH}> Search </Link>
                </button>
                <span className={`btn btn-info ${this.isActive(CONTACT_US_PATH)}`}>
                    <Link to={CONTACT_US_PATH}> Contact us </Link>
                </span>
                <button className={`btn btn-dark float-right`} onClick={this.logout}>
                    {currentUser() && <h5 className={`user-info`}>{currentUser().name} {currentUser().surname}</h5>}
                    <span>Log out</span>
                </button>
            </div>
        );
    }
}

export default withRouter(Navbar);

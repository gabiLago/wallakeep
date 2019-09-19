import React from "react";
import './Home.css';
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import SaleSearch from "../sale-search/SaleSearch";
import ContactUs from "../contact-us/ContactUs";
import {Route} from "react-router-dom";
import {signedIn} from "../../services/Util";
import SaleItemFullScreen from "../sale-item-full-screen/SaleItemFullScreen"
import ErrorBoundary from "../error-boundary/ErrorBoundary"



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
        //* 3. Comprobar que el usuario se ha registrado
        if (!signedIn()) {
            props.history.push("/sign-in")
        }
    }

    render() {

            return( 
                <div>
                    <div className="App">
                        <Header />
                        <Navbar/>
                        <ErrorBoundary>
                        {
                        //* 1. Aquí se añadiría el error boundary para que si la aplicación sufre un fallo se controle y se muestre un mensaje
                        //* 1. Crear la ruta correspondiente a el componente SaleItemFullScreen, para más información ver el componente. 
                        }
                        
                            <Route exact path="/home/" component={() => (<div className="container home">
                                <i>What are you looking for? A car? A bicycle? then...</i>
                                <h2>This is your place!</h2>
                            </div>)}/>                
                            <Route exact path={`${this.props.match.path}/search`} component={SaleSearch}/>                    
                            <Route exact path={`${this.props.match.path}/contact-us`} component={ContactUs}/>
                            <Route exact path={`${this.props.match.path}/sale/:id`} component={SaleItemFullScreen}/>
                        </ErrorBoundary>
                    </div>
                </div>
            )    
    }
}

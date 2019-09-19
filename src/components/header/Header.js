import React from "react";


export default class Header extends React.Component {
    render() {
        return(
                <header className="App-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-5 logo-text">
                                <h1>Welcome to <b>WallaKeep</b></h1>
                                <h6><i>The place where you can keep everything.</i></h6>
                            </div>
                            <div className="col-7">
                                <div className="row">
                                    <div className="container-logo col-8">
                                        <div className="logo-bgr">
                                            <h1><b>WK</b></h1>
                                        </div>
                                    </div>
                                    <div className="logo-end-cover col-4"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
        )
    }
}
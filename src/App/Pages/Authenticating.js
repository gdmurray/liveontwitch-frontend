import React, {Component} from 'react';
import {authenticationService} from "../../_services/authentication.service"

export default class Authenticating extends Component{
    constructor(props){
        super(props);
    }

    goToHome = ( ) => {
        this.props.history.push("/");
    }
    componentDidMount(){
        authenticationService.callback(this.goToHome);
    }

    
    render(){
        return (
            <div>
                Checking authentication status
            </div>
        )
    }
}
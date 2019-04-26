import React, {Component} from 'react';
import {authenticationService} from "../../_services/authentication.service"
import { Loader, Container, Segment } from 'semantic-ui-react';
import Navbar from "../components/Navbar";

export default class Authenticating extends Component{
    constructor(props){
        super(props);
    }

    goToHome = (token) => {
        this.props.history.push("/", {"token": token});
    }
    componentDidMount(){
        authenticationService.callback(this.goToHome);
    }

    
    render(){
        return (
            <div>
                <Navbar/>
                <Container style={{padding: '1rem'}}>
                    <Segment placeholder>
                        <Loader active={true}>Authenticating User</Loader>
                    </Segment>
                </Container>
            </div>
        )
    }
}
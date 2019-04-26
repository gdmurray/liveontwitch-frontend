import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import {} from "../../functions";
import Navbar from "../components/Navbar";
import {authenticationService} from "../../_services/authentication.service";
import {
    Menu,
    Button,
    Segment,
    Header,
    Icon
} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

class Connect extends Component{
    constructor(props){
        super(props);
    }
    connectTwitch = () => {
        authenticationService.connect(this.props);
    }
    render(){
        return(
            <div>
            <Navbar/>
            <Container style={{padding: '1rem'}}>
                <Segment placeholder>
                    <Header icon>
                    <Icon name='twitch' />
                        Connect Your Twitch Account
                    </Header>
                    <Button onClick={() => this.connectTwitch()} color="violet">Connect</Button>
                </Segment>
            </Container>
            </div>
        )
    }
}

export default withRouter(Connect);
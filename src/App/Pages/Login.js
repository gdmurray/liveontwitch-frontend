import React, {Component} from 'react';
import Navbar from "../components/Navbar";
import {
    Segment,
    Container,
    Header,
    Button,
    Icon,
} from 'semantic-ui-react';
import { authenticationService } from '../../_services/authentication.service';

export default class Login extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Navbar/>
                <Container style={{padding: '1rem'}}>
                <Segment placeholder>
                    <Header icon>
                    <Icon name='twitch' />
                        Log In To LiveOnTwitch
                    </Header>
                    <Button onClick={() => authenticationService.connect()} color="violet">Log In</Button>
                </Segment>
            </Container>
            </div>
        )
    }
}

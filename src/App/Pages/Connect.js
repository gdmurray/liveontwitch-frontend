import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import {} from "../../functions";
import {authenticationService} from "../../_services/authentication.service";
import {
    Menu,
    Button,
    Segment,
    Header,
    Icon
} from 'semantic-ui-react';

export default class Connect extends Component{
    constructor(props){
        super(props);
    }
    connectTwitch = () => {
        authenticationService.connect();
    }
    render(){
        return(
            <div>
            <div className="splash-navbar">
                <Container>
                    <Menu secondary className="splash-menu">
                        <Menu.Header className="site-logo">
                            liveontwitch
                        </Menu.Header>
                        <Menu.Item position="right">
                            <Button inverted size="small" className="login-button">
                                Login
                            </Button>
                        </Menu.Item>
                    </Menu>
                </Container>
            </div>
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
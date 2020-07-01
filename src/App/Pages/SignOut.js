import React, {Component} from 'react';
import Navbar from "../components/Navbar";
import axios from '../../_services/axios';
import {LOG_OUT} from "../../constants";
import {
    Segment,
    Container,
    Header,
    Button,
    Icon,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-dom';
import { preSignOut } from '../../_services/authentication.service';
const qs = require('querystring');

class SignOut extends Component{
    componentDidMount(){
        var token = sessionStorage.getItem('access_token');
        preSignOut();
        if(token !== undefined){
            axios.post(LOG_OUT, qs.stringify({
                token: token,
                client_id: process.env.REACT_APP_LIVE_CLIENT_ID
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
            }).then(response => {
                this.props.history.push('/splash');
            }).catch(error => {
                this.props.history.push('/splash')
            })
        }
    }
    render(){
        return (
            <div>
                <Navbar />
                <Container style={{padding: '1rem'}}>
                    <Segment placeholder>
                        <Header icon as='h3'>
                        <Icon name='twitch' />
                            Signing Out
                        </Header>
                    </Segment>
                </Container>
            </div>
        )
    }
}

export default withRouter(SignOut);
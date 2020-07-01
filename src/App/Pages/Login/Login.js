import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import {
    Segment,
    Container,
    Header,
    Button,
    Icon,
    Message,
    Form
} from 'semantic-ui-react';
import { authenticationService } from '../../../_services/authentication.service';
import { Field, reduxForm } from 'redux-form';
import "./login.css";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar />
                <Container style={{ padding: '1rem' }}>
                    <Segment textAlign='center' stacked className='login-segment'>
                        <div className='login-form-div'>
                            <Form size='small'>

                                <Header as='h2' style={{ color: 'var(--theme-primary-color)' }} textAlign='center'>
                                    Log in to LiveonTwitch Account
                        </Header>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                />
                                <Button color='teal' fluid size='large'>
                                    Login
                </Button>
                            </Form>
                        </div>
                    </Segment>
                    <Message icon className='login-segment'>
                        <Icon name='twitch' />
                        <Message.Content>
                            <div>
                                <Message.Header><Button onClick={() => authenticationService.connect(this.props, true)} color="violet">Or Log In Through Twitch </Button></Message.Header>
                            </div>
                        </Message.Content>
                    </Message>
                </Container>
            </div>
        )
    }
}

export default reduxForm({
    form: "loginForm"
})(Login); 
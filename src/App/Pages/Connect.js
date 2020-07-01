import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import {} from "../../functions";
import Navbar from "../components/Navbar";
import {authenticationService} from "../../_services/authentication.service";
import { push } from 'connected-react-router'
import {
    Menu,
    Button,
    Segment,
    Header,
    Icon, Grid, Divider
} from 'semantic-ui-react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom';

class Connect extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
            <Navbar/>
            <Container style={{padding: '1rem'}}>
                <Segment placeholder>
                    <Divider vertical>Or</Divider>
                    <div className="get-started-container">
                        <div>
                            <Header icon>
                                <Icon name='twitch' />
                                    Connect Your Twitch Account
                                </Header>
                            <Button onClick={() => authenticationService.connect(this.props, true)} color="violet">Connect</Button>
                        </div>
                        <div>
                            <Header icon>
                                <Icon name='user' />
                                Register an Account
                            </Header>
                            <Button onClick={() => this.props.register()} color="green">Register</Button>
                        </div>
                    </div>
                </Segment>
            </Container>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    register: () => push('/register'),
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Connect);
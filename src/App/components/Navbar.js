import React, {Component} from 'react';
import {authenticationService} from "../../_services/authentication.service";

import {
    Segment,
    Menu,
    Container,
    Header,
    Button,
    Icon,
    Grid

} from 'semantic-ui-react';
import "../Pages/splash.css";
import {withRouter} from 'react-router-dom';

class Navbar extends Component{
    constructor(props){
        super(props);
    }

    goSplash = () => {
        this.props.history.push("/splash");
    }

    goLogin = () => {
        authenticationService.connect(this.props);
    }
    render(){
        return (
            <div className="splash-navbar">
                <Container>
                    <Menu secondary className="splash-menu">
                        <Menu.Header className="site-logo" onClick={this.goSplash} style={{cursor: 'pointer'}}>
                            liveontwitch
                        </Menu.Header>
                        <Menu.Item position="right">
                            <Button inverted size="small" className="login-button" onClick={this.goLogin}>
                                Login
                            </Button>
                        </Menu.Item>
                    </Menu>
                </Container>
            </div>
        )
    }
}
export default withRouter(Navbar);
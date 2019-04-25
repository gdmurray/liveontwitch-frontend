import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {faUserShield, faPlus} from '@fortawesome/free-solid-svg-icons';
import {TWITTER_ACCOUNTS_URL, TWITTER_AUTH_URL} from "../../constants";
import {authenticationService} from "../../_services/authentication.service";
import AppSidebar from '../components/Sidebar';
import "./dashboard.css";
import {
    Sidebar, 
    Container, 
    Menu, 
    Comment, 
    Segment, 
    Loader, 
    Icon, 
    Input, 
    Header,
    Button,
    Accordion
} from 'semantic-ui-react';
import { connectTwitter } from '../../functions';

const axios = require('axios');

export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasAccounts: false,
            accounts: []
        }
    }
    componentWillMount(){
        authenticationService.prepareAuth();
    }
    componentDidMount(){
        axios.get(TWITTER_ACCOUNTS_URL).then((response) => {
            this.setState({
                accounts: response.data,
                isLoading: false
            });
        }).catch((error) => {
            this.setState({
                isLoading: false
            });
            if(error.response){
                if(error.response.status === 401){
                    authenticationService.connect();
                }
            }
        });
    }
    accountslist = () => {
        const {accounts, isLoading} = this.state;
        if(accounts.length == 0){
            if(isLoading){
                return(
                    <div>
                        <Loader active={true}>Loading...</Loader>
                    </div>
                )
            }else{
                return (
                    <Segment placeholder>
                        <Header icon>
                        <Icon name='twitter' />
                            No Twitter Accounts Linked Yet 
                        </Header>
                        <Button primary className="connect-twitter" onClick={() => connectTwitter()}>Link Account &nbsp;<FontAwesomeIcon icon={faPlus}/></Button>
                    </Segment>
                )
            }
        }else{
            localStorage.setItem('accounts', JSON.stringify(accounts));
            return(
                <div>
                    <Header as="h5">Accounts (1)</Header>
                    <ul className="accounts-list">
                        {accounts.map(item => <li className="twitter-account" key={item.uid}>
                            <div className="status">
                                <Icon name="circle"/>
                            </div>
                            <div className="username">
                                @{item.username}
                            </div>
                            <div className="configure">
                                <Icon name="ellipsis horizontal"/>
                            </div>
                        </li>)}
                    </ul>
                </div>
            )
        }
    }

    
    render(){
        const {accounts} = this.state;
        return (
            <div className="core-content">
            <Container>
                <AppSidebar accounts={accounts}/>
                <Container>
                    <div className="inner-content">
                        { this.accountslist() }
                    </div>
                </Container>
            </Container>
            </div>
        )
    }
}
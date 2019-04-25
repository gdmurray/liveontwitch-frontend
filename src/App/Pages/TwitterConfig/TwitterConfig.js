import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AppSidebar from '../../components/Sidebar';
import {TWITTER_CONFIG_DETAIL, POSITIONING} from "../../../constants";
import {authenticationService} from "../../../_services/authentication.service";
import TwitterConfigControl from "./TwitterConfigControl";
import TwitterConfigSettings from "./TwitterConfigSettings";

import {
    Button,
    Header,
    Loader,
    Image,
    Label,
    Tab,
} from 'semantic-ui-react';

const axios = require('axios');

class TwitterConfig extends Component{
    constructor(props){
        super(props);
        this.state = {
            loadingUser: true,
            account: null,
            accountData: null,
        }
    }

    componentWillMount(){
        authenticationService.prepareAuth();
        var {account} = this.props.match.params;
        const accounts = JSON.parse(localStorage.getItem('accounts'));
        var result = accounts.filter(elem => elem.username == account);
        if(result.length === 1){
            this.setState({
                account: result[0]
            })
        }
    }

    componentDidMount(){
        const {account} = this.state;
        axios.get(`${TWITTER_CONFIG_DETAIL}${account.uid}/`).then(
            (response) => {
                this.setState({
                    accountData: response.data,
                    //username_config: response.data.config.username_config,
                    //username_config_updated: moment(response.data.config.username_config.updated).format("MMM Do H:mm a"), 
                    //bio_config: response.data.config.bio_config,
                    //bio_config_updated: moment(response.data.config.bio_config.updated).format("MMM Do H:mm a"),
                    loadingUser: false
                });
            }).catch((error) => {
                if(error.response.status == 401){
                    authenticationService.connect();
                }
            });
    }

    getHeader = (panes) => {
        const {loadingUser, accountData} = this.state;
        if(loadingUser){
            return (
                <div className="twitter-navbar loading">
                    <Header as='h4'><Loader active={true} inline size="small"></Loader>       Loading User...</Header>
                </div>
            )
        }else{
            return(
                <div className={"twitter-navbar"}>
                    <div className="navbar-content">
                        <Header as='h3'>
                            <Image src={accountData.profile_image_url_https} avatar />
                            <Header.Content>
                                {accountData.name}
                                <Header.Subheader>@{accountData.username}</Header.Subheader>
                            </Header.Content>
                        </Header>
                        <div>
                            <Label color={accountData.config.active ? 'green': 'yellow'}
                            >Config Status: {accountData.config.active ? 'Active': 'Not Active'}</Label>
                        </div>
                    </div>
                    <Tab className="twitter-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />
                </div>
            )
        }
    }

    accountDataCallback = (data) => {
        this.setState({
            accountData: data
        });
    }
    render(){
        const{loadingUser, accountData} = this.state;
        var panes = [
            //{menuItem: 'Setup', render: () => <Tab.Pane attached={false}>How to Do this</Tab.Pane>},
            {menuItem: 'Configuraton', render: () => <Tab.Pane>
                <TwitterConfigControl accountData={this.state.accountData} account={this.state.account}
                 accountDataCallback={this.accountDataCallback}/>
            </Tab.Pane>},
            {menuItem: 'Settings', render: () => <Tab.Pane>
                <TwitterConfigSettings accountData={this.state.accountData} account={this.state.account}/>
                </Tab.Pane>}
        ]
        return(
            <div className="core-content">
                <AppSidebar/>
                {this.getHeader(panes)}
            </div>
        )
    }
}
export default withRouter(TwitterConfig);
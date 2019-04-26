import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AppSidebar from '../../components/Sidebar';
import {TWITTER_CONFIG_DETAIL, TWITTER_REFRESH_DATA} from "../../../constants";
import {formatSince} from "../../../functions";
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
    Icon,
} from 'semantic-ui-react';

const axios = require('axios');

class TwitterConfig extends Component{
    constructor(props){
        super(props);
        this.state = {
            loadingUser: true,
            account: null,
            accountData: null,
            last_refreshed: null,
        }
    }

    componentWillMount(){
        authenticationService.prepareAuth(this.props);
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
                    last_refreshed: formatSince(response.data.updated),
                    loadingUser: false
                });
            }).catch((error) => {
                if(error.response.status == 401){
                    authenticationService.connect();
                }else if(error.response.status == 404){
                    console.log("Account Doesnt Exist, Push Update to frontend");
                    this.props.history.push("/");
                }
            });
    }

    handleAccountDataRefresh = () => {
        const {account} = this.state;
        this.setState({
            loadingUser: true
        })
        axios.get(`${TWITTER_REFRESH_DATA}${account.uid}/`).then(
            (response) => {
                this.setState({
                    accountData: response.data,
                    last_refreshed: formatSince(response.data.updated),
                    loadingUser: false
                })
            }
        )
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
                                <Header.Subheader>@{accountData.username} <span className="refreshed">Last Refreshed&nbsp;{this.state.last_refreshed}</span></Header.Subheader>
                            </Header.Content>
                        </Header>
                        <div className="navbar-controls">
                            <Label color={accountData.config.active ? 'green': 'yellow'}>
                                Config Status: {accountData.config.active ? 'Active': 'Not Active'}
                            </Label>
                            <Button color="blue" size="mini" onClick={this.handleAccountDataRefresh}>
                                Refresh Twitter Info&nbsp;&nbsp;<Icon name="refresh"/>
                            </Button>
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
                <TwitterConfigSettings accountData={this.state.accountData} account={this.state.account}
                    accountDataCallback={this.accountDataCallback}/>
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
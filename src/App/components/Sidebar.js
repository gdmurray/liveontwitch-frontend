import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {faUserShield, faPlus, faCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {TWITCH_ACCOUNT_SIDEBAR_INFO} from "../../constants";
import {authenticationService} from "../../_services/authentication.service";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

import './sidebar.css';

import {
    Sidebar, 
    Container, 
    Menu, 
    Image, 
    Dropdown, 
    Icon, 
    Input, 
    Header,
    Button,
    Accordion
} from 'semantic-ui-react';
import { connectTwitter } from '../../functions';

var SETTINGS_SIDEBAR = [
    {
      "title": "Account Settings",
      "url": "/settings/profile",
      "icon": faCog
    },
    {
      "title": "Terms of Service",
      "url": "/terms",
      "icon": faFileAlt
    },
    {
      "title": "Privacy Policy",
      "url": "/privacy",
      "icon": faUserShield,
    },
    {
      "title": "Source Code",
      "url": "/src",
      "icon": faGithub
    },
    {
    "title":  "Sign Out",
    "url": "/logout",
    "icon": faSignOutAlt
    },
  ]

const axios = require('axios');

class AppSidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTabs: {
                0: false,
                1: false
            },
            accounts: [],
            liveInfo: {
                is_live: false,
                viewers: 0,
                game: null,
            }
        }
        
    }
    componentWillMount(){
        authenticationService.prepareAuth(this.state);
    }
    componentWillReceiveProps(newProps){
        if(newProps.accounts !== undefined){
            this.setState({accounts: newProps.accounts});
        }
    }


    componentDidMount(){
        if(this.props.accounts === undefined){
            this.setState({
                accounts: JSON.parse(localStorage.getItem('accounts'))
            })
            axios.get(TWITCH_ACCOUNT_SIDEBAR_INFO)
                .then(response => {
                    this.setState({
                        liveInfo: response.data
                    })
                })
        }
    }
    
    handleItemClick = (e, index) => {
        var url = e.target.getAttribute('data-url');
        if(url != undefined){
            this.props.goTo(url);
        } else if(e.target.href === undefined && e.target.type === undefined){
            var {activeTabs} = this.state;
            activeTabs[index] = !activeTabs[index]
            this.setState({
                activeTabs: activeTabs
            });
        }
    }

    getAccountsDropdown = () => {
        const {accounts} = this.state;
        if(accounts.length === 0){
            return(
                <ul className="sidebar-accounts-list">
                    <li className="add-account" onClick={() => connectTwitter()}><Icon name="plus square"/> Add Account</li>
                </ul>
            )
        }else{
            return(
                <ul className="sidebar-accounts-list">
                    {accounts.map(item => 
                        <li className="sidebar-account-subitem" key={item.uid}>
                            <Link to={`/twitter/${item.username}`}>{item.username}</Link>
                        </li>)}
                    <li className="add-account" onClick={() => connectTwitter()}><Icon name="plus square"/> Add Account</li>
                </ul>
            )
        }
    }

    getLiveInfo(liveInfo){
        
        if(liveInfo.is_live){
            return (<div className="live-info">
                <span>{liveInfo.game}</span>
                <div><div className="live-icon"></div>{liveInfo.viewers}</div>
            </div>)
        }else{
            return 'Offline'
        }
    }
    getTwitchInfo = () => {
        var content = localStorage.getItem("userInfo");
        if(content){
            var data = JSON.parse(content);
            const {liveInfo} = this.state;
            return (
                <Header as='h5'>
                    <Image circular src={data.logo} /> 
                    <Header.Content>
                    {data.display_name}
                    <Header.Subheader>{this.getLiveInfo(liveInfo)}</Header.Subheader>
                    </Header.Content>
                </Header>
            )
        }else{
            return '';
        }
    }
    getSettingSidebarItems(){
        var elems = [];
        for(var item of SETTINGS_SIDEBAR){
            elems.push(<li key={item.title.replace(' ', '-')} data-url={item.url}><FontAwesomeIcon icon={item.icon}/>&nbsp;&nbsp;{item.title}</li>)
        }
        return elems;

    }
    //this.setState({ activeItem: name })
    render(){
        const {activeTabs, accounts} = this.state;
        return(
            <Sidebar as={Menu} visible={true} className='app-sidebar' vertical>
                    <div className="top">
                        <Menu.Item>
                            <Header as='h1' className='app-header'>liveontwitch</Header>
                        </Menu.Item>

                        <Menu.Item className="side-element" onClick={() => this.props.goToHome()}>
                            <span>HOME</span>
                        </Menu.Item>
                        <Accordion as={Menu} vertical secondary className="sidebar-accordion">
                            <Menu.Item className={activeTabs[0] ? 'active side-element': 'side-element'}
                                        onClick={(e) => this.handleItemClick(e, 0)} 
                                        as="div">
                                <Accordion.Title
                                    index={0}
                                    active={activeTabs[0]}
                                    >
                                    <Icon name='dropdown' />
                                    <span><Icon name="twitter"/> ACCOUNTS</span>
                                </Accordion.Title>
                                <Accordion.Content active={activeTabs[0]} content={this.getAccountsDropdown()}/>
                            </Menu.Item>

                            <Menu.Item className={activeTabs[1] ? 'active side-element': 'side-element'}
                                        onClick={(e) => this.handleItemClick(e, 1)}
                                        as="div">
                            <Accordion.Title
                                    index={1}
                                    active={activeTabs[1]}
                                    >
                                    <Icon name='dropdown' />
                                    <span><Icon name="cog"/> SETTINGS</span>
                                </Accordion.Title>
                                <Accordion.Content active={activeTabs[1]}>
                                    <ul className="sidebar-accounts-list">
                                        {this.getSettingSidebarItems()}
                                    </ul>
                                </Accordion.Content>
                            </Menu.Item>
                        </Accordion>
                    </div>
                    <div className="bottom">
                        {this.getTwitchInfo()}
                    </div>
            </Sidebar>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    goToHome: () => push('/'),
    goTo: (url) => push(url)
}, dispatch);

const mapStateToProps = state => ({
    location: state.router.location
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppSidebar));
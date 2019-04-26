import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {faUserShield, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Link,withRouter} from 'react-router-dom';
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



class AppSidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTabs: {
                0: false,
                1: false
            },
            accounts: []
        }
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
        }
    }
    
    handleItemClick = (e, index) => {
        if(e.target.href === undefined){
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
    goToHome = ( ) => {
        this.props.history.push('/');
    }

    getTwitchInfo = () => {
        var content = localStorage.getItem("userInfo");
        if(content){
            var data = JSON.parse(content);
            return (
                <Header as='h5'>
                    <Image circular src={data.logo} /> 
                        {data.username}
                </Header>
            )
        }else{
            return '';
        }
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

                        <Menu.Item className="side-element" onClick={() => this.goToHome()}>
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
                                        <li>
                                            Account Settings  
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faFileAlt}/>&nbsp;Terms of Service
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faUserShield} />&nbsp;Privacy Policy
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faGithub} />&nbsp;Source Code
                                        </li>
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

export default withRouter(AppSidebar);
/*
<Menu.Menu className="bottom">
    <Header as='h4'>
        <Icon size="mini" name='cog' />
        <Header.Content>Settings</Header.Content>
    </Header>
    <Menu.Item className="fine-print">
    <FontAwesomeIcon icon={faFileAlt}/> Terms of Service
    </Menu.Item>
    <Menu.Item className="fine-print">
    <FontAwesomeIcon icon={faUserShield} /> Privacy Policy
    </Menu.Item>
    <Menu.Item className="fine-print">
    <FontAwesomeIcon icon={faGithub} /> Source Code
    </Menu.Item>

</Menu.Menu>
*/
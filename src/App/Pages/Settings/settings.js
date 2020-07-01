import React, {Component} from 'react';
import AppSidebar from '../../components/Sidebar';
import { Header, Segment} from 'semantic-ui-react'
import "./settings.css";
import { throws } from 'assert';
import ProfileSettings from "./profileSettings";
import PasswordSettings from "./passwordSettings";
import ConnectedSettings from "./connectedSettings";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class ActionLogSettings extends Component{
    render(){
        return (
            <div>
                A Comprehensive List of changes made to your twitter.
            </div>
        )
    }
}




const tabs = [{
        name: "Profile",
        title: "Profile",
        url: "/settings/profile",
        content: <ProfileSettings/>
    },{
        name: "Connected Accounts",
        title: "Connected Accounts",
        url: "/settings/connected",
        content: <ConnectedSettings />
    },{
        name: "Action Logs",
        title: "Twitter Action Logs",
        url: "/settings/actions",
        content: <ActionLogSettings/>
    },
    {
        name: "Password",
        title: "Password Settings",
        url: "/settings/password",
        content: <PasswordSettings />
    }
]
const urlMap = tabs.reduce((obj, item, idx) => {
    item.tab = idx;
    obj[`${item.url}`] = item
    return obj
}, {});
class SettingsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab: 0
        }
    }

    setTab = (path) => {
        const { activeTab } =this.state;
        if(urlMap[path].tab !== activeTab){
            this.setState({
                activeTab: urlMap[path].tab
            })
        }
    }
    componentWillUnmount(){
        console.log("component unmounting");
    }
    componentWillMount(){
        if(this.props.location.pathname === "/settings"){
            this.props.goToRoute(tabs[this.state.activeTab].url);
        }
    }
    componentDidMount(){
        const { location } = this.props;
        console.log("component mounted");
        if(this.props.location.pathname !== "/settings"){
            this.setTab(location.pathname)
        }
        
    }

    componentWillReceiveProps(props){
        this.setTab(props.location.pathname);
    }
    handleTabClick = (i) => {
        const {activeTab} = this.state;
        if(i != activeTab && this.props.location.pathname !== "/settings"){
            this.setState({
                activeTab: i
            });
            this.props.goToRoute(tabs[i].url)
        }
    }

    render(){
        const tablist = tabs.map((tab, i) => (
            <li onClick={this.handleTabClick.bind(this, i)} 
                className={(this.state.activeTab == i) ? "active" : ""}
                key={i}>
                <span key={i}>
                    {tab.name}
                </span>
            </li>
        ));
        
        return(
        <div className="core-content">
            <AppSidebar />
            <div className="settings-wrapper">
                <Header className="settings-header" size='large'>Settings</Header>
                <div className="settings-content-wrapper">
                    <div className="settings-sidebar">
                        <ul>
                            {tablist}
                        </ul>
                    </div>
                    <div className="settings-content">
                        <Header as='h3'>{tabs[this.state.activeTab].title}</Header>
                        <Route path={'/settings/profile'} component={ProfileSettings}/>
                        <Route path={'/settings/connected'} component={ConnectedSettings}/>
                        <Route path={'/settings/password'} component={PasswordSettings}/>
                    </div>
                </div>
                
            </div>
        </div>)
    }
}
const mapStateToProps = state => ({
    location: state.router.location
});

const mapDispatchToProps = dispatch => bindActionCreators({
    goToRoute: (route) => push(route),
    goToPassword: () => push('/settings/password')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPage);


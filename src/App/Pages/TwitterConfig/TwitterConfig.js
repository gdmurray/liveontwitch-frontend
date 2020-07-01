import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AppSidebar from '../../components/Sidebar';
import {TWITTER_CONFIG_DETAIL, TWITTER_REFRESH_DATA} from "../../../constants";
import {formatSince} from "../../../functions";
import {authenticationService} from "../../../_services/authentication.service";
import TwitterConfigControl from "./TwitterConfigControl";
import TwitterConfigSettings from "./TwitterConfigSettings";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {connect} from "react-redux";
import store from "../../../store";
import {
    Button,
    Header,
    Loader,
    Image,
    Label,
    Tab,
    Icon,
    Sidebar,
} from 'semantic-ui-react';
import { fetchTwitter, refreshTwitter } from '../../../actions/twitterActions';

const axios = require('axios');

class TwitterConfig extends Component{
    constructor(props){
        super(props);
        this.state = {
            account: null,
        }
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        
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

    componentCleanup() { // this will hold the cleanup code
        try{
            localStorage.removeItem("originalConfig");
        }catch(err){
            console.log("big error boi");
        }
    }

    componentWillUnmount(){
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    componentDidMount(){
        const {account} = this.state;
        this.props.dispatch(fetchTwitter(account.uid));
        window.addEventListener('beforeunload', this.componentCleanup);
    }

    addNotification(data){
        this.notificationDOMRef.current.addNotification({
            message: data.message,
            type: data.type,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        })
    }

    handleAccountDataRefresh = () => {
        const {account} = this.state;
        if(this.props.data.modified_hold){
            this.addNotification({
                message: "Error: You cannot refresh your Twitter Info while you are Live",
                type: "danger"
            })
        }else{
            this.props.dispatch(refreshTwitter(account.uid));
            //console.log(store.getState());
        }
    }
    
    getHeader = (panes) => {
        if(this.props.loading){
            return (
                <div className="twitter-navbar loading">
                    <Header as='h4'><Loader active={true} inline size="small"></Loader>       Loading User...</Header>
                </div>
            )
        }
        else{
            if(Object.keys(this.props.data).length !== 0){
                //console.log(this.props.data.updated);
                //console.log(this.props.data.modified_hold);
            return(
                <div className={"twitter-navbar"}>
                    <div className="navbar-content">
                        <Header as='h3'>
                            <Image className={this.props.data.modified_hold ? 'live-avatar': ''} src={this.props.data.profile_image_url_https} avatar />
                            <Header.Content>
                                {this.props.data.modified_hold ?this.props.data.modified_name :this.props.data.name}
                                <Header.Subheader>@{this.props.data.username} <span className="refreshed">Last Refreshed&nbsp;{formatSince(this.props.data.updated)}</span></Header.Subheader>
                            </Header.Content>
                        </Header>
                        <div className="navbar-controls">
                            <Label color={this.props.configActive ? 'green': 'yellow'}>
                                Config Status: {this.props.configActive ? 'Active': 'Not Active'}
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
    }

    accountDataCallback = (data) => {
        this.setState({
            accountData: data
        });
    }

    render(){
        var panes = [
            //{menuItem: 'Setup', render: () => <Tab.Pane attached={false}>How to Do this</Tab.Pane>},
            {menuItem: 'Configuraton', render: () => <Tab.Pane>
                <TwitterConfigControl account={this.state.account}/>
            </Tab.Pane>},
            {menuItem: 'Settings', render: () => <Tab.Pane>
                <TwitterConfigSettings account={this.state.account}/>
                </Tab.Pane>}
        ]
        return(
            <div className="core-content">
                <ReactNotification ref={this.notificationDOMRef} />
                <AppSidebar />
                {this.getHeader(panes)}
                
            </div>
        )
    }
}
const mapStateToProps = state => ({
    data: state.twitterReducer.data,
    loading: state.twitterReducer.loading,
    error: state.twitterReducer.error,
    configActive: state.configReducer.isActive
})
export default connect(mapStateToProps)(TwitterConfig);
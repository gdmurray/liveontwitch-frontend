import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {TWITTER_CONFIG_DETAIL,POSITIONING} from "../../../constants";
import {formatSince} from "../../../functions";
import store from "../../../store";
import {
    Container, Header, Icon, Loader,
    Button, Grid, Divider, Form,
    Image, Radio, Segment, Select, Tab
} from 'semantic-ui-react';
import { editConfig, fetchConfig, cancelConfigEdit, fetchConfigSuccess, cancelConfig } from '../../../actions/configActions';
import {connect} from "react-redux";

const axios = require('axios');
const moment = require('moment');

const USERNAME_CONFIG = "username_config";
const BIO_CONFIG = "bio_config";

const fieldMap = {
    [USERNAME_CONFIG]: "name",
    [BIO_CONFIG]: "description"
}

export function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) return false;
    }
    return true;
}
export function isReady(props){
    return(!props.isLoading && !isEmpty(props.data));
}
class TwitterConfigControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            config: {},
            changesMade: false
        }

    }

    formatValue(data){
        if(data == null || data == undefined){
            return ''
        }else{
            return data;
        }
    }
    componentDidMount(){
        this.props.dispatch(fetchConfig(this.props.account.uid));
    }

    static getDerivedStateFromProps(nextProps, prevState){
        //console.log("nextProps ", nextProps);
        return {config: nextProps.data}
    }
    
    handleLiveTextChange = (e, { value }, conf) => {
        const {config} = this.state;
        config[conf].live_text = value;
        console.log(value.length, value);
        //console.log(this.props, this.state);
        this.setState({config: config, changesMade: true});
        console.log(store.getState());
    }

    handlePositioningChange = (e, { value }, conf) => {
        const {config} = this.state;
        config[conf].positioning = value;
        this.setState({config: config, changesMade: true});
    }

    handleActiveChange = (conf) => {
        const {config} = this.state;
        config[conf].active = !config[conf].active;
        
        this.setState({config: config, changesMade: true});
        
    }

    handleCancelChanges = () => {
        this.props.dispatch(cancelConfig(this.props.data));
        this.setState({
            changesMade: false
        });
    }

    handleSubmitChanges = () => {
        this.props.dispatch(editConfig(this.props.account.uid, this.props.data));
        this.setState({
            changesMade: false
        });
    }

    getUsernameHeader = () => {
        const {usernameChangesMade} = this.state;
        if(isReady(this.props)){
            return (
                <div className="control-navbar">
                    <div>
                        <Radio toggle 
                        checked={this.props.data.username_config.active}
                        onChange={() => this.handleActiveChange(USERNAME_CONFIG)}
                        />
                    </div>
                    <div className="title">
                        <Header as="h5">
                            <Header.Content className="title">
                                Username Configuration
                                <Header.Subheader>
                                    Last Updated&nbsp;{formatSince(this.props.data.username_config.updated)}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </div>
                    <div className="controls">
                    </div>
                </div>
            )
        }else{
            return (
                <div className="control-navbar">No Account Data</div>
            )
        }
    }
    
    
    getUsernameContent = () => {
        const {config} = this.state;
        if(isReady(this.props)){
            if(this.props.data.username_config.active){
                return (
                    <div className="control-content">
                        <Grid columns={2} stackable>
                            <Grid.Column className="form-column">
                                <Form>
                                    <Form.Input onChange={(e, {value}) => this.handleLiveTextChange(e, {value}, USERNAME_CONFIG)}
                                        label='Live Text' placeholder='Text When Live' 
                                        value={this.formatValue(config.username_config.live_text)}/>
                                    <Form.Field onChange={(e, {value}) => this.handlePositioningChange(e,{value}, USERNAME_CONFIG )}
                                        control={Select} label='Positioning' options={POSITIONING}
                                        value={config.username_config.positioning}/>
                                </Form>
                            </Grid.Column>
                            <Grid.Column className="preview-column">
                                <Header as="h5">Preview</Header>
                                <Segment className="twitter-username-preview">
                                    <Header as='h3'>
                                        <Image avatar src={this.props.accountData.profile_image_url_https} />
                                        <Header.Content>
                                            {this.getModified(USERNAME_CONFIG)}
                                        <Header.Subheader>@{this.props.accountData.username}</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </div>
                )
            }
        }
    }

    getBioHeader = () => {
        if(isReady(this.props)){
            return(
                <div className="control-navbar">
                    <div>
                        <Radio toggle 
                        checked={this.props.data.bio_config.active}
                        onChange={() => this.handleActiveChange(BIO_CONFIG)}
                        />
                    </div>
                    <div className="title">
                        <Header as="h5">
                            <Header.Content className="title">
                                Bio Configuration
                                <Header.Subheader>
                                    Last Updated&nbsp;{formatSince(this.props.data.bio_config.updated)}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </div>
                    <div className="controls">
                        <div hidden={!this.state.bioChangesMade}>
                            <Button onClick={() => this.handleCancelChanges(BIO_CONFIG)}
                            size="mini" circular color="red" icon='times' />
                            <Button onClick={() => this.handleSubmitChanges(BIO_CONFIG)}
                            size="mini" circular color="green" icon='checkmark' />
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="control-navbar">No Account Data</div>
            )
        }
    }

    getBioContent = () => {
        const {bio_config, accountData} = this.state;
        if(isReady(this.props)){
            if(this.props.data.bio_config.active){
                return (
                    <div className="control-content">
                        <Grid columns={2} stackable>
                            <Grid.Column className="form-column">
                                <Form>
                                    <Form.Input onChange={(e, {value}) => this.handleLiveTextChange(e, {value}, BIO_CONFIG)}
                                     label='Live Text' placeholder='Text When Live'
                                     value={this.formatValue(this.props.data.bio_config.live_text)} />
                                    <Form.Field onChange={(e, {value}) => this.handlePositioningChange(e,{value}, BIO_CONFIG )}
                                    value={this.props.data.bio_config.positioning} control={Select} label='Positioning' options={POSITIONING}  />
                                </Form>
                            </Grid.Column>
                            <Grid.Column className="preview-column">
                                <Header as="h5">Preview</Header>
                                <Segment className="twitter-bio-preview">
                                    <Header as='h3'>
                                        <Header.Content>
                                            {this.getModified(USERNAME_CONFIG)}
                                        <Header.Subheader>@{this.props.accountData.username}</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                    <div>
                                        {this.getModified(BIO_CONFIG)}
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </div>
                )
            }
        }
    }
    
    getModified = (conf) => {
        const {accountData} = this.props;
        const {config} = this.state;
        var field = fieldMap[conf];
        if(accountData){
            var text = (config[conf].live_text === null)  ? "" : config[conf].live_text
            console.log(text.length, text);
            if(config[conf].positioning == "BEFORE"){
                return `${text.replace(/ /g, "\u00a0")}${accountData[field]}`;
            }else if(config[conf].positioning == "AFTER"){
                return `${accountData[field]}${text}`;
            }
            return accountData[field]
        }else{
            return null
        }
    }

    render(){
        return (
            <div>
                {this.getUsernameHeader()}
                {this.getUsernameContent()}
                {this.getBioHeader()}
                {this.getBioContent()}
                <div className={this.state.changesMade ? "twitter-commit-changes" : "twitter-commit-changes closed"}>
                    <Button onClick={() => this.handleSubmitChanges(USERNAME_CONFIG)}
                        size="small" color="green" icon='checkmark' content={"Confirm"}/>
                    <Button onClick={() => this.handleCancelChanges(USERNAME_CONFIG)}
                        size="small" color="red" icon='times' content={"Cancel"}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    accountData: state.twitterReducer.data,
    data: state.configReducer.data,
    loading: state.configReducer.loading,
    updating: state.configReducer.updating,
    error: state.configReducer.error,
})
export default connect(mapStateToProps)(TwitterConfigControl);
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {TWITTER_CONFIG_DETAIL,POSITIONING} from "../../../constants";
import {formatSince} from "../../../functions";

import {
    Container,
    Header,
    Icon,
    Loader,
    Button,
    Grid,
    Divider,
    Form,
    Image,
    Radio,
    Segment,
    Select,
    Tab,
} from 'semantic-ui-react';

const axios = require('axios');
const moment = require('moment');

const USERNAME_CONFIG = "username_config";
const BIO_CONFIG = "bio_config";

const config_change_map = {
    [USERNAME_CONFIG]: "usernameChangesMade",
    [BIO_CONFIG]: "bioChangesMade"
}

class TwitterConfigControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            accountData: props.accountData,
            
            username_config: {
                active: null
            },
            bio_config: {
                active: null
            },
            usernameChangesMade: false,
            bioChangesMade: false,

            username_config_updated: null,
            bio_config_updated: null,
        }

    }

    formatValue(data){
        if(data == null || data == undefined){
            return ''
        }else{
            return data;
        }
    }
    setConfigs = (accountData) => {
        this.setState({
            accountData: accountData,
            
            username_config: accountData.config.username_config,
            username_config_updated: formatSince(accountData.config.username_config.updated),
            usernameChangesMade: false,            
            
            bio_config: accountData.config.bio_config,
            bio_config_updated: formatSince(accountData.config.bio_config.updated),
            bioChangesMade: false
        })
    }
    componentDidMount(){
        this.setConfigs(this.props.accountData);
    }

    handleLiveTextChange = (e, { value }, conf) => {
        const config = this.state[conf];
        config.live_text = value;
        this.setState({[conf]: config, [config_change_map[conf]]: true});
    }

    handlePositioningChange = (e, { value }, conf) => {const config = this.state[conf];
        config.positioning = value;
        this.setState({[conf]: config, [config_change_map[conf]]: true});
    }

    handleActiveChange = (conf) => {
        const config = this.state[conf];
        config.active = !config.active;
        this.setState({[conf]: config, [config_change_map[conf]]: true});
    }

    handleCancelChanges = (conf) => {
        this.setState({
            [conf]: this.state.accountData.config[conf],
            [config_change_map[conf]]: false
        })
    }

    handleSubmitChanges = (conf) => {
        axios({
            url: `${TWITTER_CONFIG_DETAIL}${this.props.account.uid}/?config=${conf}`,
            method: 'put',
            data: this.state[conf]}
            ).then((response) => {
                var {accountData} = this.state;
                accountData[conf] = response.data;
                this.setState({
                    accountData: accountData,
                    [`${conf}_updated`]: formatSince(response.data.updated),
                    [conf]: response.data,
                    [config_change_map[conf]]: false,
                });
                this.props.accountDataCallback(accountData);
            }).catch((error) => {
                console.log(error);
                console.log(error.response);
        })
    }

    getUsernameHeader = () => {
        const {accountData, usernameChangesMade} = this.state;
        if(accountData){
            return (
                <div className="control-navbar">
                    <div>
                        <Radio toggle 
                        defaultChecked={accountData.config.username_config.active}
                        onChange={() => this.handleActiveChange(USERNAME_CONFIG)}
                        />
                    </div>
                    <div className="title">
                        <Header as="h5">
                            <Header.Content className="title">
                                Username Configuration
                                <Header.Subheader>
                                    Last Updated&nbsp;{this.state.username_config_updated}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </div>
                    <div className="controls">
                        <div hidden={!usernameChangesMade}>
                            <Button onClick={() => this.handleCancelChanges(USERNAME_CONFIG)}
                                size="mini" circular color="red" icon='times' />
                            <Button onClick={() => this.handleSubmitChanges(USERNAME_CONFIG)}
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
    getModifiedUsername = () => {
        const {accountData, username_config} = this.state;
        if(accountData){
            var text = (username_config.live_text === null)  ? "" : username_config.live_text
            if(username_config.positioning == "BEFORE"){
                return text + accountData.name;
            }else if(username_config.positioning == "AFTER"){
                return accountData.name + text;
            }
            return accountData.name
        }else{
            return null
        }
    }
    getUsernameContent = () => {
        const {accountData, username_config} = this.state;
        if(accountData){
            if(username_config.active){
                return (
                    <div className="control-content">
                        <Grid columns={2} stackable>
                            <Grid.Column className="form-column">
                                <Form>
                                    <Form.Input onChange={(e, {value}) => this.handleLiveTextChange(e, {value}, USERNAME_CONFIG)}
                                        label='Live Text' placeholder='Text When Live' 
                                        defaultValue={this.formatValue(username_config.live_text)}/>
                                    <Form.Field onChange={(e, {value}) => this.handlePositioningChange(e,{value}, USERNAME_CONFIG )}
                                        control={Select} label='Positioning' options={POSITIONING}
                                        defaultValue={username_config.positioning}/>
                                </Form>
                            </Grid.Column>
                            <Grid.Column className="preview-column">
                                <Header as="h5">Preview</Header>
                                <Segment className="twitter-username-preview">
                                    <Header as='h3'>
                                        <Image avatar src={accountData.profile_image_url_https} />
                                        <Header.Content>
                                            {this.getModifiedUsername()}
                                        <Header.Subheader>@{accountData.username}</Header.Subheader>
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
        const {accountData} = this.state;
        if(accountData){
            return(
                <div className="control-navbar">
                    <div>
                        <Radio toggle 
                        defaultChecked={accountData.config.bio_config.active}
                        onChange={() => this.handleActiveChange(BIO_CONFIG)}
                        />
                    </div>
                    <div className="title">
                        <Header as="h5">
                            <Header.Content className="title">
                                Bio Configuration
                                <Header.Subheader>
                                    Last Updated&nbsp;{this.state.bio_config_updated}
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
        if(accountData){
            if(bio_config.active){
                return (
                    <div className="control-content">
                        <Grid columns={2} stackable>
                            <Grid.Column className="form-column">
                                <Form>
                                    <Form.Input onChange={(e, {value}) => this.handleLiveTextChange(e, {value}, BIO_CONFIG)}
                                     label='Live Text' placeholder='Text When Live'
                                     value={this.formatValue(bio_config.live_text)} />
                                    <Form.Field onChange={(e, {value}) => this.handlePositioningChange(e,{value}, BIO_CONFIG )}
                                    value={bio_config.positioning} control={Select} label='Positioning' options={POSITIONING}  />
                                </Form>
                            </Grid.Column>
                            <Grid.Column className="preview-column">
                                <Header as="h5">Preview</Header>
                                <Segment className="twitter-bio-preview">
                                    <Header as='h3'>
                                        <Header.Content>
                                            {this.getModifiedUsername()}
                                        <Header.Subheader>@{accountData.username}</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                    <div>
                                        {this.getModifiedBio()}
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </div>
                )
            }
        }
    }
    
    getModifiedBio = () => {
        const {accountData, bio_config} = this.state;
        if(accountData){
            var text = (bio_config.live_text === null)  ? "" : bio_config.live_text
            if(bio_config.positioning == "BEFORE"){
                return text + accountData.description;
            }else if(bio_config.positioning == "AFTER"){
                return accountData.description + text;
            }
            return accountData.description
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
            </div>
        )
    }
}
export default withRouter(TwitterConfigControl);
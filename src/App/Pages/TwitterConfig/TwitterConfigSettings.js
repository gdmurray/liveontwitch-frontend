import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {TWITTER_CONFIG_DETAIL, TWITTER_TOGGLE_CONFIG} from "../../../constants";
import {
    Button,
    Form,
    Confirm,
} from 'semantic-ui-react';
import {connect} from "react-redux";
import { isReady, isEmpty } from './TwitterConfigControl';
import { toggleConfig } from '../../../actions/configActions';

const axios = require('axios');

class TwitterConfigSettings extends Component{
    constructor(props){
        super(props);
        this.state = {
            confirmOpen: false,
        }
    }
    open = () => this.setState({ confirmOpen: true })
    close = () => this.setState({ confirmOpen: false })
    
    handleDeleteAccount = () => {
        this.close();
    }

    handleToggleRuleSet = () => {
        this.props.dispatch(toggleConfig(this.props.account.uid));
    }

    render(){
        //console.log(this.props.configActive);
        //if(!isEmpty(this.props.isActive)){
        return (
            <div className="twitter-settings">
                <Confirm header={"Are You Sure?"} content={"Once you delete a Twitter account you lose all configuration settings and need to re-authorize."}
                open={this.state.confirmOpen} onCancel={this.close} onConfirm={this.handleDeleteAccount} />
                <Form>
                    <Form.Field inline>
                        <label>Configuration Status</label>
                        <Button onClick={this.handleToggleRuleSet}
                            color={this.props.configActive ? 'yellow' : 'green'}>
                            {this.props.configActive ? 'Deactivate' : 'Activate'}
                        </Button>
                    </Form.Field>
                    <Form.Field inline>
                        <label>Re-Authorize Account</label>
                        <Button color="blue">Authorize</Button>
                    </Form.Field>
                    <Form.Field inline>
                        <label>Delete Account</label>
                        <Button color="red" onClick={this.open}>Delete Account</Button>
                    </Form.Field>
                </Form>
            </div>
        )
        //}else{
        //    return <div>Loading</div>
        //}
    }
}
const mapStateToProps = state => ({
    accountData: state.twitterReducer.data,
    configActive: state.configReducer.isActive
})

export default connect(
    mapStateToProps
)(TwitterConfigSettings);
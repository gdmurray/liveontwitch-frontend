import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {TWITTER_CONFIG_DETAIL} from "../../../constants";
import {
    Button,
    Form,
    Confirm,
} from 'semantic-ui-react';

const axios = require('axios');
class TwitterConfigSettings extends Component{
    constructor(props){
        super(props);
        this.state = {
            accountData: props.accountData,
            confirmOpen: false,
        }
    }
    open = () => this.setState({ confirmOpen: true })
    close = () => this.setState({ confirmOpen: false })
    handleDeleteAccount = () => {
        this.close();
        axios({
            method: "delete",
            url: `${TWITTER_CONFIG_DETAIL}${this.props.account.uid}/`
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    render(){
        const{accountData} = this.state;
        return (
            <div className="twitter-settings">
                <Confirm header={"Are You Sure?"} content={"Once you delete a Twitter account you lose all configuration settings and need to re-authorize."}
                open={this.state.confirmOpen} onCancel={this.close} onConfirm={this.handleDeleteAccount} />
                <Form>
                    <Form.Field inline>
                        <label>Configuration Status</label>
                        <Button color={accountData.config.active ? 'yellow' : 'green'}>{accountData.config.active ? 'Deactivate' : 'Activate'}</Button>
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
    }
}
export default withRouter(TwitterConfigSettings)
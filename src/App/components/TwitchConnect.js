import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';

export default class TwitchConnect extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    render(){
        return (
            <Modal dimmer={'blurring'} open={true}>
                Connect To Twitch
            </Modal>
        )
    }
}
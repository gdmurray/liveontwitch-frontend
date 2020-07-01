import React, {Component} from 'react';
import {
    Header
} from 'semantic-ui-react';

export default class ConnectStreaming extends Component{
    render(){
        return(
        <div style={{maxWidth: 500, minWidth: 300, width: '100%'}}>
            <Header as='h2'>
                Connect Streaming Service
                <Header.Subheader>
                    Or Sign Up with Email and Connect Later
                </Header.Subheader>
            </Header>
        </div>)
    }
}
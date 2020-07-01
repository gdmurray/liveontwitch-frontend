import React, {Component} from 'react';
import {
    Segment
} from 'semantic-ui-react';
class ConnectedSettings extends Component{

    render(){
        return (
            <div>
                <Segment attached='top' size="mini" color='purple'>Twitch</Segment>
                <Segment attached='bottom'>Twitch Account</Segment>

                <Segment attached='top' size="mini" color='blue'>Mixer</Segment>
                <Segment  attached='bottom'>
                    <div className="connect-service">
                        Mixer Account not Linked
                    </div>
                </Segment>
            </div>
        )
    }
}

export default ConnectedSettings;
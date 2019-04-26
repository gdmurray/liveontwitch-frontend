import React, {Component} from 'react';
import Navbar from "../components/Navbar";
import {
    Segment,
    Container,
    Header,
    Button,
    Icon,

} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

class Error extends Component{
    constructor(props){
        super(props);
        console.log(props.location.state);
        this.state = props.location.state;
    }

    render(){
        return (
            <div>
                <Navbar/>
                <Container style={{padding: '1rem'}}>
                    <Segment placeholder>
                        <Header icon>
                        <Icon name='times circle outline' color="red" />
                            An Error Has Occured
                            <Header.Subheader>
                                {this.state.message ? this.state.message : ''}
                            </Header.Subheader>
                        </Header>
                    </Segment>
                </Container>
            </div>
        )
    }
}

export default withRouter(Error);
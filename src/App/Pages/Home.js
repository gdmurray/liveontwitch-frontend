import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter, faGithubAlt, faTwitch} from '@fortawesome/free-brands-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import './splash.css';
import {
    Segment,
    Menu,
    Container,
    Header,
    Button,
    Icon,
    Grid

} from 'semantic-ui-react';
export default class Home extends Component{
    constructor(props){
        super(props);

    }

    connect = () => {
        this.props.history.push("/connect");
    }
    render(){
        var mobile = false;
        return(
                <div className="splash-header">
                    <Container>
                        <Menu secondary className="splash-menu">
                            <Menu.Header className="site-logo">
                                liveontwitch
                            </Menu.Header>
                            <Menu.Item position="right">
                                <Button inverted size="small" className="login-button">
                                    Login
                                </Button>
                            </Menu.Item>
                        </Menu>
                        <Container text>
                            <Header as='h1' content='Attract More Viewers to Your Stream With Ease'
                            className="splash-slogan-main"/>
                            <Header
                            as='h3'
                            className="splash-slogan-secondary"
                            content='Integrate your Twitch and Twitter accounts to effortlessly inform followers and leads that you’re live. Increase engagement and responsiveness to going live on stream. '
                            />
                            <div className="slogan-get-started">
                                <Button animated onClick={() => this.connect()}>
                                    <Button.Content visible>Get Started</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            </div>
                            <img className="splash-diagram" src={process.env.PUBLIC_URL + '/img/diagram.png'}></img>
                        </Container>
                    </Container>
                    <Container className='splash-bottom' text>
                        <Header as='h2' content='Is your Twitter influence reaching prospective Twitch viewers?'
                            className="splash-lower-slogan-main"/>
                        <Header as='h4' content='Bring in more viewers by providing visual queues of being live'
                        className="splash-lower-slogan-secondary"/>

                        <Grid columns='equal' stackable className="features-grid">    
                            <Grid.Row textAlign="center">
                                <Grid.Column textAlign="center">
                                    <Header as='h2' icon textAlign='center'>
                                        <FontAwesomeIcon icon={faTwitter} className="circular-icon" style={{backgroundColor: 'var(--theme-twitter-primary)'}}/>
                                        <Header.Content>Twitter Responsiveness</Header.Content>
                                        <Header.Subheader>Configure how your Twitter account displays your activity on Twitch.</Header.Subheader>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as='h2' icon textAlign='center'>
                                        <FontAwesomeIcon icon={faCog} className="circular-icon" style={{backgroundColor: 'var(--theme-green)'}}/>
                                        <Header.Content>Easy Configuration</Header.Content>
                                        <Header.Subheader>No effort configuration to update your username or status that you’re live.</Header.Subheader>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as='h2' icon textAlign='center'>
                                        <FontAwesomeIcon icon={faGithubAlt} className="circular-icon" style={{backgroundColor: 'var(--theme-orange)'}}/>
                                        <Header.Content>Transparent Systems</Header.Content>
                                        <Header.Subheader>This application is open source, to give you assurance that your accounts are doing what we promised.</Header.Subheader>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as='h2' icon textAlign='center'>
                                        <FontAwesomeIcon icon={faTwitch} className="circular-icon" style={{backgroundColor: 'var(--theme-twitch-primary)'}}/>
                                        <Header.Content>Simple Integration</Header.Content>
                                        <Header.Subheader>No need to log in with email or password, simply use your Twitch account to prove you are who you say you are.</Header.Subheader>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </div>
        )
    }
}
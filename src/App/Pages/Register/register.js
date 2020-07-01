import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import RegisterForm from "./registerForm";
import ConnectStreaming from "./connectStreaming";

import {
    Icon, Image,
    Segment, Step,
    Form, Checkbox,
    Button,
    Responsive
} from 'semantic-ui-react'

import './register.css';
import registerForm from './registerForm';

const stepContent = [

    {
        title: "Sign Up",
        icon: "user circle",
        iconColor: 'var(--theme-green)',
        description: "Choose a Username and Password"
    }, {
        title: "Connect",
        icon: "twitch",
        iconColor: 'var(--theme-twitch-primary)',
        description: "Connect Streaming Service"
    },
    {
        title: "Connect Twitter",
        icon: "twitter",
        iconColor: 'var(--theme-twitter-primary)',
        description: 'Connect a Twitter Account (Optional)'
    }
]
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            authenticated: false
        }

    }

    handleStepClick = (idx) => {
        console.log("movingto ", idx);
        const { activeTab } = this.state;
        if (idx != activeTab) {
            this.setState({
                activeTab: idx
            });
        }
    }

    disableTwitterStep = (idx) => {
        if (idx != 2) {
            return false
        } else {
            if (this.state.authenticated) {
                return false
            }
            return true;
        }
    }

    isAuthenticatedCallback = () => {
        this.setState({ authenticated: true, activeTab: this.state.activeTab++ })
    }

    renderSteps = () => {
        var steps = [];
        for (var s in stepContent) {
            var step = stepContent[s];
            steps.push(
                <Step active={this.state.activeTab == s} link key={s}
                    onClick={this.handleStepClick.bind(this, s)}
                    disabled={this.disableTwitterStep(s)}>
                    <Icon style={{ color: step.iconColor }} name={step.icon} />
                    <Step.Content>
                        <Step.Title>{step.title}</Step.Title>
                        <Step.Description>{step.description}</Step.Description>
                    </Step.Content>
                </Step>)
        }
        return steps;

    }
    renderContent(idx) {
        console.log(idx);
        if (idx == 0) {
            return (<RegisterForm isAuthenticatedCallback={this.isAuthenticatedCallback} />)
        } else if (idx == 1) {
            return (<ConnectStreaming />)
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <Step.Group attached='top'>
                    {this.renderSteps()}
                </Step.Group>
                <Segment attached className="register-segment">
                    {this.renderContent(this.state.activeTab)}
                </Segment>
            </div>
        )
    }
}

export default Register;
import React, {Component} from 'react';
import {connect} from "react-redux";
import { Field, reduxForm} from 'redux-form';

import { fetchUser } from '../../../actions/profileActions';
import { 
    Form, Message, Checkbox, Header
 } from 'semantic-ui-react'

class PasswordSettings extends Component{
    componentDidMount(){
        this.props.dispatch(fetchUser());
    }
    render(){
        return (
            <div>
                <Form>

                </Form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    hasPassword: state.profileReducer.hasPassword
})

PasswordSettings = connect(mapStateToProps)(PasswordSettings);

export default reduxForm({
    form: 'passwordForm',
})(PasswordSettings);
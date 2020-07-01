import React, {Component} from 'react';
import { 
    Form, Message, Checkbox, Header, Loader, Button
 } from 'semantic-ui-react';
 import { Field, reduxForm} from "redux-form";
import { fetchUser } from '../../../actions/profileActions';
import {connect} from "react-redux";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom';


const renderUsername = ({ input, disabled, label, type, meta: { asyncValidating, touched, error, warning, submitSucceeded } }) => (
    <Form.Input
        {...input}
        disabled={disabled}
        error={touched && (error !== undefined) && !submitSucceeded && input.value.length > 0}
        placeholder={label}
        loading={asyncValidating}
        label={label}
        type={type}
    />
) 

const hasError = (error) => {
    if(error==undefined){
        return false
    }
    return true;
}
const renderField = ({ input, disabled, label, type, meta: { touched, error, warning } }) => (
    <Form.Input 
        {...input}
        disabled={disabled}
        error={touched && hasError(error)}
        label={label}
        placeholder={label}
        type={type}
    />
)

class ProfileSettings extends Component{
    componentDidMount(){
        this.props.dispatch(fetchUser());
    }
    render(){
        const {loading, initialData} = this.props;
        console.log(loading, initialData);
        if(loading){
            return (
                <div>
                    <Loader active inline='centered' >Loading</Loader>
                </div>
            )
        }else{
            return (
                <div>
                    <Message warning visible={!initialData.has_password}>
                        <Message.Header>Password Required</Message.Header>
                        <p>You must first set a password in order to change profile settings.</p>
                        <Button onClick={() => this.props.goToPassword()} primary content='Set Password' />
                    </Message>
                    <Form>
                        <Field 
                            component={renderUsername}
                            //value={initialData.username}
                            disabled={!initialData.has_password}
                            label="Username"
                            name="username"
                        />
                        <Field 
                            component={renderField}
                            //value={initialData.email}
                            disabled={!initialData.has_password}
                            label="Email"
                            name="email"
                        />
    
                    </Form>
                </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    goToPassword: () => push('/settings/password')
}, dispatch);

const mapStateToProps = state => ({
    initialData: state.profileReducer.data,
    loading: state.profileReducer.loading
})

ProfileSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSettings);

export default reduxForm({
    form: 'profileForm',
    enableReinitialize: true
})(ProfileSettings);
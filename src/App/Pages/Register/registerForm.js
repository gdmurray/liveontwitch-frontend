import React, {Component} from 'react'
import {connect } from 'react-redux';
import { Field, reduxForm, getFormMeta, getFormValues,getFormError, getFormAsyncErrors, getFormSyncErrors, setSubmitSucceeded, setSubmitFailed, startSubmit } from 'redux-form';
import { 
    Form, Message, Checkbox, Header
 } from 'semantic-ui-react'
import { validateRegisterFieldsBegin, validateRegisterFieldsFailure, validateRegisterFieldsSuccess} from '../../../actions/registerActions';
import {VALIDATE_USERNAME, REGISTER_USER } from "../../../constants";
import axios from "../../../_services/axios";
import _debounce from 'lodash.debounce'

const validate = (values, props) => {
    const errors = {};

    if (!values.username){
        errors.username = 'Required'
    } else if (values.username.length > 30){
        errors.username = 'Must be 30 Characters or less'
    }

    if(values.email){
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email = "Invalid email address"
        }
    }
    
    if(!values.password){
        errors.password = 'Required';
    }

    if(!values.confirmPassword ){
        errors.confirmPassword = 'Required'
    }else if (values.confirmPassword !== values.password){
        errors.confirmPassword = 'Passwords Dont Match'
    }

    if(!values.isAgreed){
        errors.isAgreed = 'Must Agree to the Terms and Conditions'
    }
    return errors;
}

const asyncValidate = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        if (!values.username) return resolve();
        dispatch(validateRegisterFieldsBegin());
        axios.get(`${VALIDATE_USERNAME}?username=${values.username}`)
            .then(res => {
                dispatch(validateRegisterFieldsSuccess(res.data));
                return resolve({"username": res.data.valid});
            }).catch(error => {
                dispatch(validateRegisterFieldsFailure(error));
                return reject(error);
            })
        })
    }

const renderUsername = ({ input, label, type, meta: { asyncValidating, touched, error, warning, submitSucceeded } }) => (
    <Form.Input
        {...input}
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
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <Form.Input 
        {...input}
        error={touched && hasError(error)}
        label={label}
        placeholder={label}
        type={type}
    />
)
const renderCheckbox = field => (
    <Form.Checkbox
        checked={!!field.input.value}
        name={field.input.name}
        label={field.label}
        onChange={(e, {checked}) => field.input.onChange(checked)} 
    />
)
class RegisterForm extends Component{
    constructor(props){
        super(props);

    }
    
    componentWillUnmount(){
        console.log("unmount", this.props);
    }
    componentWillReceiveProps(props, prevState){
        console.log(props);
        if(props.submitSucceeded){
            props.isAuthenticatedCallback();
        }
    }
    onRegister = (data) => {
        this.props.dispatch(startSubmit('registerForm'));
        
        axios.post(REGISTER_USER, {
            username: data.username,
            password1: data.password,
            password2: data.confirmPassword,
            email: data.email
        }).then(
            response => {
                this.props.dispatch(setSubmitSucceeded('registerForm'));
            }
        ).catch(
            error => {
                dispatchEvent(setSubmitFailed('registerForm'));
            }
        )
    }
    
    getErrors = () => {
        const {synchronousErrors, fields, usernameValid, formValues, submitSucceeded, errors} = this.props;
        var totalErrors = [];
        const nameMap = {
            username: "Username",
            password: "Password",
            confirmPassword: "Confirm Password",
            isAgreed: "Terms and Conditions",
            email: "Email"
        }
        var valueList = {};
        if(formValues !== undefined){valueList = formValues}
        // Check if the objects have been touched
        console.log("sync errors, ", synchronousErrors);
        console.log("value list ", formValues);
        if(synchronousErrors !== undefined){
            for(var key in synchronousErrors ){
                if(fields.hasOwnProperty(key) && valueList.hasOwnProperty(key)){
                    totalErrors.push(<span key={key}><b>{nameMap[key]}</b>: {synchronousErrors[key]}</span>);
                    totalErrors.push(<br key={key+'br'}/>);
                }
            }
        }
        if(usernameValid !== undefined && usernameValid === false && !submitSucceeded ){
            totalErrors.push(<span key={'username'}><b>Username</b>: This username is taken or reserved.</span>)
        }
        return totalErrors
    }
    
    render(){
        const { handleSubmit, pristine, submitting, valid} = this.props;
        return (
            <div style={{maxWidth: 500, minWidth: 300, width: '100%'}}>
                <Header as='h2'>Create Account</Header>
                <Form onSubmit={this.props.handleSubmit(this.onRegister.bind(this))}>
                    <br/>
                    <Field
                        component={renderUsername}
                        label="Username"
                        name="username"
                      ></Field>
                    <br/>
                    <Field 
                        component={renderField}
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password" />
                    <Field 
                        component={renderField}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Password Again" />
                    
                    <Field
                        component={Form.Input}
                        label="Email"
                        name="email"
                        placeholder="Email Address (Optional)" />
                    <Message
                        visible={this.getErrors().length > 0}
                        error
                        header='There are Errors in the Form'
                        content={this.getErrors()}
                    />
                    <br/>
                    <Field
                        component={renderCheckbox}
                        label="I agree to the Terms and Conditions"
                        name="isAgreed"
                        />
                    <br/>
                    <Form.Group inline>
                        <Form.Button disabled={!valid || submitting || pristine} color='green'>Register</Form.Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}


const ReduxRegisterForm = reduxForm({
    form: "registerForm",
    validate,
    asyncValidate,
    destroyOnUnmount: false,
    asyncBlurFields: ['username']
})(RegisterForm);

RegisterForm = connect(
    state => ({
        //initialValues: {"username": "yaboigotsnacks", "email": "gd-murray@hotmail.com"},
        usernameValid: state.registerReducer.valid,
        fields: getFormMeta('registerForm')(state),
        formValues: getFormValues('registerForm')(state),
        errors: getFormError('registerForm')(state),
        synchronousErrors: getFormSyncErrors('registerForm')(state),
        asyncErrors: getFormAsyncErrors('registerForm')(state),
}))(ReduxRegisterForm);

export default RegisterForm;



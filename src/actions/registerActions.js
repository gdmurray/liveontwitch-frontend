import {VALIDATE_USERNAME, REGISTER_USER} from "../constants";
import axios from "../_services/axios";
import { dispatch } from "rxjs/internal/observable/range";

export const VALIDATE_REGISTER_FIELDS_BEGIN = "VALIDATE_REGISTER_FIELDS_BEGIN";
export const VALIDATE_REGISTER_FIELDS_SUCCESS = "VALIDATE_REGISTER_FIELDS_SUCCESS";
export const VALIDATE_REGISTER_FIELDS_FAILURE = "VALIDATE_REGISTER_FIELDS_FAILURE";

export const validateRegisterFieldsBegin = () => ({
    type: VALIDATE_REGISTER_FIELDS_BEGIN
});

export const validateRegisterFieldsSuccess = valid => ({
    type: VALIDATE_REGISTER_FIELDS_SUCCESS,
    payload: valid
});

export const validateRegisterFieldsFailure = error => ({
    type: VALIDATE_REGISTER_FIELDS_FAILURE,
    payload: {error}
})

export const REGISTER_USER_BEGIN = "REGISTER_USER_BEGIN";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const registerUserBegin = () => ({
    type: REGISTER_USER_BEGIN
})

export const registerUserSuccess = response => ({
    type: REGISTER_USER_SUCCESS,
    payload: response
})

export const registerUserFailure = error => ({
    type: REGISTER_USER_FAILURE,
    payload: {error}
})


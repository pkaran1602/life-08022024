import { INVALID_CREDENTIAL, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../types/types";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ?
    {
        isLoggedIn: true,
        user: user,
        invalidCred: false
    } : {
        isLoggedIn: false,
        user: null,
        invalidCred: false
    }

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
                invalidCred: false
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                invalidCred: false
            };
        case INVALID_CREDENTIAL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                invalidCred: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                invalidCred: false
            };
        default: {
            return state;
        }
    }
}
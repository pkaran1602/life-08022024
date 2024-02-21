import { LOGIN, LOGOUT, RESET_REQUEST, RESET_SUCCESS, TOKEN_EXPIRE } from "../types/types";

export const userLogin = (user_detal) => {
    return {
        type: LOGIN,
        data: user_detal
    };
};

export const userLogout = () => {
    return {
        type: LOGOUT,
        data: null
    };
};

export const token_expire = () => {
    return {
        type: TOKEN_EXPIRE,
        data: null
    };
};

export const reset_request_Fun = () => {
    return {
        type: RESET_REQUEST,
        data: null
    };
};

export const reset_success_Fun = () => {
    return {
        type: RESET_SUCCESS,
        data: null
    };
};
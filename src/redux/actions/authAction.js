import { LOGIN, LOGOUT, TOKEN_EXPIRE } from "../types/types";

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
    console.log("token_expire")
    return {
        type: TOKEN_EXPIRE,
        data: null
    };
};
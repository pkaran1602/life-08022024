import { LOGIN, LOGOUT } from "../types/types";

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
}
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { toggleReducer } from "./toggleReducer";

export default combineReducers({
    userAuth:authReducer,
    toggleReducer:toggleReducer,
})
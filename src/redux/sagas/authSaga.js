import { put, takeEvery } from 'redux-saga/effects';
import { INVALID_CREDENTIAL, LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS } from '../types/types';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_URL from 'src/base_url/Base_Url';


function* loginFun(action) {
    const res = yield axios.post( API_URL + 'login',action.data)
if(res.data.status === 1){
    localStorage.setItem("user", JSON.stringify(res.data.data))
    yield put({ type: LOGIN_SUCCESS, data: res.data.data });
}
};
function* logoutFun() {  
    yield put({ type: LOGOUT_SUCCESS, data: null });
}

function* authSaga() {
    yield takeEvery(LOGIN, loginFun);
    yield takeEvery(LOGOUT, logoutFun);
};

export default authSaga;
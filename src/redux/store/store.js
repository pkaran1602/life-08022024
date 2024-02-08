import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "../reducers/rootReducer";
import authSaga from "../sagas/authSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware]
});
sagaMiddleware.run(authSaga);

export default store;
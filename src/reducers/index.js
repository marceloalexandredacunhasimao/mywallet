import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
// import request from './request';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// const rootReducer = combineReducers({ user, wallet, request });
const rootReducer = combineReducers({ user, wallet });
export default rootReducer;

import { combineReducers, createStore } from 'redux';
import userReducer from './user/reducer';

const rootReducer = combineReducers({ user: userReducer });

export const store = createStore(rootReducer);

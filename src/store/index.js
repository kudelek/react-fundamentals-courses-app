import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import userReducer from './user/reducer';

const middleware = [ReduxThunk];
const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

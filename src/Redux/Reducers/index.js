// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    reducer: userReducer,
    // Add other reducers if needed
});

export default rootReducer;

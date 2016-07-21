import { combineReducers } from 'redux';
import ReducerCounter from './ReducerCounter';

const rootReducer = combineReducers({
  counter: ReducerCounter
});

export default rootReducer;

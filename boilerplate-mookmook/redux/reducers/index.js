import { combineReducers } from 'redux';

import AccountReducer from 'redux/reducers/accountReducer';

const rootReducer = combineReducers({
  account: AccountReducer,
});

export default rootReducer;

/* eslint-disable camelcase */
import { Map } from 'immutable';

const initialState = Map({
  uid: '',
  email: '',
  phoneNumber: '',
  displayName: '',
  photoURL: '',
});

export const UPDATE_ACCOUNT_INFO = 'account/UPDATE_ACCOUT_INFO';
export const SIGNOUT = 'account/SIGNOUT';

/* updateInfo

[
  [key1, update1],
  [key2, update2],
  ...
]

*/

export const AR_updateAccountInfo = (updateInfo) => ({
  type: UPDATE_ACCOUNT_INFO,
  updateInfo,
});

export const AR_signOut = () => ({
  type: SIGNOUT,
});

const reducer = (state = initialState, action) => {
  let ns = state;

  switch (action.type) {
    case UPDATE_ACCOUNT_INFO:
      action.updateInfo.forEach(([key, value]) => {
        ns = ns.set(key, value);
      });
      return ns;
    case SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;

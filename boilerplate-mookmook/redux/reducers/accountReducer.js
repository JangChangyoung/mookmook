/* eslint-disable camelcase */
import { Map } from "immutable";

// user가 auth state(login or logout) 바뀔때마다 돈다
// token 값을 매번 가져오면 되지만 decoding할때마다 비용이드니까, 이걸 한번만 불러와서 저장하고, 그걸 다시쓴다.
// user state가 없을때 다시 field 전부다 초기화 한다.
const initialState = Map({
  uid: "",
  email: "",
  phoneNumber: "",
  displayName: "",
  photoURL: "",
});

export const UPDATE_ACCOUNT_INFO = "account/UPDATE_ACCOUT_INFO";
export const SIGNOUT = "account/SIGNOUT";

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

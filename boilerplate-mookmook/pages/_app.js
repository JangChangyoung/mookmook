/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable-next-line react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/auth';

import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import reducers from 'redux/reducers';

// eslint-disable-next-line camelcase
import { AR_signOut, AR_updateAccountInfo } from 'redux/reducers/accountReducer';

import 'styles/globals.scss';

const App = ({ Component, pageProps }) => {
  if (firebase.apps.length === 0) {
    // configuration으로 firebase app을 초기화함
    firebase.initializeApp({
      // firebase 환경설정 데이터 (next.config.js에 설정되어 있음)
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    });
  }

  const dispatch = useDispatch();

  useEffect(async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) dispatch(AR_signOut());
      else {
        const updateData = [
          ['uid', user.uid],
          ['email', user.email],
          ['phoneNumber', user.phoneNumber],
          ['displayName', user.displayName],
          ['photoURL', user.photoURL],
        ];
        dispatch(AR_updateAccountInfo(updateData));
      }
    });
  }, []);

  return <Component {...pageProps} />;
};

const makeStore = (initialState) => createStore(reducers, initialState);

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);
// export const ref = firebase.database().ref();
export const auth = firebase.auth;
// export const provider = new firebase.auth.FacebookAuthProvider();
export const provider = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
};

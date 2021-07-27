import React from 'react';
import { provider, auth } from '../_app';

// let firebaseui = require('firebaseui');

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      email: null,
      phoneNumber: null,
      displayName: null,
      photoURL: null,
      provider: null,
    };
  }

//   componentWillMount() {
//     auth().onAuthStateChanged()
//       .then(user => {
//       if (user) {
//         this.setState({ user })
//       }
//     })
//   }

  loginFacebook = () => {
    auth().signInWithPopup(provider.facebook)
      .then(({ user }) => {
        console.log(user);
        this.setState({ 
          uid: user.uid,
          email: user.email,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: 'facebook',
        })
      })
  }

  loginGoogle = () => {
    auth().signInWithPopup(provider.google)
      .then(({ user }) => {
        console.log(user);
        this.setState({ 
          uid: user.uid,
          email: user.email,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: 'google',
        })
      })
  }

  logout = () => {
    auth().signOut().then(() => {
      this.setState({
        uid: null,
        email: null,
        phoneNumber: null,
        displayName: null,
        photoURL: null,
        provider: null,
      })
    }).catch((err) => {
      console.error('logout error: ', err);
    });
  }

  render() {

    return (
      <div>
        <div>SignUp Page</div>
        <div className='app'>
          <p>{this.state.user ? `Hi, ${this.state.user.displayName}!` : 'Hi!'}</p>
          <div className='login'>
            <button onClick={this.loginFacebook}>
                Login with Facebook
            </button>
          </div>
          <div className='login'>
            <button onClick={this.loginGoogle}>
                Login with Google
            </button>
          </div>
          <div>
            <button onClick={this.logout}>
                Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;

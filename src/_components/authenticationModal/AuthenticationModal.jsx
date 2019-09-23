import React, { useState, useEffect } from 'react';
import AuthActions from './actions';
import firebase from '../../firebase';
import { Modal, Icon, Input, Alert } from 'antd';
import style from './modal.module.scss';

export function AuthenticationModal({ modalType, hideAuthenticationModal }) {
  const [userAuthInfo, setUserAuthInfo] = useState({ username: '', email: '', password: '' });
  const [showInputError, setInputError] = useState(false);
  const [showAuthError, setAuthError] = useState(false);

  const handleAuthentication = () => {
    if (modalType.type === 'login') {
      if (validateEmail(userAuthInfo.email) && userAuthInfo.password.trim()) {
        setInputError(false);
        firebase
          .auth()
          .signInWithEmailAndPassword(userAuthInfo.email, userAuthInfo.password)
          .then((user) => {
            const payload = { email: userAuthInfo.email };
            AuthActions.userLogin(payload, user.user.ma)
              .then(data => {
                localStorage.setItem('MOVIE_CATALOG_USER', data.data.accessToken);
                hideAuthenticationModal({ visible: false, type: '' })
              })
              .catch((error) => {
                setAuthError(true);
              });
          })
          .catch((error) => {
            setAuthError(true);
          });
      }
      setInputError(true);
      return;
    }
    if (validateEmail(userAuthInfo.email) && userAuthInfo.password.trim() && userAuthInfo.username.trim()) {
      setInputError(false);
      firebase.auth().createUserWithEmailAndPassword(userAuthInfo.email, userAuthInfo.password)
        .then((user) => {
          console.log(user);
          const payload = { email: userAuthInfo.email, username: userAuthInfo.username };
          AuthActions.userSignUp(payload, user.user.ma)
            .then(data => {
              localStorage.setItem('MOVIE_CATALOG_USER', data.data.accessToken);
              hideAuthenticationModal({ visible: false, type: '' })
            })
            .catch((error) => {
              setAuthError(true);
            });
        })
        .catch(function (error) {
          setAuthError(true);
        });
      return;
    }
    setInputError(true);
  };
  const validateEmail = (email) => {
    var regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  }

  const handleAuthInput = (e) => {
    setUserAuthInfo({ ...userAuthInfo, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      title={modalType.type === 'login' ? 'Login' : 'Sign Up'}
      wrapClassName={style.auth_modal_container}
      maskClosable={false}
      okText={modalType.type === 'login' ? 'Login' : 'SignUp'}
      visible={modalType.visible}
      onCancel={hideAuthenticationModal}
      onOk={handleAuthentication}
    >
      {showInputError && <p>Please add correct values to fields</p>}
      {
        showAuthError &&
        <>
        <Alert
          message="Some error occured. Please try again."
          type="error"
          closable
          afterClose={() => setAuthError(false)}
        />
        <br />
        </>
      }
      {
        modalType.type !== 'login' ?
          <>
            <Input
              value={userAuthInfo.username || ''}
              placeholder="Enter your username"
              name="username"
              onChange={handleAuthInput}
              className={style.auth_input}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <br />
            <br />
          </>
          : null
      }
      <Input
        value={userAuthInfo.email || ''}
        name="email"
        onChange={handleAuthInput}
        placeholder="Enter your email"
      />
      <br />
      <br />
      <Input.Password
        placeholder="Input password"
        name="password"
        value={userAuthInfo.password || ''}
        onChange={handleAuthInput}
      />
    </Modal>
  );

}

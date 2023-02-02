import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserLoggedIn from './UserLoggedIn';
import SignUp from './SignUp';
import Login from './Login';

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {props.loggedIn ? (
            <UserLoggedIn handleLogout={props.handleLogout} email={props.email} />
          ) : (
            <Login setUsername={props.setUsername} userRef={props.userRef} setPassword={props.setPassword} handleLogin={props.handleLogin} />
          )}
        </Route>
        <Route path="/signup">
          <SignUp
            handleSignup={props.handleSignup}
            userRef={props.userRef}
            setEmail={props.setEmail}
            setUsername={props.setUsername}
            setPassword={props.setPassword}
            setConfirmPassword={props.setConfirmPassword}
            setUserFocus={props.setUserFocus}
            userFocus={props.userFocus}
            username={props.username}
            validUsername={props.validUsername}
            usernameExists={props.usernameExists}
            emailFocus={props.emailFocus}
            validEmail={props.validEmail}
            email={props.email}
            emailExists={props.emailExists}
            setEmailFocus={props.setEmailFocus}
            password={props.password}
            passwordFocus={props.passwordFocus}
            setPasswordFocus={props.setPasswordFocus}
            validPassword={props.validPassword}
            confirmPassword={props.confirmPassword}
            confirmPasswordFocus={props.confirmPasswordFocus}
            setConfirmPasswordFocus={props.setConfirmPasswordFocus}
            validConfirmPassword={props.validConfirmPassword}
          />
        </Route>

      </Switch>
    </BrowserRouter>
  );
};

export default Router;

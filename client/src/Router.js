import { Routes, Route } from 'react-router-dom';

import UserLoggedIn from './pages/UserLoggedIn';
import SignUp from './pages/Signup';
import Login from './pages/Login.jsx';
import Confirmation from "./pages/Confirmation";
import PasswordResetRequest from "./pages/PasswordResetRequest"
import PasswordReset from "./pages/PasswordReset"


const Router = (props) => {
  return (
    <Routes>
      <Route path="/" exact element={
        props.loggedIn ? (
          <UserLoggedIn
            handleLogout={props.handleLogout}
            handleDeleteAccount={props.handleDeleteAccount}
            loading={props.loading}
            user={props.user}
          />
        ) : (
          <Login
            setUsername={props.setUsername}
            userRef={props.userRef}
            setEmail={props.setEmail}
            setPassword={props.setPassword}
            handleLogin={props.handleLogin}
            handleShowPassword={props.handleShowPassword}
            passwordRef={props.passwordRef}
            showPassword={props.showPassword}
            loading={props.loading}
            setLoading={props.setLoading}
          />
        )
      }>
      </Route>

      <Route path="/signup" element={
        <SignUp
          handleSignup={props.handleSignup}
          userRef={props.userRef}
          setEmail={props.setEmail}
          setUsername={props.setUsername}
          setPassword={props.setPassword}
          setConfirmPassword={props.setConfirmPassword}
          setUserFocus={props.setUserFocus}
          userFocus={props.userFocus}
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
          isValidLogin={props.isValidLogin}
          username={props.username}
          setIsValidLogin={props.setIsValidLogin}
          handleShowPassword={props.handleShowPassword}
          passwordRef={props.passwordRef}
          confirmPasswordRef={props.confirmPasswordRef}
          showPassword={props.showPassword}
          showConfirmPassword={props.showConfirmPassword}
          loading={props.loading}
          setLoading={props.setLoading}
        />
      }>
      </Route>

      <Route path="/confirmation/:action/:email" element={
        <Confirmation />
      }>
      </Route>

      <Route path="/confirmation/:action" element={
        <Confirmation />
      }>
      </Route>

      <Route path="/password-reset-request" element={
        <PasswordResetRequest
          handlePasswordResetRequest={props.handlePasswordResetRequest}
          email={props.email}
          setEmail={props.setEmail}
          loading={props.loading}
          setLoading={props.setLoading}
        />
      }>
      </Route>

      <Route path="/password-reset/:_id/:resetString" element={
        <PasswordReset
          password={props.password}
          passwordFocus={props.passwordFocus}
          validPassword={props.validPassword}
          confirmPassword={props.confirmPassword}
          confirmPasswordFocus={props.confirmPasswordFocus}
          setConfirmPasswordFocus={props.setConfirmPasswordFocus}
          validConfirmPassword={props.validConfirmPassword}
          handleShowPassword={props.handleShowPassword}
          passwordRef={props.passwordRef}
          confirmPasswordRef={props.confirmPasswordRef}
          showPassword={props.showPassword}
          showConfirmPassword={props.showConfirmPassword}
          handleChangePassword={props.handleChangePassword}
          setPasswordFocus={props.setPasswordFocus}
          setPassword={props.setPassword}
          setConfirmPassword={props.setConfirmPassword}
          loading={props.loading}
          setLoading={props.setLoading}
        />
      }>
      </Route>

    </Routes>
  );
};

export default Router;

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Router from './Router';
import Container from './components/Container/Container';
import { useAddNotification } from './components/Notifications/NotificationProvider';
import jwt from "jwt-decode"
import vars from './config'

import './App.css';

const { api, env } = vars;

function App() {
  const dispatchAddNotification = useAddNotification();

  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')))
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [user, setUser] = useState({});

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false)

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, SetShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
  const [showConfirmPassword, SetShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailExists, setEmailExists] = useState(false)


  const userRef = useRef();
  // errRef will be used to put focus on it when it occurs so that it can be announced by screen readers for accessibility
  const errRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const USER_REGEX = /^[a-zA-Z0-9-_]{3,22}$/;
  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?&*()$%]).{3,24}$/;


  const options = {
    headers: {
      "x-access-token": localStorage.getItem('token')
    }
  }

  const handleShowPassword = (ref) => {
    if (ref.current.id === 'password') {
      SetShowPassword(prev => !prev)
      if (showPassword) {
        passwordRef.current.type = "password"
      } else {
        passwordRef.current.type = "text"
      };
    }
    if (ref.current.id === 'confirmPassword') {
      SetShowConfirmPassword(prev => !prev)
      if (showConfirmPassword) {
        confirmPasswordRef.current.type = "password"
      } else {
        confirmPasswordRef.current.type = "text"
      }
    }
  }

  const handlePasswordResetRequest = () => {
    setLoading(true)
    const redirectUrl = `${api}`;

    axios.post(`${api}/auth/request-password-reset`, { email, redirectUrl })
      .then(response => {
        setLoading(false)
        if (response.data.status === "PENDING") {
          navigate(`/confirmation/reset-password-email/${email}`);
          window.location.reload();
        }
      })
      .catch(error => {
        setLoading(false)
        handleError(error)
      });
  }

  const handleChangePassword = (_id, resetString) => {
    setLoading(true)
    const userId = _id;
    const newPassword = password
    axios.post(`${api}/auth/password-reset`, { userId, resetString, newPassword })
      .then(response => {
        setLoading(false)

        if (response.data.status === "SUCCESS") {
          navigate(`/confirmation/password-changed`);
          window.location.reload();
        }
        setPassword("");
        setConfirmPassword("")
      })
      .catch(error => {
        setLoading(false)
        handleError(error)
      });
  }

  const handleSignup = () => {
    setLoading(true)

    axios.post(`${api}/auth/signup`, {
      username,
      email,
      password,
      confirmPassword
    })
      .then(response => {
        console.log('response: ', response);
        if (response.data.status === "PENDING") {
          setLoading(false)
          navigate(`/confirmation/confirm-email/${email}`);
          window.location.reload();
        }
        dispatchAddNotification({ result: "SUCCESS", message: "A verification email has been sent to your email address!" });
      })
      .catch(error => {
        setLoading(false)
        handleError(error)
      });
  }

  const handleLogin = () => {
    setEmail('dispeandrea@gmail.com')
    setLoading(true)
    axios.post(`${api}/auth/login`, {
      username,
      password
    })
      .then(response => {
        const currentUser = jwt(response.data.token);
        console.log('currentUser: ', currentUser);
        // store all user information from the JWT
        if (currentUser) {
          setUser(currentUser);
        }
        if (response.data.authenticated) {
          localStorage.setItem('token', response.data.token)
          setLoggedIn(true);
          setLoading(false)
          dispatchAddNotification({ result: "SUCCESS", message: "Succesfully Logged in!" });
        }
      })
      .catch(error => {
        setLoading(false)
        handleError(error);
      });
  }

  const handleError = (error) => {
    if (error.code === "ERR_NETWORK") {
      dispatchAddNotification({ result: "ERROR", message: "There is a problem with the connection to the server. Please try again" });
    } else {
      const errorsArray = error.response.data.errors;
      errorsArray.forEach(err => dispatchAddNotification({ result: "ERROR", message: err.msg }));
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  }

  const handleDeleteAccount = (email) => {
    setLoading(true)
    axios.post(`${api}/user/delete-account`, {
      username: user.username,
      email: user.email
    }, options)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          localStorage.removeItem('token');
          setLoggedIn(false);
          setLoading(false)
          dispatchAddNotification({ result: response.data.status, message: response.data.msg });
          navigate('/');
        } else {
          setLoading(false)
          dispatchAddNotification({ result: response.data.status, message: response.data.msg });
        }
      })
      .catch(error => {
        setLoading(false)
        handleError(error);
      });
  }

  // VALIDATE THE USERNAME
  useEffect(() => {
    if (username.includes('@')) {
      setEmail(username);
    }
    // check if username matches the regexp. It returns a boolean value
    const result = USER_REGEX.test(username)
    let checkUsernameExists = setTimeout(() => {
      axios.post(`${api}/auth/check-username-exists`, {
        username
      })
        .then(response => {
          setUsernameExists(response.data.exists)
          setValidUsername(result)

        })
        .catch(error => {
          console.log('error: ', error);
        });
    }, 700);
    return () => {
      clearTimeout(checkUsernameExists);
    }
  }, [username])

  // VALIDATE THE EMAIL
  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    let checkEmailExists = setTimeout(() => {
      axios.post(`${api}/auth/check-email-exists`, {
        email
      })
        .then(response => {
          setEmailExists(response.data.exists)
          setValidEmail(result)
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }, 500);
    return () => {
      clearTimeout(checkEmailExists);
    }
  }, [email])

  // VALIDATE THE PASSWORD
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    (password.length > 0 && confirmPassword.length > 0) && setValidConfirmPassword(password === confirmPassword)
  }, [password, confirmPassword])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      const currentUser = jwt(token);
      currentUser && setUser(currentUser)
    }
  }, [])

  return (
    <>
      <Container>
        <p ref={errRef}></p>
        <Router
          userRef={userRef}
          setUserFocus={setUserFocus}
          username={username}
          setIsValidLogin={setIsValidLogin}
          userFocus={userFocus}
          handleSignup={handleSignup}
          setUsername={setUsername}
          setConfirmPassword={setConfirmPassword}
          setEmail={setEmail}
          isValidLogin={isValidLogin}

          password={password}
          setPassword={setPassword}
          passwordFocus={passwordFocus}
          setPasswordFocus={setPasswordFocus}
          validPassword={validPassword}
          confirmPassword={confirmPassword}
          confirmPasswordFocus={confirmPasswordFocus}
          validConfirmPassword={validConfirmPassword}
          setConfirmPasswordFocus={setConfirmPasswordFocus}

          handleLogin={handleLogin}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          validUsername={validUsername}
          usernameExists={usernameExists}
          emailFocus={emailFocus}
          validEmail={validEmail}
          email={email}
          emailExists={emailExists}
          setEmailFocus={setEmailFocus}
          handleShowPassword={handleShowPassword}
          passwordRef={passwordRef}
          confirmPasswordRef={confirmPasswordRef}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          handleChangePassword={handleChangePassword}
          handlePasswordResetRequest={handlePasswordResetRequest}

          loading={loading}
          setLoading={setLoading}
          handleDeleteAccount={handleDeleteAccount}
          user={user}
        ></Router>
      </Container>
    </>
  );
}

export default App;

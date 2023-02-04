import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from './components/Container';
import Router from './components/Router';
import Toasty from './components/Toasty';
import { useAddNotification } from './components/Notifications/NotificationProvider';

import './App.css';
import axios from 'axios';


function App() {
  const dispatchAddNotification = useAddNotification();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false)

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailExists, setEmailExists] = useState(false)

  const [isValidLogin, setIsValidLogin] = useState(false);
  const [toasty, setToasty] = useState(false)
  const [toastyTimer, setToastyTimer] = useState(0)

  // useEffect(() => {

  //   setTimeout(() => {
  //     setToasty(true)
  //     setToastyTimer(prev => prev + 1)
  //   }, (toastyTimer === 0 ? 4000 : 1_800_000))
  // }, [])

  const userRef = useRef();
  // errRef will be used to put focus on it when it occurs so that it can be announced by screen readers for accessibility
  const errRef = useRef();
  const history = useHistory();
  const loggedIn = Boolean(localStorage.getItem('token'));
  const USER_REGEX = /^[a-zA-Z0-9-_]{3,22}$/;
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?&*()$%]).{3,24}$/;

  function handleSignup() {
    axios.post('http://localhost:5000/auth/signup', {
      username,
      email,
      password,
      confirmPassword
    })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        history.push('/');
        window.location.reload();
      })
      .catch(error => {
        console.log('error froms aving user in db: ', error);
        handleError(error)
      });
  }

  function handleLogin() {
    axios.post('http://localhost:5000/auth/login', {
      username,
      password
    })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        history.push('/');
        window.location.reload();
        dispatchAddNotification({ result: "SUCCESS", message: "Succesfully Logged in!" });
      })
      .catch(error => {
        console.log('error: ', error);
        handleError(error)
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

  function handleLogout() {
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload();
  }

  // VALIDATE THE USERNAME
  useEffect(() => {
    // check if username matches the regexp. It returns a boolean value
    const result = USER_REGEX.test(username)

    let checkUsernameExists = setTimeout(() => {
      axios.post('http://localhost:5000/auth/check-username-exists', {
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
    // setValidUsername(result)
    return () => {
      clearTimeout(checkUsernameExists);
    }
  }, [username])

  // VALIDATE THE EMAIL
  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    console.log('result: ', result);
    let checkEmailExists = setTimeout(() => {
      console.log('email: ', email);
      axios.post('http://localhost:5000/auth/check-email-exists', {
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
    // setValidEmail(result)
    return () => {
      clearTimeout(checkEmailExists);
    }
  }, [email])

  // useEffect(() => {
  //   console.log('isValidLogin: ', isValidLogin);
  //   if (username.length > 3 && password.length > 3) {
  //     setIsValidLogin(true)
  //   }
  // }, [username, password])

  // VALIDATE THE PASSWORD
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    (password.length > 0 || confirmPassword.length > 0) && setValidConfirmPassword(password === confirmPassword)
  }, [password, confirmPassword])

  return (
    <>
      {/* {toasty && <Toasty />} */}
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
        ></Router>
      </Container>
    </>
  );
}

export default App;

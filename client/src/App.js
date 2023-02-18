import { useState, useRef, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Container from './components/Container';
import Router from './Router';
import Toasty from './components/Toasty/Toasty';
import { useAddNotification } from './components/Notifications/NotificationProvider';
import debounce from 'lodash.debounce';


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
  const [showPassword, SetShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
  const [showConfirmPassword, SetShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailExists, setEmailExists] = useState(false)

  const [isValidLogin, setIsValidLogin] = useState(false);
  const [toasty, setToasty] = useState(false)
  const [toastyTimer, setToastyTimer] = useState(0)

    const [isCallable, setIsCallable] = useState(true);


  const userRef = useRef();
  // errRef will be used to put focus on it when it occurs so that it can be announced by screen readers for accessibility
  const errRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();
  const loggedIn = Boolean(localStorage.getItem('token'));
  const USER_REGEX = /^[a-zA-Z0-9-_]{3,22}$/;
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?&*()$%]).{3,24}$/;

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
    const redirectUrl = 'http://localhost:3000/password-reset';
    axios.post('http://localhost:5000/auth/request-password-reset', { email, redirectUrl })
      .then(response => {
        dispatchAddNotification({ result: "SUCCESS", message: response.data.msg });
        setEmail("")
      })
      .catch(error => {
        handleError(error)
      });
  }

  const changePassword = (_id, resetString) => {
    const userId = _id;
    const newPassword = password
    axios.post('http://localhost:5000/auth/password-reset', { userId, resetString, newPassword })
      .then(response => {
        dispatchAddNotification({ result: "SUCCESS", message: response.data.msg });
        setPassword("");
        setConfirmPassword("")
      })
      .catch(error => {
        handleError(error)
      });
  }

  const handleSignup = () => {
    axios.post('http://localhost:5000/auth/signup', {
      username,
      email,
      password,
      confirmPassword
    })
      .then(response => {
        if (response.data.status === "PENDING") {
          history.push(`/email-sent/${email}`);
          window.location.reload();

        }
        // localStorage.setItem('token', response.data.token);
        // history.push('/');
        // window.location.reload();

        dispatchAddNotification({ result: "SUCCESS", message: "A verification email has been sent to your email address!" });

      })
      .catch(error => {
        handleError(error)
      });
  }

  const handleLogin = () => {
    axios.post('http://localhost:5000/auth/login', {
      username,
      password
    })
      .then(response => {
        // code here ...
        dispatchAddNotification({ result: "SUCCESS", message: "Succesfully Logged in!" });
      })
      .catch(error => {
        dispatchAddNotification({ result: "ERROR", message: error.msg });
      });
  }

  const handleError = (error) => {
    console.error(error)
    if (error.code === "ERR_NETWORK") {
      dispatchAddNotification({ result: "ERROR", message: "There is a problem with the connection to the server. Please try again" });
    } else {
      const errorsArray = error.response.data.errors;
      errorsArray.forEach(err => dispatchAddNotification({ result: "ERROR", message: err.msg }));
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload();
  }

  // VALIDATE THE USERNAME
  useEffect(() => {
    console.log({ email, username });
    if (username.includes('@')) {
      setEmail(username);
    }
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
    let checkEmailExists = setTimeout(() => {
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
    return () => {
      clearTimeout(checkEmailExists);
    }
  }, [email])

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
          handleShowPassword={handleShowPassword}
          passwordRef={passwordRef}
          confirmPasswordRef={confirmPasswordRef}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          changePassword={changePassword}
          handlePasswordResetRequest={handlePasswordResetRequest}
        ></Router>
      </Container>
    </>
  );
}

export default App;

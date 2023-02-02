import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from './components/Container';
import Router from './components/Router';
import Toasty from './components/Toasty';

import './App.css';
import axios, { isCancel, AxiosError, AxiosHeaders } from 'axios';


function App() {
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

  const [errors, setErrors] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [success, setScueess] = useState(false)

  const [toasty, setToasty] = useState(false)
  const [toastyTimer, setToastyTimer] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setToasty(true)
      setToastyTimer(prev => prev + 1)
    }, (toastyTimer === 0 ? 4000 : 1_800_000))
  }, [])

  const userRef = useRef();
  // errRef will be used to put focus on it when it occurs so that it can be announced by screen readers for accessibility
  const errRef = useRef();
  const history = useHistory();
  const loggedIn = Boolean(localStorage.getItem('token'));
  const USER_REGEX = /^[a-zA-Z0-9-_]{3,22}$/;
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?&*()$%]).{3,24}$/;

  function handleSignup() {
    // fetch('http://localhost:5000/auth/signup', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, email, password }),
    // })
    //   .then((response) => response.json())
    //   .then((token) => {
    //     // history.push('/');
    //     // window.location.reload();
    //   })
    //   .catch((error) => console.log(error));


    axios.post('http://localhost:5000/auth/signup', {
      username,
      email,
      password,
      confirmPassword
    })
      .then(token => {
        console.log('token: ', token);
        localStorage.setItem('token', token);
        history.push('/');
        window.location.reload();
      })
      .catch(error => {
        console.log('error.response.data.errors: ', error);
        setErrors(error.response.data.errors)
        alert(error.response.data.errors[0].msg)
      });
  }

  // async function handleLogin() {
  //   try {
  //     const response = await fetch('http://localhost:5000/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     console.log('response received by the server: ', response);

  //     if (response.data) {
  //       console.log('there is response.data');
  //       console.log('response.data: ', response.data);
  //     } else {
  //       console.log('there is no response data');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function handleLogin() {
    axios.post('http://localhost:5000/auth/login', {
      username,
      password
    })
      .then(token => {
        console.log('token: ', token);
        localStorage.setItem('token', token);
        // history.push('/');
        // window.location.reload();
      })
      .catch(error => {
        setErrors(error.response.data.errors)
        alert(error.response.data.errors[0].msg)
      });
  }

  // function handleLogin() {
  //   fetch('http://localhost:5000/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, password }),
  //   })
  //     .then((response) => {
  //       if(!response.ok) {
  //         return response.json().then((errorJSON) => {
  //           console.log('errorJSON: ', errorJSON.errors[0]);
  //           throw Error(errorJSON.errors);
  //         })
  //       }
  //       return response.json();


  //       // if(!response.ok) {
  //       //   throw Error(response)
  //       // }
  //       // return response.json()
  //     })
  //     .then((token) => {
  //       localStorage.setItem('token', token);
  //       history.push('/');
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log('error: ', JSON.stringify(error));
  //       console.log('error:', JSON.parse(error));
  //     })
  //     // .catch((error) => {
  //     //   return error.json().then((errorJSON) => {
  //     //     console.log(errorJSON.errors);
  //     //     // setErrors(errorJSON.errors);
  //     //   });
  //     // });
  //   }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    history.push('/');
    window.location.reload();
  }

  useEffect(() => {
    userRef.current.focus();
  }, [])

  // VALIDATE THE USERNAME
  useEffect(() => {
    // check if username matches the regexp. It returns a boolean value
    const result = USER_REGEX.test(username)
    // setTimeout(() => {
    //   console.log('username: ', username);
    // }, 500);

    let checkUsernameExists = setTimeout(() => {
      console.log('FIRED: ', username);
      axios.post('http://localhost:5000/auth/check-username-exists', {
        username
      })
        .then(response => {
          setUsernameExists(response.data.exists)
          setValidUsername(result)

        })
        .catch(error => {
          console.log('error: ', error);
          // setErrors(error.response.data.errors)
          // alert(error.response.data.errors[0].msg)
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
          // setErrors(error.response.data.errors)
          // alert(error.response.data.errors[0].msg)
        });
    }, 500);
    // setValidEmail(result)
    return () => {
      clearTimeout(checkEmailExists);
    }
  }, [email])

  // VALIDATE THE PASSWORD
  useEffect(() => {
    const result = PWD_REGEX.test(password)
    setValidPassword(result)
    // const match = password === confirmPassword;
    console.log('password === confirmPassword: ', (password.length > 0 && confirmPassword.length > 0) && password === confirmPassword);
    console.log('password, confirmPassword: ', password.length, confirmPassword.length);
    (password.length > 0 || confirmPassword.length > 0) && setValidConfirmPassword(password === confirmPassword)
  }, [password, confirmPassword])

  useEffect(() => {
    console.log('validConfirmPassword: ', validConfirmPassword);
  }, [validConfirmPassword])


  useEffect(() => {
    setErrMsg('')
  }, [username, password, confirmPassword])


  return (
    <>
      {toasty && <Toasty />}
      <Container>
        <p ref={errRef}></p>
        <Router
          userRef={userRef}
          setUserFocus={setUserFocus}
          userFocus={userFocus}
          handleSignup={handleSignup}
          username={username}
          setUsername={setUsername}
          setConfirmPassword={setConfirmPassword}
          setEmail={setEmail}

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

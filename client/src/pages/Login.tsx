import { Link } from 'react-router-dom';
import { FaUserAlt, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { handleKeypress } from '../utils/utils'
import ButtonConfirm from '../components/ButtonConfirm/ButtonConfirm'
import BackgroundBox from '../components/BackgroundBox/BackgroundBox'
import FormBox from '../components/FormBox/FomBox'
import ReactGA from "react-ga4";

import "./Login.css"

interface LoginProps {

  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
  userRef: React.RefObject<HTMLInputElement>;
  isValidLogin: boolean;
  username: string;
  password: string;
  setIsValidLogin: (value: boolean) => void;
  passwordRef: React.RefObject<HTMLInputElement>;
  handleShowPassword: (ref: React.RefObject<HTMLInputElement>) => void;
  showPassword: boolean;
  loading: boolean;
  setLoading: (value: boolean) => void;
}


const Login: React.FC<LoginProps>  = ({ setUsername, setEmail, setPassword, handleLogin, userRef, isValidLogin, username, password, setIsValidLogin, passwordRef, handleShowPassword, showPassword, loading, setLoading, }) => {

  const handleCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.includes('@')) {
      setEmail(value);
      setUsername('')
    } else {
      setUsername(value);
      setEmail('')
    }
  }

  const trackEvent = (category= "Event Category", ) => {
    // window.dataLayer.push({'event': 'button_clicked_test_new'})
    // ReactGA.event("test_click_login",  {action: 'press_login_button'});
  }


  // ReactGA.event({
  //   category: "your category",
  //   action: "your action",
  //   label: "your label", // optional
  //   value: 99, // optional, must be a number
  //   nonInteraction: true, // optional, true/false
  //   transport: "xhr", // optional, beacon/xhr/image
  // });

  return (
    <>
      <BackgroundBox />
      <FormBox>
        <h2 className="text-blue-500 m-9 text-2xl font-bold w-15">Log In</h2>
        <div className='auth-input-container login-email'>
          <FaUserAlt className="auth-icon" size='20px' />
          <input
            ref={userRef}
            placeholder="Enter username or email"
            type="text"
            className="auth-input"
            onChange={(e) => handleCredentials(e)}
            required
            onKeyPress={(e) => handleKeypress(e, handleLogin)}
          />
        </div>
        <div className='auth-input-container login-password'>
          <FaKey className="auth-icon" size='20px' />
          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="Enter password "
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
            required
            onKeyPress={(e) => handleKeypress(e, handleLogin)}
          />
          {
            showPassword ? <FaEyeSlash className="auth-icon-password-eye" onClick={() => handleShowPassword(passwordRef)} />
              : <FaEye className="auth-icon-password-eye" onClick={() => handleShowPassword(passwordRef)} />
          }
        </div>
        <ButtonConfirm
          loading={loading}
          // cb={handleLogin}
          cb={trackEvent}
          text="LOGIN"
        />
        <div>
          <p className="sm:text-base md:text-xs mt-2">
            <Link to='/password-reset-request' className="text-blue-500 mb-5">
              Forgot the password?
            </Link>
          </p>
        </div>
        <div>
          <p className="sm:text-base md:text-xs mt-2">
            No account?{' '}
            <Link to="/signup" className="text-blue-500 mb-5">
              Register here.
            </Link>
          </p>
        </div>
      </FormBox>
    </>
  );
};

export default Login;

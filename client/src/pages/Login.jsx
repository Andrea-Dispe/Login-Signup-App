import { Link } from 'react-router-dom';
import { FaUserAlt, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { handleKeypress } from '../utils/utils'
import ButtonConfirm from '../components/ButtonConfirm/ButtonConfirm'
import BackgroundBox from '../components/BackgroundBox/BackgroundBox'
import "./Login.css"


const Login = ({ setUsername, setEmail, setPassword, handleLogin, userRef, isValidLogin, username, password, setIsValidLogin, passwordRef, handleShowPassword, showPassword, loading, setLoading, }) => {

  return (
    <>
      <BackgroundBox />
      <div className="flex justify-center items-center flex-col shadow-xl bg-white sm:rounded-xl xs:rounded-b-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd -top-7">
        <h2 className="text-blue-500 m-9 text-2xl font-bold w-15">Log In</h2>
        <div className='auth-input-container login-email'>
          <FaUserAlt className="auth-icon" size='20px' />
          <input
            ref={userRef}
            placeholder="Enter username or email"
            type="text"
            className="auth-input"
            onChange={(e) => setUsername(e.target.value)}
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
          cb={handleLogin}
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
      </div>

    </>
  );
};

export default Login;

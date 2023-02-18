import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import StrengthMeter from '../components/StrengthMeter/StrengthMeter'
import { FaUserAlt, FaEnvelope, FaKey, FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "./Signup.css";


const SignUp = (props) => {

  return (
    <>
      <div className="bg-blue-500 mt-7 shadow-2xl xs:rounded-t-xl sm:rounded-xl xs:h-48 sm:h-96">
        <div className="p-5 text-white">
          <h1 className="text-5xl">Welcome</h1>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">
        <h2 className="text-blue-500 m-1 text-2xl font-bold w-15 pb-7">Sign Up</h2>

        <div className='auth-input-container'>
          <FaEnvelope className="auth-icon" size='20px' />

          <input
            ref={props.userRef}
            placeholder="Email"
            type="text"
            className="auth-input"
            onChange={(e) => props.setEmail(e.target.value)}
            onFocus={() => props.setEmailFocus(true)}
            onBlur={() => props.setEmailFocus(false)}
            maxLength={45}
            required
          />
          <span className={
            props.emailFocus &&
              !props.validEmail &&
              props.email.length > 0
              ? 'auth-validation-msg' : 'hide'}>
            Please provide a valid email
          </span>
          <span className={
            props.emailExists && props.validEmail ? 'auth-validation-msg' : 'hide'
          }>
            This Email is already taken
          </span>
          <div className={'auth-icon-wrapper ' + (props.emailFocus ? 'auth-icon-wrapper-focused' : '')}>
            {props.validEmail && !props.emailExists ?
              <FaCheck className='green-check' /> : props.email.length > 0 && <ImCross className='red-xmark' />
            }
          </div>
        </div>

        <div className='auth-input-container'>
          <FaUserAlt className="auth-icon" size='20px' />
          <input
            type="text"
            placeholder="Username"
            className="auth-input"
            onChange={(e) => props.setUsername(e.target.value)}
            required
            onFocus={() => props.setUserFocus(true)}
            onBlur={() => props.setUserFocus(false)}
            maxLength={23}
          />
          <span className={
            props.userFocus &&
              !props.validUsername &&
              props.username.length > 0
              ? 'auth-validation-msg' : 'hide'}>
            3-23 chars, numbers and underscores only
          </span>
          <span className={
            props.usernameExists && props.validUsername ? 'auth-validation-msg' : 'hide'
          }>
            This Username is already taken
          </span>
          {/* <div className={'mb-7 border-b-2 border-grey-600 text-md ' + (props.userFocus ? 'border-blue-500' : '')}> */}

          <div className={'auth-icon-wrapper ' + (props.userFocus ? 'auth-icon-wrapper-focused' : '')}>
            {props.validUsername && !props.usernameExists ? <FaCheck className='green-check' /> : props.username.length > 0 && <ImCross size='13px' className='red-xmark' />}
          </div>
        </div>
        <div className='auth-input-container'>
          <FaKey className="auth-icon" size='20px' />
          <input
            ref={props.passwordRef}
            type="password"
            placeholder="Password"
            id="password"
            className="auth-input"
            onChange={(e) => props.setPassword(e.target.value)}
            required
            onFocus={() => props.setPasswordFocus(true)}
            onBlur={() => props.setPasswordFocus(false)}
            maxLength={40}
          />
          {
            props.showPassword ? <FaEyeSlash className="auth-icon-password-eye" style={props.password.length > 0 ? { 'marginRight': '22px' } : ''} onClick={() => props.handleShowPassword(props.passwordRef)} />
              : <FaEye className="auth-icon-password-eye" style={props.password.length > 0 ? { 'marginRight': '22px' } : ''} onClick={() => props.handleShowPassword(props.passwordRef)} />
          }
          <span className={
            props.passwordFocus &&
              !props.validPassword
              ? 'auth-validation-msg' : 'hide'}>
            {props.password.length === 40 && 'Password must be max 40 chars long'}
            {(props.password.length < 4 || props.password.length === 0) && 'Password must be longer than 3 characters'}
            {props.password.length > 3 && props.password.length < 40 && "At least"}
            {props.password.length > 3 && props.password.length < 40 && !/(?=.*[a-z])/.test(props.password) && ' 1 lowercase,'}
            {props.password.length > 3 && props.password.length < 40 && !/(?=.*[A-Z])/.test(props.password) && ' 1 uppercase,'}
            {props.password.length > 3 && props.password.length < 40 && !/(?=.*[0-9])/.test(props.password) && ' 1 number,'}
            {props.password.length > 3 && props.password.length < 40 && !/(?=.*[!@#$%])/.test(props.password) && ' 1 symbol'}
          </span>
          {props.passwordFocus && props.password.length > 3 && <StrengthMeter password={props.password} />}
          <div className={'auth-icon-wrapper ' + (props.passwordFocus ? 'auth-icon-wrapper-focused' : '')}>
            {props.validPassword ? <FaCheck className='green-check' /> : props.password.length > 0 && <ImCross className='red-xmark' />}
          </div>
        </div>
        <div className='auth-input-container'>
          <FaKey className="auth-icon" size='20px' />
          <input
            ref={props.confirmPasswordRef}
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="auth-input"
            onChange={(e) => props.setConfirmPassword(e.target.value)}
            required
            onFocus={() => props.setConfirmPasswordFocus(true)}
            onBlur={() => props.setConfirmPasswordFocus(false)}
          />
          {
            props.showConfirmPassword ? <FaEyeSlash className="auth-icon-password-eye" style={props.confirmPassword.length > 0 ? { 'marginRight': '22px' } : ''} onClick={() => props.handleShowPassword(props.confirmPasswordRef)} />
              : <FaEye className="auth-icon-password-eye" style={props.confirmPassword.length > 0 ? { 'marginRight': '22px' } : ''} onClick={() => props.handleShowPassword(props.confirmPasswordRef)} />
          }
          <span className={
            props.confirmPasswordFocus &&
              !props.validConfirmPassword &&
              props.confirmPassword.length > 0
              ? 'auth-validation-msg' : 'hide'}>
            The confirmation password doesn't match
          </span>
          <div className={'auth-icon-wrapper ' + (props.confirmPasswordFocus ? 'auth-icon-wrapper-focused' : '')}>
            {props.validConfirmPassword ? <FaCheck className='green-check' /> : props.confirmPassword.length > 0 && <ImCross className='red-xmark' />}
          </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white w-full mt-7 mb-1 focus:outline-none xs:text-lg sm:text-xs xs:rounded  p-2"
          onClick={props.handleSignup}
        >
          REGISTER
        </button>
        <div>
          <p className="text-xs mt-2">
            Already registered?{' '}
            <Link to="/" className="text-blue-500 mb-5 text-xs">
              Login here.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;

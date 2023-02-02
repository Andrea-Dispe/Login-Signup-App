import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StrengthMeter from './StrengthMeter'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const SignUp = (props) => {
  return (
    <>
      <div className="bg-blue-500 mt-7 shadow-2xl xs:rounded-t-xl sm:rounded-xl xs:h-48 sm:h-96">
        <div className="p-5 text-white">
          <h1 className="text-5xl">Welcome</h1>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">
        <h2 className="text-blue-500 m-1 text-2xl font-bold w-15 pb-2.5">Sign Up</h2>

        <div className='test'>
          <div className='input'>
            <input
              ref={props.userRef}
              placeholder="Email"
              type="text"
              className="w-full border-b-2 border-grey-600 text-md p-1 focus:outline-none focus:border-blue-500 mb-7"
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
                ? 'validation-msg' : 'offscreen'}>
              Please provide a valid email
            </span>
            <span className={
              props.emailExists && props.validEmail ? 'validation-msg' : 'offscreen'
            }>
              This Email is already taken
            </span>
            <div className={'mb-7 border-b-2 border-grey-600 text-md ' + (props.emailFocus ? 'border-blue-500' : '')}>
              {props.validEmail && !props.emailExists ? <FontAwesomeIcon icon={faCheck} className='green-check' /> : props.email.length > 0 && <FontAwesomeIcon icon={faXmark} className='red-xmark' />}
            </div>
          </div>
        </div>

        <div className='test'>
          <div className='input'>
            <input
              type="text"
              placeholder="Username"
              className="w-full border-b-2 border-grey-600 text-md p-1 focus:outline-none focus:border-blue-500 mb-7"
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
                ? 'validation-msg' : 'offscreen'}>
              3-23 chars, numbers and underscores only
            </span>
            <span className={
              props.usernameExists && props.validUsername ? 'validation-msg' : 'offscreen'
            }>
              This Username is already taken
            </span>
            <div className={'mb-7 border-b-2 border-grey-600 text-md ' + (props.userFocus ? 'border-blue-500' : '')}>
              {props.validUsername && !props.usernameExists ? <FontAwesomeIcon icon={faCheck} className='green-check' /> : props.username.length > 0 && <FontAwesomeIcon icon={faXmark} className='red-xmark' />}
            </div>

          </div>
        </div>
        <div className='test'>
          <div className='input'>
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b-2 border-grey-600 text-md p-1 focus:outline-none focus:border-blue-500 mb-7 "
              onChange={(e) => props.setPassword(e.target.value)}
              required
              onFocus={() => props.setPasswordFocus(true)}
              onBlur={() => props.setPasswordFocus(false)}
              maxLength={40}
            />
            {props.validPassword}

            <span className={
              props.passwordFocus &&
                !props.validPassword
                ? 'validation-msg' : 'offscreen'}>
              {props.password.length === 40 && 'Password must be max 40 chars long'}
              {(props.password.length < 4 || props.password.length === 0) && 'Password must be longer than 3 characters'}
              {props.password.length > 3 && props.password.length < 40 && "At least"}
              {props.password.length > 3 && props.password.length < 40 && !/(?=.*[a-z])/.test(props.password) && ' 1 lowercase,'}
              {props.password.length > 3 && props.password.length < 40 && !/(?=.*[A-Z])/.test(props.password) && ' 1 uppercase,'}
              {props.password.length > 3 && props.password.length < 40 && !/(?=.*[0-9])/.test(props.password) && ' 1 number,'}
              {props.password.length > 3 && props.password.length < 40 && !/(?=.*[!@#$%])/.test(props.password) && ' 1 symbol'}
            </span>
            {props.passwordFocus && props.password.length > 3 && <StrengthMeter password={props.password} />}
            <div className={'mb-7 border-b-2 border-grey-600 text-md ' + (props.passwordFocus ? 'border-blue-500' : '')}>
              {props.validPassword ? <FontAwesomeIcon icon={faCheck} className='green-check' /> : props.password.length > 0 && <FontAwesomeIcon icon={faXmark} className='red-xmark' />}
            </div>


          </div>
        </div>
        <div className='test'>
          <div className='input'>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border-b-2 border-grey-600 text-md p-1 focus:outline-none focus:border-blue-500 mb-1 "
              onChange={(e) => props.setConfirmPassword(e.target.value)}
              required
              onFocus={() => props.setConfirmPasswordFocus(true)}
              onBlur={() => props.setConfirmPasswordFocus(false)}
            />
            <span className={
              props.confirmPasswordFocus &&
                !props.validConfirmPassword &&
                props.confirmPassword.length > 0
                ? 'validation-msg' : 'offscreen'}>
              The confirmation password doesn't match
            </span>
            <div className={'mb-1 border-b-2 border-grey-600 text-md ' + (props.confirmPasswordFocus ? 'border-blue-500' : '')}>
              {props.validConfirmPassword ? <FontAwesomeIcon icon={faCheck} className='green-check' /> : props.confirmPassword.length > 0 && <FontAwesomeIcon icon={faXmark} className='red-xmark' />}
            </div>
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

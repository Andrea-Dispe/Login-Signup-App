import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaKey, FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { handleKeypress } from '../utils/utils'
import ButtonConfirm from '../components/ButtonConfirm/ButtonConfirm'
import StrengthMeter from '../components/StrengthMeter/StrengthMeter'
import BackgroundBox from '../components/BackgroundBox/BackgroundBox'
import FormBox from '../components/FormBox/FomBox'

const PasswordReset = (props) => {
  const { resetString, _id } = useParams();

  return (
    <>
      <BackgroundBox />
      <FormBox>
        <h2 className="text-blue-500 m-9 text-2xl font-bold w-15">Reset Password</h2>
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
            onKeyPress={(e) => handleKeypress(e, props.handleChangePassword)}
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
            onKeyPress={(e) => handleKeypress(e, props.handleChangePassword)}

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

        <ButtonConfirm
          loading={props.loading}
          cb={() => props.handleChangePassword(_id, resetString)}
          text="CHANGE PASSWORD"
        />
        <div>
          <p className="text-xs mt-2">
            <Link to='/' className="text-blue-500 mb-5 text-xs">
              LOGIN
            </Link>
          </p>
        </div>
      </FormBox>
    </>
  );
}

export default PasswordReset;
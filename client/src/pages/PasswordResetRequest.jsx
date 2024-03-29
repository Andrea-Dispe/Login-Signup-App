import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaEnvelope } from "react-icons/fa";
import BackgroundBox from '../components/BackgroundBox/BackgroundBox'
import { handleKeypress } from '../utils/utils'
import ButtonConfirm from '../components/ButtonConfirm/ButtonConfirm'
import FormBox from '../components/FormBox/FomBox'


const PasswordResetRequest = ({ handlePasswordResetRequest, email, setEmail, loading }) => {

  useEffect(() => {
    return () => {
      setEmail('');
    }
  }, [])


  return (
    <>
      <BackgroundBox />

      <FormBox>
        <h2 className="text-blue-500 m-9 text-2xl font-bold w-15">Reset Password</h2>
        <div className='auth-input-container margin-bt-10' style={{ 'marginTop': '75px  ' }}>
          <FaEnvelope className="auth-icon" size='20px' />
          <input
            placeholder="Enter username or email"
            type="text"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onKeyPress={(e) => handleKeypress(e, handlePasswordResetRequest)}
          />
        </div>

        <ButtonConfirm
          loading={loading}
          cb={handlePasswordResetRequest}
          text="REQUEST NEW PASSWORD"
        />
        <div>
          <p className="sm:text-base md:text-xs mt-2">
            <Link to='/' className="text-blue-500 mb-5 text-xs">
              LOGIN
            </Link>
          </p>
        </div>

      </FormBox>

    </>
  );
}

export default PasswordResetRequest;
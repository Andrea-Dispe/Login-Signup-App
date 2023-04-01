import {useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FaEnvelope} from "react-icons/fa";
import BackgroundBox from '../components/BackgroundBox/BackgroundBox'
import { handleKeypress } from '../utils/utils'


const PasswordResetRequest = ({ handlePasswordResetRequest, email, setEmail }) => {

  useEffect(() => {
    return () => {
      setEmail('');
    }
  }, [])


  return (
    <>
      <BackgroundBox />

      <div className="flex items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">
        <h2 className="text-blue-500 m-9 text-2xl font-bold w-15">Reset Password</h2>
        <div className='auth-input-container margin-bt-10' style={{'marginTop': '75px  '}}>
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

        <button
          className={`text-white w-full mb-1 focus:outline-none xs:text-lg sm:text-xs xs:rounded p-2 bg-blue-500 hover:bg-blue-700`}
          onClick={handlePasswordResetRequest}
        >
          REQUEST NEW PASSWORD
        </button>
        <div>
          <p className="text-xs mt-2">
            <Link to='/' className="text-blue-500 mb-5 text-xs">
              LOGIN
            </Link>
          </p>
        </div>

      </div>

    </>
  );
}

export default PasswordResetRequest;
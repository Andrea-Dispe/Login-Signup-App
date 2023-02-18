import { Link } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaKey, FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";



const PasswordResetRequest = ({ handlePasswordResetRequest, email, setEmail }) => {
  return (
    <>
      <div className="bg-blue-500 mt-7 shadow-2xl xs:rounded-t-xl sm:rounded-xl xs:h-48 sm:h-96">
        <div className="p-5 text-white">
          <h1 className="text-5xl">Benvenuto</h1>
        </div>
      </div>
      {/* <div className="flex justify-center items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd"> */}

      <div className="flex items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">
        <h2 className="text-blue-500 m-9 text-2xl font-bold w-15">Reset Password</h2>
        <div className='auth-input-container margin-bt-10' style={{'margin-top': '75px  '}}>
          <FaEnvelope className="auth-icon" size='20px' />
          <input
            // ref={userRef}
            placeholder="Enter username or email"
            type="text"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
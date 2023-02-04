import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ setUsername, setPassword, handleLogin, userRef, isValidLogin, username, password, setIsValidLogin }) => {

  // useEffect(() => {
  //   console.log('isValidLogin: ', isValidLogin);
  //   if (username?.length > 3 && password?.length > 3) {
  //     setIsValidLogin(true)
  //   }
  // }, [username, password])

  // useEffect(() => {
  //   console.log('isValidLogin: ', isValidLogin);
  // }, [])

  return (
    <>
      <div className="bg-blue-500 mt-7 shadow-2xl xs:rounded-t-xl sm:rounded-xl xs:h-48 sm:h-96">
        <div className="p-5 text-white">
          <h1 className="text-5xl">Benvenuto</h1>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">
        <h2 className="text-blue-500 m-9 text-2xl font-bold w-15">Log In</h2>
        <input
          ref={userRef}
          placeholder="Enter username or email"
          type="text"
          className="border-b-2 border-grey-600 text-md p-1 focus:outline-none focus:border-blue-500 mb-9 bg-transparent w-full"
          onChange={(e) => setUsername(e.target.value)}
          required

        />
        <input
          type="password"
          placeholder="Enter password "
          className="w-full border-b-2 border-grey-600 text-md p-1 focus:outline-none focus:border-blue-500 "
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <button
            className={`text-white w-full mt-16 mb-1 focus:outline-none xs:text-lg sm:text-xs xs:rounded p-2 ${isValidLogin ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400"}`}
            onClick={handleLogin}
            disabled={isValidLogin ? false : true}
          > */}
        <button
          className={`text-white w-full mt-16 mb-1 focus:outline-none xs:text-lg sm:text-xs xs:rounded p-2 bg-blue-500 hover:bg-blue-700`}
          onClick={handleLogin}
          // disabled={isValidLogin ? false : true}
        >
          LOGIN
        </button>
        <div>
          <p className="text-xs mt-2">
            <Link to="/" className="text-blue-500 mb-5 text-xs">
              Forgot the password?
            </Link>
          </p>
        </div>
        <div>
          <p className="text-xs mt-2">
            No account?{' '}
            <Link to="/signup" className="text-blue-500 mb-5 text-xs">
              Register here.
            </Link>
          </p>
        </div>
      </div>

    </>
  );
};

export default Login;

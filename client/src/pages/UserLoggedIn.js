import { useEffect } from 'react';

import BackgroundBox from '../components/BackgroundBox/BackgroundBox';
import ClipLoader from "react-spinners/ClipLoader";


const UserLoggedIn = ({ handleLogout, email, handleDeleteAccount, loading, getUsername, username }) => {

  useEffect(() => {
    getUsername(email)
  }, [])
  return (
    <>

      <BackgroundBox>
        <p className="text-3xl mt-9">{username}</p>
      </BackgroundBox>

      <div className="flex px-3 py-14 items-center flex-col shadow-xl justify-between bg-white sm:rounded-xl sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">
        <h2 className="text-blue-500 text-2xl font-bold w-15">Manage account</h2>

        <div className='flex w-full'>
          <span className='mr-3'>Delete account?</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white w-1/2  focus:outline-none xs:text-lg sm:text-xs xs:rounded  p-2"
            onClick={() => handleDeleteAccount(email)}>
            {loading ?
              <ClipLoader
                color={'white'}
                size={16}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              :
              'DELETE'
            }

          </button>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white w-full  focus:outline-none xs:text-lg sm:text-xs xs:rounded  p-2"
          onClick={() => handleLogout(email)}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default UserLoggedIn;

import BackgroundBox from '../components/BackgroundBox/BackgroundBox';
import ClipLoader from "react-spinners/ClipLoader";
import FormBox from '../components/FormBox/FomBox'


const UserLoggedIn = ({ handleLogout, handleDeleteAccount, loading, user }) => {

  return (
    <>
      <BackgroundBox>
        <p className="text-3xl mt-9">{user.username}</p>
      </BackgroundBox>

      <div className="flex px-3 py-14 items-center flex-col shadow-xl justify-between bg-white sm:rounded-xl xs:rounded-b-xl sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd -top-7">
        <h2 className="text-blue-500 text-2xl font-bold w-15">Manage account</h2>

        <div className='flex w-full flex-wrap justify-center'>
          <div className='mr-3 text-center mb-15'>Do you want to delete your account?</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white w-1/2  focus:outline-none xs:text-lg sm:text-xs xs:rounded  p-2"
            onClick={() => handleDeleteAccount(user.email)}>
            {loading ?
              <ClipLoader
                color={'white'}
                size={16}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              :
              'YES, DELETE IT!'
            }
          </button>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white w-full  focus:outline-none xs:text-lg sm:text-xs xs:rounded  p-2"
          onClick={() => handleLogout(user.email)}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default UserLoggedIn;

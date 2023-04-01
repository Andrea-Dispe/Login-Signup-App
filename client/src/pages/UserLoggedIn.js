import BackgroundBox from '../components/BackgroundBox/BackgroundBox';
import ClipLoader from "react-spinners/ClipLoader";


const UserLoggedIn = ({ handleLogout, email, handleDeleteAccount, loading }) => {

  return (
    <>

      <BackgroundBox>
        <p className="text-3xl mt-9">USERNANE</p>

      </BackgroundBox>

      <div className="flex justify-end py-20 items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">

        <div>
          <span>Delete your email and password from the database?</span>
        </div>
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

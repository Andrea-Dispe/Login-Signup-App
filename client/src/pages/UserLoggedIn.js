const UserLoggedIn = ({ handleLogout }) => {

const username = localStorage.getItem('username')
  console.log('username: ', username);

  return (
    <>
      <div className="bg-blue-500 mt-7 shadow-2xl xs:rounded-t-xl sm:rounded-xl xs:h-48 sm:h-96">
        <div className="p-5 text-white">
          <h1 className="text-5xl">Benvenuto</h1>
          <p className="text-3xl mt-9">{username}</p>
        </div>
      </div>

      <div className="flex justify-end py-20 items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">

        <button

          className="bg-blue-500 hover:bg-blue-700 text-white w-full  focus:outline-none xs:text-lg sm:text-xs xs:rounded  p-2"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default UserLoggedIn;

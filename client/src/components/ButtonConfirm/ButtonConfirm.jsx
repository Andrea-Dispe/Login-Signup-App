import ClipLoader from "react-spinners/ClipLoader";

const ButtonConfirm = ({ loading, cb, text }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white w-full mt-7 mb-1 focus:outline-none xs:text-lg sm:text-xs xs:rounded p-2 flex justify-center"
      style={{ display: 'flex', justifyContent: 'center' }}
      onClick={() => {window.dataLayer.push({'event': 'button_clicked_test_new'})}}
      id="login_button"

    >
      {loading ?
        <ClipLoader
          color={'white'}
          // loading={loading}
          size={16}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        text
      }
    </button>
  );
}

export default ButtonConfirm;
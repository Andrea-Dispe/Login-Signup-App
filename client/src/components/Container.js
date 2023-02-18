
const Container = (props) => {

  return (
    <>
      <div className="bg-gray-200 flex justify-center">
        <div className="main-wrapper h-screen flex justify-center items-center xs:w-full md:w-4/5 lg:w-4/6 xl:w-1/2 ">
          <div className="xs:m-4 sm:m-7 md:m-0 flex flex-col relative w-full">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;

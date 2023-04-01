const BackgroundBox = (props) => {
  return (
    <div className="bg-blue-500 mt-7 shadow-2xl xs:rounded-t-xl sm:rounded-xl xs:h-48 sm:h-96">
      <div className="p-5 text-white">
        <h1 className="text-5xl">Welcome</h1>
        {props.children}
      </div>
    </div>
  );
}

export default BackgroundBox;
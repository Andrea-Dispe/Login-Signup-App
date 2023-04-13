const FormBox = (props) => {
  return (
    <div className="flex justify-center items-center flex-col shadow-xl bg-white sm:rounded-xl xs:rounded-b-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd -top-7">
      {props.children}
    </div>
  );
}

export default FormBox;
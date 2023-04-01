import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackgroundBox from '../components/BackgroundBox/BackgroundBox';

const EmailSent = () => {
  const { action, email } = useParams();
  let message, title;
  if(action === 'confirm-email') {
    title = 'Email Sent'
    message  = `A confirmation email has been sent to ${email}`;
  } else if(action === 'reset-password-email') {
    title = 'Email Sent'
    message  = `An email has been sent with the instructions to reset your password`;
  } else if(action === 'password-changed') {
    title = 'Password Changed'
    message  = `The password has been changed succesfully`;
  }

  return (
    <>
      <BackgroundBox />
      <div className="flex items-center flex-col shadow-xl bg-white sm:rounded-xl p-2 sm:absolute sm:right-12 md:right-8 lg:right:32 sm:w-72 h-dd">
        <h2 className="text-blue-500 m-9 text-2xl font-bold w-15">{title}</h2>
        <div className='auth-input-container mb-24 text-center' style={{ 'marginTop': '65px  ' }}>
          {message}.
        </div>

        <div>
          <p className="text-xs mt-2">
            <Link to='/' className="text-blue-500 mb-5 text-xs">
              {"<--"} Go back
            </Link>
          </p>
        </div>

      </div>

    </>);
}

export default EmailSent;
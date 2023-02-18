import {useParams} from 'react-router-dom'

const EmailSent = () => {
  const {email}  = useParams();

  return (
    <div>
      Email succesfully sent to {email}
    </div>
   );
}

export default EmailSent;
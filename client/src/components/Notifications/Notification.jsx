import "./Notification.css";
import { useState, useEffect } from 'react';

const Notification = (props) => {
  const [width, setWidth] = useState(0);
  const [intervalID, setIntevalID] = useState(null)
  const [exit, setExit] = useState(false)

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5
        }
        clearInterval(id);
        return prev
      })
    }, 20)
    setIntevalID(id)
  }

  const handlePauseTimer = () => {
    clearInterval(intervalID)

  }

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {

    }, 400);

  }
  useEffect(() => {
    handleStartTimer();
  }, [])

  useEffect(() => {
    if(width === 100) {
      handleCloseNotification()
    };
  }, [width])

  return (
    <div className={`notification-item ${props.type.toLowerCase()} ${exit ? 'exit' : ''}`}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
    >
      <p>{props.message}</p>
      <div className="bar" style={{ width: `${width}%` }}></div>
    </div>
  );
}

export default Notification;
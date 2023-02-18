import { useEffect } from 'react'
import toastyPic from '../../assets/toasty.png'
import toastyAudio from '../../assets/toasty.mp3'

const Toasty = () => {
  let audio = new Audio(toastyAudio)

  useEffect(() => {
    audio.muted = false
    audio.play()
  }, [])  

  return (
    <div className="toasty-wrapper">
      <img src={toastyPic} alt="toasty" />
    </div>
  );
}

export default Toasty;
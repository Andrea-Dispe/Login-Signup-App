import { useEffect } from 'react'
import toastyPic from '../media/toasty.png'
import toastyAudio from '../media/toasty.mp3'

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
import './Timer.css';
import { useState, useEffect } from 'react';

export default function Timer({time, step, onTick, onTimeEnd, onTimeStart, onTimePause}){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    const [countSeconds, setCountSeconds] = useState(seconds);
    const [countMinutes, setCountMinutes] = useState(minutes);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
      let interval = null;
      if(paused){
        interval = setInterval(() => {
          countSeconds > 0 && setCountSeconds(count => count - 1);
        }, step);
      } 
      return () => {
        clearInterval(interval);
      }
    }, [paused, countSeconds, countMinutes]);

    useEffect(() => {
      let interval = null;
      if(paused){
        onTick(countMinutes + ":" + countSeconds)
        interval = setInterval(() => {
          countMinutes > 0 && setCountMinutes(count => count - 1);
          if (countMinutes > 0 || (countMinutes === 0 && !countSeconds === 0)){
            setCountSeconds(59);
          }
        }, step * countSeconds);
      }
      
      return () => {
        clearInterval(interval);
      }
    }, [paused, countMinutes, countSeconds]);
    
    if(countMinutes === 0 && countSeconds === 0){
      onTimeEnd();
    }
    
    function toggle(){
      setPaused(!paused);
      if(paused){
        onTimePause();
      } else {
        onTimeStart();
      }
    }

    return (
      <div className="timer">
        <h4>
          Counter: {countMinutes < 10 ? `0${countMinutes}` : countMinutes} : {countSeconds < 10 ? `0${countSeconds}` : countSeconds}
        </h4>

        <button onClick={toggle}>
          {paused ? "Pause" : "Start"}
        </button>
      </div>
    );
}
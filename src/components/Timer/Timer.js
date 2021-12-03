import './Timer.css';
import { useState, useEffect } from 'react';

export default function Timer({time, step, onTick, onTimeEnd, onTimeStart, onTimePause, autostart}){
    const [generalTime, setGeneralTime] = useState(time); 
    const [paused, setPaused] = useState(!autostart);

    const formatSeconds = () => { 
      const minutes = Math.floor(generalTime / 60);
      const seconds = generalTime - (minutes * 60);
      if(generalTime < 60) {
        return `0${minutes}` + ":" + (seconds < 10 ? `0${seconds}` : seconds);
      } else {
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      } 
    }

    useEffect(() => { 
      if(!paused) { 
        const interval = setInterval(() => { 
           setGeneralTime((count) => count - step / 1000);
           onTick(formatSeconds(generalTime));
        }, step);
        if(generalTime === 0) { 
          onTimeEnd(); 
          setPaused(true);
        } 
        return () => clearInterval(interval);
      } 
   }, [generalTime, paused]);

    function toggle(){
      if(generalTime === 0) { 
        setGeneralTime(time);
      } 
      setPaused(!paused);
      if(!paused){
        onTimePause();
      } else {
        onTimeStart();
      }
    }

    return (
      <div className="timer">
        <h4>
          Counter: {formatSeconds(generalTime)}
        </h4>

        <button onClick={toggle}>
          {paused ? "Start" : "Pause"}
        </button>
      </div>
    );
}
import './App.css';
import Timer from './components/Timer/Timer';

function App() {
  let time = 70;
  let step = 1000;

  return (
    <div className="App">
        <Timer 
          time={time} 
          step={step}
          autostars
          onTick={(time) => console.log("Залишилось часу: " + time)}
          onTimeEnd={() => console.log("Час вийшов!")}
          onTimeStart={(timeLeft) => console.log("Таймер запущено!")}
          onTimePause={(timeLeft) => console.log("Таймер на паузі!")}
        />
    </div>
  );
}

export default App;
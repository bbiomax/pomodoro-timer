import "./App.css";
import { TimeProvider } from "./components/SettingsModal/TimeContext";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <main>
      <TimeProvider>
        <Timer className="timer" />
      </TimeProvider>
    </main>
  );
}

export default App;

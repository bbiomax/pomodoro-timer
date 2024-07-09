import styles from "./SettingsModal.module.css";
import { useTimeContext } from "./TimeContext";

export default function SettingsModal({ formatTime, setIsSettingsModal, setCountDown }) {
  const { workTime, setWorkTime, breakTime, setBreakTime } = useTimeContext();

  const formatedWorkTime = formatTime(workTime);
  const formatedBreakTime = formatTime(breakTime);

  const handleWorkTimeChange = (event) => {
    const newValue = event.target.value;
    setWorkTime(newValue);
  };

  const handleBreakTimeChange = (event) => {
    const newValue = event.target.value;
    setBreakTime(newValue);
  };

  return (
    <div onClick={() => setIsSettingsModal(false)} className={styles.wrapper}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div className={styles.rangesBlock}>
          <div className={styles.rangeAndTitle}>
            <span>Work time</span>
            <input
              className={styles.rangeBar}
              type="range"
              min={300}
              max={5400}
              step={300}
              value={workTime}
              onChange={handleWorkTimeChange}
            />
            <span>{formatedWorkTime}</span>
          </div>
          <div className={styles.rangeAndTitle}>
            <span>Break time</span>
            <input
              className={styles.rangeBar}
              type="range"
              min={300}
              max={5400}
              step={300}
              value={breakTime}
              onChange={handleBreakTimeChange}
            />
            <span>{formatedBreakTime}</span>
          </div>
        </div>

        <button onClick={() => [setIsSettingsModal(false), setCountDown(workTime)]} className={styles.saveButton}>Save</button>
      </div>
    </div>
  );
}

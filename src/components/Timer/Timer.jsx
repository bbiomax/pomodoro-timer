import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";
import PlayStopButton from "../PlayStopButton/PlayStopButton";
import SettingsButton from "../SettingsButton/SettingsButton";
import { useEffect, useState } from "react";
import SettingsModal from "../SettingsModal/SettingsModal";
import { useTimeContext } from "../SettingsModal/TimeContext";

export default function Timer() {
  const { workTime, breakTime } = useTimeContext();

  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const [isWorkStarted, setIsWorkStarted] = useState(true);
  const [isBreakStarted, setIsBreakStarted] = useState(false);
  const [countDown, setCountDown] = useState(workTime);

  const [isSettingsModal, setIsSettingsModal] = useState(false);

  const timeToUse = isBreakStarted ? breakTime : workTime;
  const percent = (countDown / timeToUse) * 100;

  const toggleTimer = () => {
    setIsTimerStarted((prev) => !prev);
  };

  const toggleSettings = () => {
    setIsSettingsModal(true);
  };

  useEffect(() => {
    if (!isTimerStarted) return;
    const i = setInterval(() => {
      setCountDown((c) => Math.max(c - 1, 0));
    }, 100);
    return () => {
      clearInterval(i);
    };
  }, [isTimerStarted, workTime, breakTime]);

  useEffect(() => {
    if (countDown === 0) {
      if (isWorkStarted) {
        setIsWorkStarted(false);
        setIsBreakStarted(true);
        setCountDown(breakTime);
      }
      if (isBreakStarted) {
        setIsWorkStarted(true);
        setIsBreakStarted(false);
        setCountDown(workTime);
      }
    }
  }, [countDown, isBreakStarted, isWorkStarted, breakTime, workTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const formattedTime = formatTime(countDown);

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <CircularProgressbar
          value={percent}
          text={`${formattedTime}`}
          background
          backgroundPadding={8}
          styles={buildStyles({
            backgroundColor: "#fff",
            textColor: !isBreakStarted ? "#705ed7" : "#2ec919",
            pathColor: !isBreakStarted ? "#705ed7" : "#2ec919",
            trailColor: "#efefef",
          })}
        />
      </div>

      <div className={styles.buttonsBlock}>
        <PlayStopButton onClick={toggleTimer} isTimerStarted={isTimerStarted} />
        <SettingsButton onClick={toggleSettings} />
      </div>

      {isSettingsModal && <SettingsModal formatTime={formatTime} setIsSettingsModal={setIsSettingsModal} setCountDown={setCountDown} />}
    </div>
  );
}

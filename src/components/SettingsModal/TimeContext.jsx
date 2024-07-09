import React, { createContext, useContext, useState } from "react";

const TimeContext = createContext();

export function useTimeContext() {
  return useContext(TimeContext);
}

export function TimeProvider({ children }) {
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);

  return (
    <TimeContext.Provider
      value={{ workTime, setWorkTime, breakTime, setBreakTime }}
    >
      {children}
    </TimeContext.Provider>
  );
}

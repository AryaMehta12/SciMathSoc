import React, { useEffect, useState } from "react";
import { END_DATE } from "../constants/endDate";

const TillEndDate: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(END_DATE.getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(END_DATE.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalMinutes = Math.max(0, Math.floor(timeLeft / (1000 * 60)));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <span>
      {hours}h {minutes}m
    </span>
  );
};

export default TillEndDate;

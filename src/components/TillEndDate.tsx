import React, { useEffect, useState } from "react";

// Set contest end date: 25th July, 12:00 AM (UTC)
const END_TIME = new Date("2025-07-25T00:00:00Z").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(END_TIME - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(END_TIME - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate hours and minutes left
  const totalMinutes = Math.max(0, Math.floor(timeLeft / (1000 * 60)));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div>
      {hours}h {minutes}m
    </div>
  );
};

export default CountdownTimer;

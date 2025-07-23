import React, { useEffect, useState } from "react";

// Set your target end time (e.g., 23 hours from now)
const END_TIME = new Date().getTime() + 23 * 60 * 60 * 1000;

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(END_TIME - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(END_TIME - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate hours, minutes, seconds
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default CountdownTimer;

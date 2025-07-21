import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endTime: string; // Format: "HH:MM" (24-hour format)
  className?: string;
}

export const CountdownTimer = ({ endTime, className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const today = new Date();
      const [hours, minutes] = endTime.split(':').map(Number);
      
      // Set target time for today
      const targetTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, 0);
      
      // If target time has passed today, set it for tomorrow
      if (targetTime.getTime() <= now.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      
      const difference = targetTime.getTime() - now.getTime();
      
      if (difference > 0) {
        const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
        const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);
        
        if (hoursLeft > 0) {
          setTimeLeft(`${hoursLeft}h ${minutesLeft}m`);
        } else if (minutesLeft > 0) {
          setTimeLeft(`${minutesLeft}m ${secondsLeft}s`);
        } else {
          setTimeLeft(`${secondsLeft}s`);
        }
      } else {
        setTimeLeft("Time's up!");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className={`flex items-center space-x-2 bg-card rounded-full px-4 py-2 ${className}`}>
      <Clock className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium">{timeLeft}</span>
    </div>
  );
};
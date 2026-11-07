
import { useEffect, useState } from "react";

const EVENT_DATE = Date.UTC(2026, 10, 20, 11, 0, 0);

function getTimeLeft() {
  const difference = Math.max(0, EVENT_DATE - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    finished: difference === 0,
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <section className="countdown">
      <p className="countdown-label">
        {timeLeft.finished ? "THE GAME HAS BEGUN" : "TIME UNTIL GAME START"}
      </p>

      <div className="countdown-units">
        {units.map((unit) => (
          <div className="countdown-unit" key={unit.label}>
            <span className="countdown-value">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="countdown-unit-label">{unit.label}</span>
          </div>
        ))}
      </div>

      <p className="countdown-date">20 NOVEMBER 2026 · 4:30 PM IST</p>
    </section>
  );
}

export default Countdown;

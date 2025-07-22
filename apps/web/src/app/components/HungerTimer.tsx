'use client';

import { useContext, useEffect, useState } from 'react';
import { BugsContext } from '../global-state/bugs/BugsProvider';

const TIMER_INTERVAL_IN_MS = 100;

const HungerTimer = ({ onDeath = () => {} }) => {
  const [percent, setPercent] = useState(1);
  const [hasBegunEating, setHasBegunEating] = useState(false);

  const { hungerTimer, bugs, populationSnapshots } = useContext(BugsContext);

  const hungerTimerInMs = hungerTimer * 1000;

  const [timer, setTimer] = useState(hungerTimerInMs);

  useEffect(() => {
    if (percent > 0 && hasBegunEating) {
      setTimeout(() => {
        setPercent(0);
      }, 100);
    }
  }, [percent, hasBegunEating]);

  useEffect(() => {
    if (hasBegunEating) {
      setPercent(1);
    }
  }, [bugs, hasBegunEating]);

  useEffect(() => {
    if (hasBegunEating) {
      setTimer(hungerTimerInMs);
    }
  }, [bugs, hasBegunEating, hungerTimer]);

  useEffect(() => {
    setHasBegunEating(!!populationSnapshots.length);
  }, [populationSnapshots]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasBegunEating) {
        setTimer((prev) =>
          prev - TIMER_INTERVAL_IN_MS >= 0 ? prev - TIMER_INTERVAL_IN_MS : prev
        );
      }
    }, TIMER_INTERVAL_IN_MS);
    return () => {
      clearInterval(interval);
    };
  }, [hasBegunEating]);

  useEffect(() => {
    if (timer <= 0) {
      onDeath();
    }
  }, [timer]);

  return (
    <div className="flex flex-col items-start w-full px-2 md:px-0">
      <div className=" text-sm">Hunger Timer</div>
      <div className="h-5 w-full border border-black bg-white appearance-none box-border rounded-[20px] overflow-hidden">
        <div
          className="bg-black h-full transition-all duration-linear"
          style={{
            width: `${percent * 100}%`,
            transitionDuration: percent === 0 ? `${hungerTimer}s` : '0s',
            transitionTimingFunction: 'linear',
          }}
        />
      </div>
    </div>
  );
};

export default HungerTimer;

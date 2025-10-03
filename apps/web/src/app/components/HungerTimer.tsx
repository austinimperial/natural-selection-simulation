'use client';

import { useContext, useEffect, useState } from 'react';
import { BugsContext } from '../providers/bugs/BugsProvider';

const TIMER_INTERVAL_IN_MS = 100;

const HungerTimer = ({ onDeath = () => {} }) => {
  const [percent, setPercent] = useState(1);
  const [hasBegunEating, setHasBegunEating] = useState(false);

  const { bugs, populationSnapshots, controlsForm } = useContext(BugsContext);
  const { hungerTimer } = controlsForm.watch();

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
    <div className="flex w-full flex-col items-start px-2 md:px-0">
      <div className="text-sm">Hunger Timer</div>
      <div className="box-border h-5 w-full appearance-none overflow-hidden rounded-[20px] border border-black bg-white">
        <div
          className="duration-linear h-full bg-black transition-all"
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

import React, { useContext, useEffect, useState, useCallback } from "react";
import { BugsContext } from "globalState/bugs/BugsProvider";
import { Container, Bar, Name, Percent } from "./HungerTimerStyles";

const TIMER_INTERVAL_IN_MS = 100;

const HungerTimer = ({onDeath = () => {}}) => {
  const [percent, setPercent] = useState(1);
  const [hasBegunEating, setHasBegunEating] = useState(false);

  const {
    hungerTimer,
    bugs,
    populationSnapshots,
  } = useContext(BugsContext);

  const hungerTimerInMs = hungerTimer * 1000

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
      onDeath()
    }
  }, [timer]);

  return (
    <Container>
      <Name>Hunger Timer</Name>
      <Bar>
        <Percent durationInSec={hungerTimer} percent={percent} />
      </Bar>
    </Container>
  );
};

export default HungerTimer;

import React, { memo } from "react";
import { useNProgress } from "@tanem/react-nprogress";
import Bar from "./Bar";
import Container from "./Container";

const Progress = memo(({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  return (
    <>
      <Container animationDuration={animationDuration} isFinished={isFinished}>
        <Bar animationDuration={animationDuration} progress={progress} />
      </Container>
    </>
  );
});

export default Progress;

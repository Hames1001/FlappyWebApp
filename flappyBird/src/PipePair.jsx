import React, { useEffect, useState } from "react";
import {
  BIRD_X,
  GAME_HEIGHT,
  GAME_WIDTH,
  Obstacle,
  OBSTACLE_WIDTH,
  PIPE_GAP,
} from "./App";

const PipePair = (props) => {
  const { gameStarted, birdPosition, setScore, setGameStarted, initialPos } = props;

  const [obstacleHeight, setObstacleHeight] = useState(200);
  const [obstacleLeft, setObstacleLeft] = useState(initialPos);
  const bottomObstacleHeight = GAME_HEIGHT - PIPE_GAP - obstacleHeight;

  useEffect(() => {
    let obstacleId;
    if (gameStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 5);
      }, 24);
    } else {
      if (gameStarted && obstacleLeft < -OBSTACLE_WIDTH) {
        setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
        setObstacleHeight(200);
      }
      // Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP))
      setScore((s) => s + 1);
    }

    return () => {
      clearInterval(obstacleId);
    };
  }, [gameStarted, obstacleLeft]);

  useEffect(() => {
    const hasCollidedWithTop =
      birdPosition >= 0 && birdPosition < obstacleHeight;
    const hasCollidedWithBottom =
      birdPosition <= GAME_HEIGHT &&
      birdPosition >= GAME_HEIGHT - bottomObstacleHeight;
    if (
      obstacleLeft >= 0 &&
      obstacleLeft <= OBSTACLE_WIDTH &&
      (hasCollidedWithTop || hasCollidedWithBottom)
    ) {
      setGameStarted(false);
    }
    if (
      BIRD_X > obstacleLeft &&
      (hasCollidedWithTop || hasCollidedWithBottom)
    ) {
      setGameStarted(false);
    }
  }, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft]);

  return (
    <>
      <Obstacle
        top={0}
        width={OBSTACLE_WIDTH}
        height={obstacleHeight}
        left={obstacleLeft}
      />
      <Obstacle
        top={GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
        width={OBSTACLE_WIDTH}
        height={bottomObstacleHeight}
        left={obstacleLeft}
      />
    </>
  )
}

export default PipePair;

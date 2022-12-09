import React, { useEffect, useState } from "react";
import {
  BIRD_SIZE,
  BIRD_X,
  GAME_HEIGHT,
  GAME_WIDTH,
  OBSTACLE_WIDTH,
  PIPE_GAP,
} from "./App";

const PipePair = (props) => {
  const { gameStarted, birdPosition, setScore, setGameStarted, initialPos } = props;

  const [obstacleHeight, setObstacleHeight] = useState(() => Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP)));
  const [obstacleLeft, setObstacleLeft] = useState(initialPos);
  const bottomObstacleHeight = GAME_HEIGHT - PIPE_GAP - obstacleHeight;

  const [randState, setRandState] = useState(false);

  useEffect(() => {
    let obstacleId;
    if (gameStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 5);
      }, 24);
    } else if (gameStarted && obstacleLeft < -OBSTACLE_WIDTH) {
      setObstacleLeft(GAME_WIDTH);
      setObstacleHeight(Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP)));
    } else {
      setScore((s) => s + 1);
    }

    return () => {
      clearInterval(obstacleId);
    };
  }, [gameStarted, obstacleLeft]);

  useEffect(() => {
    const hasCollidedWithTop = birdPosition >= 0
      && birdPosition < obstacleHeight;

    const hasCollidedWithBottom = birdPosition <= GAME_HEIGHT
      && (birdPosition + BIRD_SIZE) >= (GAME_HEIGHT - bottomObstacleHeight);

    const hasCollidedWithTopOrBottom = hasCollidedWithTop || hasCollidedWithBottom;

    const hasCollidedWithVerticalEdge = obstacleLeft >= 0
      && obstacleLeft <= BIRD_SIZE
      && hasCollidedWithTopOrBottom;

    const hasCollidedWithHorizontalEdge = BIRD_X > obstacleLeft
      && hasCollidedWithTopOrBottom;

    if (hasCollidedWithVerticalEdge || hasCollidedWithHorizontalEdge) {
      // ! only adding these two lines so I can see what bar it hit:
      setRandState(true);
      console.log(obstacleLeft, birdPosition);
      setGameStarted(false);
    }
  }, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft]);

  return (
    // This can still use the styled component, I just found this easier to work with:
    <div className="obstacle-container" style={{ left: obstacleLeft, background: randState ? "coral" : "none" }}>
      <div className="obstacle" style={{ width: OBSTACLE_WIDTH, height: obstacleHeight }}/>
      <div
        className="obstacle"
        style={{ 
          top: GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight),
          width: OBSTACLE_WIDTH,
          height: bottomObstacleHeight,
        }}
      />
    </div>
  )
}

export default PipePair;

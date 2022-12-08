//import './App.css'
import styled from "styled-components";
import { useEffect, useState } from "react";
import PipePair from "./PipePair";

export const BIRD_SIZE = 20;
export const GAME_WIDTH = 500;
export const GAME_HEIGHT = 500;
export const GRAVITY = 5;
export const JUMP = 100;
export const OBSTACLE_WIDTH = 40;
export const PIPE_GAP = 200;
export const BIRD_X = 0;

function App() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const [pipeTables, setPipeTables] = useState([]);

  useEffect(() => {
    let timeId;
    if (gameStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + GRAVITY)
      }, 24)
    }

    return () => {
      clearInterval(timeId);
    };
  }, [gameStarted, birdPosition]);

  // useEffect(() => {
  //   let time = 0;
  //   while (gameStarted && time < 2) {
  //     setPipeTables((pipe) => [...pipe, <PipePair gameStarted={gameStarted} birdPosition={birdPosition} setScore={setScore} setGameStarted={setGameStarted} />])
  //   }

  //   // return () => {
  //   //   clearInterval(timeId);
  //   // };
  // })

  const handleClick = () => {
    let newBirdPosition = birdPosition - JUMP;
    if (!gameStarted) {
      setGameStarted(true);
    } else if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition)
    }
  }

  return (
    <Div onClick={handleClick}>
      <GameBox height={GAME_HEIGHT} width={GAME_WIDTH}>
        <PipePair gameStarted={gameStarted} birdPosition={birdPosition} setScore={setScore} setGameStarted={setGameStarted} initialPos={GAME_WIDTH - OBSTACLE_WIDTH - 300} />
        <PipePair gameStarted={gameStarted} birdPosition={birdPosition} setScore={setScore} setGameStarted={setGameStarted} initialPos={GAME_WIDTH - OBSTACLE_WIDTH - 150} />
        <PipePair gameStarted={gameStarted} birdPosition={birdPosition} setScore={setScore} setGameStarted={setGameStarted} initialPos={GAME_WIDTH - OBSTACLE_WIDTH} />
        {/* {pipeTables.map((item, i) => {
          return item;
        })} */}
        <Bird size={BIRD_SIZE} top={birdPosition} />
      </GameBox>
    </Div>

  )
}

export default App

const Bird = styled.div`
  position: absolute;
  background-color: red;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  border-radius: 50%;
`;

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const GameBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: blue;
  // overflow: hidden;
`;

export const Obstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-color: green;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
`;
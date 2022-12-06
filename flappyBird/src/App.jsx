//import './App.css'
import styled from "styled-components";
import { useEffect, useState } from "react";

const BIRD_SIZE = 20;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const GRAVITY = 5;
const JUMP = 100;

function App() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [gameStarted, setGameStarted] = useState(false);
  useEffect(() => {
    
    let timeId;
    if (gameStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition+GRAVITY)
      }, 24)
    }

    return () => {
      clearInterval(timeId);
    };
  }, [gameStarted, birdPosition]);

  const handleClick = () => {
    let newBirdPosition = birdPosition - JUMP;
    if (!gameStarted) {
      setGameStarted(true);
    }else if (newBirdPosition < 0) {
      setBirdPosition(0);
    }else {
      setBirdPosition(newBirdPosition)
    }
  }

  return (
    <Div onClick={handleClick}>
      <GameBox height={GAME_HEIGHT} width={GAME_WIDTH}>
        <Bird size={BIRD_SIZE} top={birdPosition}/>
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
`;

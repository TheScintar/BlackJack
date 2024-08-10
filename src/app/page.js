"use client";

import React, { useState } from 'react';
import { getRandomCard, calculateHandValue, checkForBust, determineWinner } from '../utils/gameUtils';
import GameBoard from '../components/GameBoard';
import '../styles/globals.css';  // Подключение глобальных стилей

const Home = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const startGame = () => {
    setPlayerHand([getRandomCard(), getRandomCard()]);
    setDealerHand([getRandomCard(), getRandomCard()]);
    setGameStarted(true);
  };

  const restart = () => {
    setGameOver(false)
    setGameStarted(false);
  }

  const handleHit = () => {
    const newCard = getRandomCard();
    const newPlayerHand = [...playerHand, newCard];
    setPlayerHand(newPlayerHand);

    if (checkForBust(newPlayerHand)) {
      setGameOver(true);
      setWinner('dealer');
    }
  };

  const handleStand = () => {
    let newDealerHand = [...dealerHand];
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(getRandomCard());
    }
    setDealerHand(newDealerHand);
    setGameOver(true);
    setWinner(determineWinner(playerHand, newDealerHand));
  };

  return (
    <div className="body"> 
      <h1>BlackJack</h1>
      {!gameStarted ? (
        <button onClick={startGame} className="startButton">Start Game</button>
      ) : (
        <GameBoard 
            playerHand={playerHand} 
            dealerHand={dealerHand}
            playerHandValue={calculateHandValue(playerHand)}
            dealerHandValue={calculateHandValue(dealerHand)}
            gameOver={gameOver}
            winner={winner}
            onHit={handleHit}
            onStand={handleStand}
        />

      )}
      {gameOver && (
        <div className="endButton">
          <h2>{winner === 'draw' ? 'It\'s a Draw!' : `${winner} wins!`}</h2>
          <button onClick={restart} className="startButton">Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Home;

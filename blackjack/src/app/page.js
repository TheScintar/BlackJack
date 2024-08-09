"use client";

import React, { useState, useEffect } from 'react';
import { getRandomCard, calculateHandValue, checkForBlackJack, checkForBust, determineWinner } from '../utils/gameUtils';
import GameBoard from '../components/GameBoard';

const Home = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Генерация карт происходит только на клиенте
  useEffect(() => {
    setPlayerHand([getRandomCard(), getRandomCard()]);
    setDealerHand([getRandomCard(), getRandomCard()]);
  }, []);

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
    <div>
      <h1>BlackJack</h1>
      <GameBoard playerHand={playerHand} dealerHand={dealerHand} />
      {gameOver ? (
        <div>
          <h2>{winner === 'draw' ? 'It\'s a Draw!' : `${winner} wins!`}</h2>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <div>
          <button onClick={handleHit}>Hit</button>
          <button onClick={handleStand}>Stand</button>
        </div>
      )}
    </div>
  );
};

export default Home;
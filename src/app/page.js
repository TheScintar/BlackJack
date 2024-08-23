"use client";

import React, { useState } from 'react';
import { getRandomCard, calculateHandValue, checkForBust, determineWinner } from '../utils/gameUtils';
import GameBoard from '../components/GameBoard';
import '../styles/globals.css'; 

const Home = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(0);

  const startGame = () => {
    if (bet <= 0 || bet > balance) {
      alert('Please enter a valid bet.');
      return;
    }
    setBalance(balance - bet);
    setPlayerHand([getRandomCard(), getRandomCard()]);
    setDealerHand([getRandomCard(), getRandomCard()]);
    setGameStarted(true);
    setGameOver(false);
  };

  const restart = () => {
    setGameOver(false);
    setGameStarted(false);
    setWinner(null);
  }

  const handleHit = () => {
    const newCard = getRandomCard();
    const newPlayerHand = [...playerHand, newCard];
    setPlayerHand(newPlayerHand);

    if (checkForBust(newPlayerHand)) {
      setWinner('dealer');
      updateBalance('dealer');
      setGameOver(true);
    }
  };

  const handleStand = () => {
    let newDealerHand = [...dealerHand];
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(getRandomCard());
    }
    setDealerHand(newDealerHand);
    const gameWinner = determineWinner(playerHand, newDealerHand);
    setWinner(gameWinner);
    updateBalance(gameWinner);
    setGameOver(true);
  };

  const updateBalance = (winner) => {
    if (winner === 'player') {
      setBalance(balance + bet * 2); 
    } else if (winner === 'dealer') {
      
    } else if (winner === 'draw') {
      setBalance(balance + bet)
      console.log(balance)
      console.log(bet)
      console.log(balance + bet)
    }
  };

  const handleBetChange = (e) => {
    setBet(parseInt(e.target.value));
  };

  return (
    <div className="gameBoard"> 
      <h1>BlackJack</h1>
      <div className='balanceAndBet'>
        <h2>Balance: ${balance}</h2> 
        <h2>Your Bet: ${bet}</h2>
      </div>
      {!gameStarted ? (
        <div className='startButtons'>
          <input 
            type='number' 
            className="bet" 
            value={bet} 
            onChange={handleBetChange} 
            placeholder="Enter your bet"
          />
          <button onClick={startGame} className="startButton">Start Game</button>
        </div>
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

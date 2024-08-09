import React, { useEffect, useState } from 'react';
import styles from '../styles/GameBoard.module.css';

const GameBoard = ({ playerHand, dealerHand }) => {
  const [playerCardCount, setPlayerCardCount] = useState(playerHand.length);
  const [dealerCardCount, setDealerCardCount] = useState(dealerHand.length);

  useEffect(() => {
    setPlayerCardCount(playerHand.length);
  }, [playerHand]);

  useEffect(() => {
    setDealerCardCount(dealerHand.length);
  }, [dealerHand]);

  const getCardImage = (card) => {
    const suit = card.suit;
    const value = card.value;
    return `/cards/${value}_of_${suit}.png`;
  };

  return (
    <div className={styles.gameBoard}>
      <div className={styles.hand}>
        <h2>Dealer's Hand</h2>
        <div className={styles.cards}>
          {dealerHand.map((card, index) => (
            <img key={index} src={getCardImage(card)} alt={`${card.value} of ${card.suit}`} className={styles.card} style={{ animationDelay: `${index * 0.2}s` }} />
          ))}
        </div>
      </div>
      <div className={styles.hand}>
        <h2>Player's Hand</h2>
        <div className={styles.cards}>
          {playerHand.map((card, index) => (
            <img key={index} src={getCardImage(card)} alt={`${card.value} of ${card.suit}`} className={styles.card} style={{ animationDelay: `${index * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
export function getRandomCard() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    
    return { suit, value };
  }
  
  export function calculateHandValue(cards) {
    let sum = 0;
    let hasAce = false;
    const cardValues = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
      'J': 10, 'Q': 10, 'K': 10, 'A': 1
    };
  
    for (let card of cards) {
      sum += cardValues[card.value];
      if (card.value === 'A') {
        hasAce = true;
      }
    }
  
    if (hasAce && sum + 10 <= 21) {
      sum += 10;
    }
  
    return sum;
  }
  
  export function checkForBlackJack(hand) {
    return hand.length === 2 && calculateHandValue(hand) === 21;
  }
  
  export function checkForBust(hand) {
    return calculateHandValue(hand) > 21;
  }
  
  export function determineWinner(playerHand, dealerHand) {
    const playerSum = calculateHandValue(playerHand);
    const dealerSum = calculateHandValue(dealerHand);
  
    if (playerSum > 21) {
      return 'dealer';
    } else if (dealerSum > 21) {
      return 'player';
    } else if (playerSum === dealerSum) {
      return 'draw';
    } else if (playerSum > dealerSum) {
      return 'player';
    } else {
      return 'dealer';
    }
  }
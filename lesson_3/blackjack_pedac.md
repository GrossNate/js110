# Problem

- Blackjack program, static dealer, only basic play (no betting, no splitting)
- Players go first, then dealer.
- Dealer must hit until their score is >= 17, then stay.

# Examples & Test Cases

- If the dealer has a blackjack then play is over (they either win or tie with
  any players that also have blackjack).
- If a player has a blackjack, then play is over for that player (they either
  win against the dealer or they tie the dealer).
- If all players have bust then the dealer doesn't need to hit even if their
  score is < 17.
- When calculating value of Aces, can't just assume they're both 11 or both 1
  (i.e. if multiple aces in hand, need to allow for different combinations of
  values)

# Data Structures

- Card
  - suit (frankly this is unnecessary for this game, but makes it more fun)
  - value
  - face up or face down (not necessary, but also fun)
- Deck
  - array of cards
  - various methods
- Hand
  - array of cards
  - person who's holding it
  - is that person the dealer

# Algorithm

## Overall program flow

1. Ask for configuration and do setup
   1. create hands
   2. create deck
2. BEGIN game loop
   1. shuffle cards
   2. deal cards
   3. if dealer has blackjack, end game and display results
   4. BEGIN player loop
      1. if player has blackjack, skip to next loop iteration
      2. BEGIN turn loop
         1. display game state
         2. ask if player wants to hit or stay
         3. if stay, skip to next loop
         4. if player wants to hit, give them a card from the deck
         5. if player busts or gets 21, go to next player loop iteration,
            otherwise go to next turn loop iteration
   5. BEGIN dealer loop
      1. if all players have busted then skip this loop
      2. while dealer hand value < 17
      3. pause for 2 seconds
      4. dealer hits
   6. Display game results
   7. Ask if user wants to play again, and break if not.
   8. Put all the cards from players' hands back in the deck.

## Determine best hand value

1. recursively go through the array of cards, passing in the cummulative sum and
   the remaining cards in the array
   1. if there are no more cards in the array then return the sum that's been
      passed in or 0 if the sum is greater than 21
   2. otherwise return the max of (call the function passing in each value of
      the current card plus the value that's been passed in and the rest of the
      cards in the array)
2. return either the calculated value or 22 (a bust value) if the calculated
   value is 0 (indicating a bust value)

# Code

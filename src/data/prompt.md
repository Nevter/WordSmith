I have created a game that is very similar to Wordle, except the words are made up words. The idea is to show that the sounds in words have intrinsic meaning behind them - not because the words are similar to words we know, but certain sounds and words just _feel_ like they have a certain meaning. 

The game works similarly to Wordle, where you have 6 guesses for a 5 letter word. 
At the start, you are given the definition of the word. After 3 guesses the etymology of the word is unlocked. If you run out of guesses, the word is shown. There are two words a day. 
Can you please come up wth a list of made up words, their made up definition, and their made up etymology (which should be based on real words that could be etymologically relevant to english words). 


Provide your answer in JSON format as follows: 
[
  date (YYYY-MM-DD): [
    { word: string, definition: string, etymology: string},
    { word: string, definition: string, etymology: string}
  ], 
  date (YYYY-MM-DD): [
    { word: string, definition: string, etymology: string},
    { word: string, definition: string, etymology: string}
  ], 
]

Make up the words for 7 days (14 words). 
The words MUST NOT be real words. 
The words MUST be 5 characters long. 
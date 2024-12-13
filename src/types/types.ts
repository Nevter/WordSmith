export type WordType = {
  word: string;
  definition: string;
  etymology: string;
};

export type WordListType = WordType[];

export type GuessType = {
  letter: string;
  status: 'correct' | 'present' | 'absent' | 'unevaluated';
}[];

export type GameState = {
  currentGuess: string;
  guesses: GuessType[];
  currentDate: string;
  currentWordIndex: number;
  gameStatus: 'playing' | 'won' | 'lost';
  showEtymology: boolean;
  playsToday: number;
};


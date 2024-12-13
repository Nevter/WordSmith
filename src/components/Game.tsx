'use client'

import React, { useState, useEffect } from 'react';
import { GuessType, GameState } from '../types/types';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { madeUpWords } from '../data/words';
import DefinitionAndEtymology from './DefinitionAndEtymology';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      currentGuess: '',
      guesses: [],
      currentDate: today,
      currentWordIndex: 0,
      gameStatus: 'playing',
      showEtymology: false,
      playsToday: 1,
    };
  });

  const todaysWords = madeUpWords[gameState.currentDate] || [];
  const currentWord = todaysWords[gameState.currentWordIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.gameStatus !== 'playing') return;

      if (event.key === 'Enter') {
        submitGuess();
      } else if (event.key === 'Backspace') {
        setGameState(prevState => ({
          ...prevState,
          currentGuess: prevState.currentGuess.slice(0, -1),
        }));
      } else if (event.key.match(/^[a-z]$/i)) {
        setGameState(prevState => ({
          ...prevState,
          currentGuess: (prevState.currentGuess + event.key).slice(0, 5),
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState]);

  const submitGuess = () => {
    if (gameState.currentGuess.length !== 5) return;

    const wordLetters: (string | null)[] = currentWord.word.split('');
    const guessLetters = gameState.currentGuess.split('');

    // First pass: Mark correct letters
    const newGuess: GuessType = guessLetters.map((letter, index) => {
      if (letter === wordLetters[index]) {
        wordLetters[index] = null; // Mark as used
        return { letter, status: 'correct' };
      }
      return { letter, status: 'unevaluated' };
    });

    // Second pass: Mark present or absent letters
    newGuess.forEach((guess, index) => {
      if (guess.status === 'unevaluated') {
        const letterIndex = wordLetters.indexOf(guess.letter);
        if (letterIndex !== -1) {
          wordLetters[letterIndex] = null; // Mark as used
          newGuess[index].status = 'present';
        } else {
          newGuess[index].status = 'absent';
        }
      }
    });

    const newGuesses = [...gameState.guesses, newGuess];
    const newGameStatus =
      newGuess.every(g => g.status === 'correct') ? 'won' :
        newGuesses.length >= 6 ? 'lost' : 'playing';

    setGameState(prevState => ({
      ...prevState,
      currentGuess: '',
      guesses: newGuesses,
      gameStatus: newGameStatus,
      showEtymology: newGameStatus !== 'playing' || newGuesses.length >= 3,
    }));
  };

  const resetGame = () => {
    const today = new Date().toISOString().split('T')[0];
    const newPlaysToday = gameState.currentDate === today ? gameState.playsToday + 1 : 1;
    const newWordIndex = gameState.currentWordIndex + 1;

    setGameState({
      currentGuess: '',
      guesses: [],
      currentDate: today,
      currentWordIndex: newWordIndex,
      gameStatus: newPlaysToday <= 3 ? 'playing' : 'lost',
      showEtymology: false,
      playsToday: newPlaysToday,
    });
  };

  if (!currentWord) {
    return <div>No word available for today.</div>;
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-secondary-foreground">
        <CardTitle className="font-bold text-center text-3xl">WordSmith</CardTitle>
        <CardDescription className="flex flex-col text-center text-secondary-foreground/80">
          <span>Guess the brand new word!</span>
          <span>Word {gameState.currentWordIndex + 1} of 3 for {gameState.currentDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4 space-y-4 flex flex-col items-center">

        <DefinitionAndEtymology currentWord={currentWord} gameState={gameState} />

        <div className="grid grid-cols-5 gap-y-1 gap-x-1 mb-4 w-64">
          {[...Array(6)].map((_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {[...Array(5)].map((_, colIndex) => {
                const guess = gameState.guesses[rowIndex]?.[colIndex];
                const isCurrentGuess = rowIndex === gameState.guesses.length;
                const letter = isCurrentGuess ? gameState.currentGuess[colIndex] : guess?.letter;
                const status = guess?.status || 'unevaluated';

                return (
                  <div
                    key={colIndex}
                    className={`w-11 h-11 border-2 flex items-center justify-center text-xl font-bold ${status === 'correct' ? 'bg-green-500 text-white' :
                      status === 'present' ? 'bg-yellow-500 text-white' :
                        status === 'absent' ? 'bg-gray-500 text-white' :
                          'bg-white text-black'
                      }`}
                  >
                    {letter}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        {gameState.gameStatus !== 'playing' && (
          <div className="text-center mb-4">
            <p className="text-xl font-bold mb-2">
              {gameState.gameStatus === 'won' ? 'Congratulations! You won!' : 'Game Over!'}
            </p>
            <p>The word was: {currentWord.word}</p>
            {gameState.playsToday < 3 ? (
              <Button onClick={resetGame} className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">Play Next Word</Button>
            ) : (
              <p className="mt-2">You've played all 3 words for today. Come back tomorrow!</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Game;

import React from 'react';
import { Button } from "@/components/ui/button"

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['SUBMIT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACKSPACE'],
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  correctGuessedLetters: Set<string>;
  incorrectGuessedLetters: Set<string>;
  onSubmitKeyPress: () => void;
  onBackspaceKeyPress: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, correctGuessedLetters, incorrectGuessedLetters, onSubmitKeyPress, onBackspaceKeyPress }) => {

  const handleKeyPress = (key: string) => {
    if (key === "SUBMIT") {
      onSubmitKeyPress()
    } else if (key === "BACKSPACE") {
      onBackspaceKeyPress()
    } else {
      onKeyPress(key)
    }
  }
  console.log(incorrectGuessedLetters)
  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => {
            const isCorrectGuessed = correctGuessedLetters.has(key.toLowerCase());
            const isIncorrectlyGuesed = incorrectGuessedLetters.has(key.toLowerCase())
            return (
              <Button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`mx-0.5 ${key === 'ENTER' || key === 'BACKSPACE' ? 'px-2 text-xs' : 'px-3'
                  } ${isCorrectGuessed ? 'bg-yellow-300 text-gray-800' : isIncorrectlyGuesed ? 'bg-gray-400 text-gray-600' : 'bg-gray-200 text-gray-800'
                  } hover:bg-gray-300`}
                style={{ minWidth: key === 'SUBMIT' || key === 'BACKSPACE' ? '60px' : '30px' }}
              >
                {key === 'BACKSPACE' ? '←' : key}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;


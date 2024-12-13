import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GameState, WordType } from '@/types/types'
import { Lock } from 'lucide-react';

type Props = {
  currentWord: WordType,
  gameState: GameState,
}

export default function DefinitionAndEtymology({ currentWord, gameState }: Props) {
  return (
    <>
      <Card className="w-full">
        <CardContent className='py-6'>
          <CardTitle className="text-lg font-semibold text-primary">Definition</CardTitle>
          <p>{currentWord.definition}</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className={`${!gameState.showEtymology ? 'relative' : ''} pt-6`}>
          <CardTitle className="text-lg font-semibold text-primary">Etymology</CardTitle>
          <div className='relative h-full'>
            <div className={!gameState.showEtymology ? 'px-2' : ''}>
              <p>{currentWord.etymology}</p>
            </div>
            {!gameState.showEtymology &&
              <>
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg overflow-hidden">
                  <div className='flex flex-row items-center gap-3'>
                    <Lock className="mx-auto mb-2" />
                    <div className="text-center">
                      <p>Locked</p>
                      <p>Unlocks in {3 - gameState.guesses.length} guesses</p>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        </CardContent>
      </Card>
    </>
  )
}
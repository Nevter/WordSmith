'use client'

import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from 'lucide-react'

export function HowToPlay() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between">
            <CardTitle>How to Play</CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle How to Play</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <CardContent className="mt-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>Guess the made-up 5-letter word in 6 tries.</li>
                <li>Each guess must be a 5-letter word. Press Enter to submit.</li>
                <li>After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
                <li>Green: The letter is correct and in the right spot.</li>
                <li>Yellow: The letter is in the word but in the wrong spot.</li>
                <li>Gray: The letter is not in the word.</li>
                <li>The definition of the word is provided at the start.</li>
                <li>After 3 guesses, the etymology of the word will be revealed.</li>
              </ol>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </CardHeader>
    </Card>
  )
}


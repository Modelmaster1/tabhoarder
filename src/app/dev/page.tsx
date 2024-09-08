"use client"

import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { generate } from "~/server/actions";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
const [question, setQuestion] = useState<string>("");
  const [generation, setGeneration] = useState<string>("");

  function scrapePage() {
    const url = question
    fetch(`${url}`)
    .then(response => {
        const t = response.text()
        console.log(t)

    })
  }

  return (
    <div className="p-4">
      <Input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask a question" />
      <Button onClick={scrapePage}>Scrape</Button>
      <button
        onClick={async () => {
          const { output } = await generate(question);

          for await (const delta of readStreamableValue(output)) {
            setGeneration(currentGeneration => `${currentGeneration}${delta}`);
          }
        }}
      >
        Ask
      </button>

      <div>{generation}</div>
    </div>
  );
}
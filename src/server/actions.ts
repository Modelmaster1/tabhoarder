"use server";

import { createOllama } from "ollama-ai-provider";
import { createStreamableValue } from "ai/rsc";
import { generateObject, streamObject, streamText, generateText } from "ai";
import { z } from "zod";

const ollama = createOllama({
    // custom settings
  });
  const model = ollama("phi3:latest");

export async function getAnswer(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: model,
    prompt: question,
  });

  return { text, finishReason, usage };
}

export async function generate(input: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: model,
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}

export async function getNotifications(input: string) {
  "use server";

  const { object: notifications } = await generateObject({
    model: model,
    system: "You generate three notifications for a messages app.",
    prompt: input,
    schema: z.object({
      notifications: z.array(
        z.object({
          name: z.string().describe("Name of a fictional person."),
          message: z.string().describe("Do not use emojis or links."),
          important: z.boolean(),
          minutesAgo: z.number(),
        }),
      ),
    }),
  });

  return { notifications };
}

export async function generateNotificationObject(input: string) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: model,
      system: "You generate three notifications for a messages app.",
      prompt: input,
      schema: z.object({
        notifications: z.array(
          z.object({
            name: z.string().describe("Name of a fictional person."),
            message: z.string().describe("Do not use emojis or links."),
            important: z.boolean(),
            minutesAgo: z.number(),
          }),
        ),
      }),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const { text } = await generateText({
    model: model,
    system: "You are a friendly assistant!",
    messages: history,
  });

  return {
    messages: [
      ...history,
      {
        role: "assistant" as const,
        content: text,
      },
    ],
  };
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation2(history: Message[]) {
  "use server";

  const { text, toolResults } = await generateText({
    model: model,
    system: "You are a friendly assistant!",
    messages: history,
    tools: {
      celsiusToFahrenheit: {
        description: "Converts celsius to fahrenheit",
        parameters: z.object({
          value: z.string().describe("The value in celsius"),
        }),
        execute: async ({ value }) => {
          const celsius = parseFloat(value);
          const fahrenheit = celsius * (9 / 5) + 32;
          return `${celsius}°C is ${fahrenheit.toFixed(2)}°F`;
        },
      },
    },
  });

  return {
    messages: [
      ...history,
      {
        role: "assistant" as const,
        content:
          text || toolResults.map(toolResult => toolResult.result).join("\n"),
      },
    ],
  };
}

/** @format */
import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

const step1 = createStep({
  id: "step-1",
  description: "passes value from input to output",
  inputSchema: z.object({
    value: z.number()
  }),
  outputSchema: z.object({
    value: z.number()
  }),
  execute: async ({ inputData}) => {
    const { value } = inputData;
    return {
      value
  }
})

const weatherWorkflow = createWorkflow({
  id: 'weather-workflow',
  description: '获得城市天气预报'，
  inputSchema: z.object({
    input: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  })
})
.then(step1)
.commit();

export {weatherWorkflow}
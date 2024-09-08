import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sites } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
/*
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(sites).values({
        name: input.name,
      });
    }),
    */
   
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const site = await ctx.db.query.sites.findFirst({
      orderBy: (sit, { desc }) => [desc(sit.createdAt)],
    });

    return site ?? null;
  }),
});

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const famMemberRouter = createTRPCRouter({
  getParent: publicProcedure
    .input(z.object({ childOf: z.string() }))
    .query(async ({ ctx, input }) => {
      const parent = await ctx.prisma.famMembers.findUnique({
        where: { id: input.childOf },
      });
      if (!parent) throw new TRPCError({ code: "NOT_FOUND" });
    }),
});

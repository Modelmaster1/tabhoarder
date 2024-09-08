"use client";
import { Binary } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function CompactSiteView() {
  const testData = [
    "Part time",
    "Senior level",
    "Full time",
    "Distant",
    "Internship that",
    "Project work",
  ];

  return (
    <div className="flex w-72 flex-col gap-2 rounded-2xl bg-[#0a0a0a] p-2 outline outline-[#262626]">
      <div className="flex w-full px-3 justify-between rounded-xl bg-cyan-800/50 py-3" style={undefined}>
        <img
          src={undefined}
          className="aspect-square h-9 rounded-full bg-[#0a0a0a] object-cover"
        />
        <div className="flex gap-3">
          <div>
            <div className="rounded-full bg-[#0a0a0a] p-2 px-3 text-sm">
              Group
            </div>
          </div>
          <div className="rounded-full cursor-pointer bg-[#0a0a0a] p-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Binary className="hover:opacity-80" size={20} />
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex flex-col">
          <div className="text-base font-semibold">$250/hr</div>
          <div className="text-muted-foreground text-sm opacity-50">
            San Francisco, CA
          </div>
        </div>
        <Button variant="default" className="rounded-xl">
          Visit
        </Button>
      </div>
    </div>
  );
}

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

export default function UltraCompactSiteView() {
  const testData = [
    "Part time",
    "Senior level",
    "Full time",
    "Distant",
    "Internship that",
    "Project work",
  ];
  const image =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png";

  return (
    <div className="flex w-96 flex-col gap-2 rounded-2xl bg-[#0a0a0a] p-2 outline outline-[#262626]">

      <div className="flex items-center gap-5 justify-between p-3">

        <div className="flex gap-2 items-start">
          <img
            src={image}
            className="aspect-square h-11 rounded-full bg-[#0a0a0a] object-cover"
          />
          <div className="flex max-w-40 flex-col">
            <div className="text-base font-semibold line-clamp-1 overflow-hidden">Tabhoarder: a new way to find everything</div>
            <div className="text-muted-foreground line-clamp-1 overflow-hidden text-sm opacity-50">
              https://tabhoarder.com/search/something-very-interesting
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <div className="p-2 cursor-pointer">
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
          <Button variant="default" className="rounded-xl">
            Visit
          </Button>
        </div>
      </div>
    </div>
  );
}

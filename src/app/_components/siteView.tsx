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
import site from "../_models/site";
import getDominantColors from "../_functions/getImageColor";
import getReadableTextColor from "../_functions/getReadableTextColor";

export default function SiteView({item}: { item: site }) {
  const [colors, setColors] = useState<string[]>([]);
  const textColor = getReadableTextColor(colors[0]);

  useEffect(() => {
    // Fetch the dominant colors when the component is mounted
    console.log("starting")
    if (!item.imageURL) return;
    getDominantColors(item.imageURL, true).then(setColors).catch(console.error);
  }, []);

  return (
    <div className={`flex w-72 flex-col gap-2 rounded-2xl bg-[#0a0a0a] p-2 outline outline-[#262626] h-fit -z-20`}>
      <div
        className="flex h-64 w-full flex-col gap-5 rounded-xl bg-cyan-800/50 py-3 -z-10 overflow-hidden"
        style={{ background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`, color : textColor }}
      >
        <div className="flex justify-between px-3 text-white">
          <div>
            <div className="rounded-full bg-[#0a0a0a] p-2 px-3 text-sm">
              20 May, 2023
            </div>
          </div>
          <div className="cursor-pointer rounded-full bg-[#0a0a0a] p-2">
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

        <div className="flex items-end justify-between gap-4 px-3">
          <div className="flex flex-col gap-1">
            <div className="line-clamp-1 w-48 overflow-hidden text-xs opacity-80">
              {item.url}
            </div>
            <div className="line-clamp-2 overflow-hidden text-xl">
              {item.name}
            </div>
          </div>
          <img
            src={item.imageURL ?? undefined}
            className="aspect-square h-9 rounded-full bg-transparent object-cover"
          />
        </div>

        <div className="flex flex-wrap items-center h-full gap-3 px-3 pt-1 opacity-80">
          {item.keywords &&
            item.keywords.map((item, index) => (
              <div
                key={index}
                className={`rounded-full p-1 px-3 text-sm font-light text-white outline outline-[${textColor}]`}
                style={{ color: textColor }}
              >
                {item}
              </div>
            ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex flex-col">
          <div className="text-base font-semibold">$250/hr</div>
          <div className="text-muted-foreground text-sm opacity-50">
            San Francisco, CA
          </div>
        </div>
        <Button variant="default" className="rounded-xl hover:scale-105 hover:opacity-85" style={{ backgroundColor: colors[0], color: textColor}}>
          Visit
        </Button>
      </div>
    </div>
  );
}

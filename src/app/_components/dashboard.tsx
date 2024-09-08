"use client";
import { Button } from "~/components/ui/button";
import HeaderCarousel from "./headerCarousel";
import { Input } from "~/components/ui/input";
import { use, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import SiteView from "./siteView";
import { placeholderItems } from "./placeholderItems";


export default function Dashboard({
  defaultSearch,
}: {
  defaultSearch?: string;
}) {
  const [search, setSearch] = useState<string>(formatDefaultSearch() ?? "");
  const [isProcessing, setIsProcessing] = useState(false);

  function formatDefaultSearch() {
    if (defaultSearch) {
      return decodeURIComponent(defaultSearch);
    }
  }

  function searchSomething() {
    setIsProcessing(true);
    window.location.href = "/search/" + encodeURIComponent(search);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      searchSomething();
    }
  }

  return (
    <>
      <HeaderCarousel />
      <div className="offset-y-2 sticky top-2 -mt-6 flex justify-center">
        <div className="z-100 mx-5 flex w-full max-w-[750px] gap-2">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-6"
            placeholder="Find exactly what you are looking for..."
          />
          <Button className="py-6" onClick={searchSomething}>
            {isProcessing ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <div>Search</div>
            )}
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-row flex-wrap justify-center gap-8 p-2 px-4">
        {placeholderItems.map((item) => (
          <SiteView key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

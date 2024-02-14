"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiSearchAlt2 } from "react-icons/bi";

function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (query) router.push(`/results?query=${query}&page=1`);
  };

  useEffect(() => {
    const queryParam: string | null = searchParams.get("query");
    if (queryParam) setQuery(queryParam);
    else setQuery("");
  }, [searchParams]);

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex justify-between">
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-r-0 h-12 text-md px-6 bg-white/15 border-white/0"
        />
        <Button
          type="submit"
          variant="outline"
          size="icon"
          className="h-12 text-xl border-l-0 w-24  bg-white/15 border-white/0 hover:bg-white/30"
        >
          <BiSearchAlt2 />
        </Button>
      </div>
    </form>
  );
}

export default SearchForm;

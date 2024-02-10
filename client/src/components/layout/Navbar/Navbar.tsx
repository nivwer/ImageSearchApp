"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Navbar() {
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
  }, []);

  return (
    <div className="container w-screen p-5">
      <form onSubmit={handleOnSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit">submit</Button>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default Navbar;

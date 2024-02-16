import SearchForm from "@/components/SearchForm/SearchForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

function Header() {
  return (
    <Card className="w-full p-2 sm:p-8 bg-white/15 border-none shadow-none">
      <CardHeader>
        <CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default Header;

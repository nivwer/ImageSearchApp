import SearchForm from "@/components/SearchForm/SearchForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Header() {
  return (
    <Card className="w-full p-2 sm:p-8 bg-white/15 border-none shadow-none">
      <CardHeader>
        <CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SearchForm />
      </CardContent>
    </Card>
  );
}

export default Header;

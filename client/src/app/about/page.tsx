import Divider from "@/components/Divider/Divider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About / Image Search",
};

function page() {
  return (
    <>
      <Divider children={"ABOUT"} />
      <div className="w-full flex justify-center">
        <div className="text-center max-w-md">
          The application was developed by
          <a
            className="text-white/30"
            href={process.env.GITHUB_LINK}
            target="_blank"
            children={" nivwer"}
          />
          .
          <br />
          This app utilizes the
          <a
            className="text-white/30"
            href={process.env.UNSPLASH_API_URL}
            target="_blank"
            children={" Unsplash API "}
          />
          to fetch images.
          <br />
          It is not intended for everyday use, but rather as an exhibition of skills and
          knowledge.
        </div>
      </div>
      <Divider />
    </>
  );
}

export default page;

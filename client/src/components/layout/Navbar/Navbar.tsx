import DividerGrow from "@/components/DividerGrow/DividerGrow";
import Link from "next/link";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa6";

function Navbar() {
  return (
    <DividerGrow
      leftSide={<Link href={"/"}>IMAGE SEARCH</Link>}
      rightSide={
        <div className="flex gap-4 text-lg">
          <FaGithub />
          <FaTwitter />
          <FaDiscord />
        </div>
      }
    />
  );
}

export default Navbar;

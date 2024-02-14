import ButtonIcon from "@/components/ButtonIcon/ButtonIcon";
import DividerGrow from "@/components/DividerGrow/DividerGrow";
import Link from "next/link";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa6";

function Navbar() {
  return (
    <DividerGrow
      leftSide={<Link href={"/"}>IMAGE SEARCH</Link>}
      rightSide={
        <div className="flex gap-4 text-lg">
          <a href={process.env.GITHUB_LINK} target="_blank">
            <ButtonIcon>
              <FaGithub />
            </ButtonIcon>
          </a>
          <a href={process.env.TWITTER_LINK} target="_blank">
            <ButtonIcon>
              <FaTwitter />
            </ButtonIcon>
          </a>
          <a href={process.env.DISCORD_LINK} target="_blank">
            <ButtonIcon>
              <FaDiscord />
            </ButtonIcon>
          </a>
        </div>
      }
    />
  );
}

export default Navbar;

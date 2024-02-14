import ButtonIcon from "@/components/ButtonIcon/ButtonIcon";
import Link from "next/link";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="w-full flex justify-between flex-col items-center h-24 ">
      <Link href={"/about"}>About this project</Link>
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
      <div>
        Copyright © 2024
        <a className="text-white/30" href={process.env.GITHUB_LINK} target="_blank">
          {" nivwer"}
        </a>
        .
      </div>
    </div>
  );
}

export default Footer;

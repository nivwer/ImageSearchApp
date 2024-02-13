import ButtonIcon from "@/components/ButtonIcon/ButtonIcon";
import Link from "next/link";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="w-full flex justify-between flex-col items-center h-24 ">
      <Link href={"/about"}>About this project</Link>
      <div className="flex gap-4 text-lg">
        <a href={process.env.GITHUB_LINK} target="_blank">
          <ButtonIcon children={<FaGithub />} />
        </a>
        <a href={process.env.TWITTER_LINK} target="_blank">
          <ButtonIcon children={<FaTwitter />} />
        </a>
        <a href={process.env.DISCORD_LINK} target="_blank">
          <ButtonIcon children={<FaDiscord />} />
        </a>
      </div>
      <div>
        Copyright © 2024
        <a
          className="text-white/30"
          href={process.env.GITHUB_LINK}
          target="_blank"
          children={" nivwer"}
        />
        .
      </div>
    </div>
  );
}

export default Footer;

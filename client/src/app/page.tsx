import Divider from "@/components/Divider/Divider";
import {
  GiCat,
  GiHastyGrave,
  GiCorset,
  GiShutRose,
  GiUmbrella,
  GiPalette,
} from "react-icons/gi";
import { BsBraces } from "react-icons/bs";
import ButtonIcon from "@/components/ButtonIcon/ButtonIcon";
import Link from "next/link";

function page() {
  return (
    <>
      <Divider>HOME</Divider>
      <div className="w-full flex justify-center">
        <div className="w-full flex text-6xl justify-evenly gap-10 md:gap-5 flex-wrap max-w-xs md:max-w-none text-white/80">
          <Link href={"/results/?query=cat&page=1"}>
            <ButtonIcon>
              <GiCat />
            </ButtonIcon>
          </Link>
          <Link href={"/results/?query=gothic&page=1"}>
            <ButtonIcon>
              <GiCorset />
            </ButtonIcon>
          </Link>
          <Link href={"/results/?query=programming&page=1"}>
            <ButtonIcon>
              <BsBraces />
            </ButtonIcon>
          </Link>
          <Link href={"/results/?query=rose&page=1"}>
            <ButtonIcon>
              <GiShutRose />
            </ButtonIcon>
          </Link>
          <Link href={"/results/?query=art&page=1"}>
            <ButtonIcon>
              <GiPalette />
            </ButtonIcon>
          </Link>
          <Link href={"/results/?query=tombstone&page=1"}>
            <ButtonIcon>
              <GiHastyGrave />
            </ButtonIcon>
          </Link>
          <Link href={"/results/?query=rain umbrella&page=1"}>
            <ButtonIcon>
              <GiUmbrella />
            </ButtonIcon>
          </Link>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default page;

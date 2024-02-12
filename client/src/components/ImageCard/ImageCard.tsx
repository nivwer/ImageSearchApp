"use client";

import { IImage } from "@/interfaces/IImage";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  image: IImage;
}

function ImageCard({ image }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Ajusta el tiempo según sea necesario

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className="flex w-1/2 sm:w-1/3 flex-wrap grayscale hover:grayscale-0">
      <div className="w-full p-1 md:p-2 h-44  md:h-64">
        {isLoading && <Skeleton className=" h-full w-full bg-white/30" />}
        <img
          src={image.urls.regular}
          alt=""
          loading="lazy"
          className=" block h-full w-full object-cover object-center"
          style={{ opacity: isLoading ? 0 : 1 }}
        />
      </div>
    </div>
  );
}

export default ImageCard;

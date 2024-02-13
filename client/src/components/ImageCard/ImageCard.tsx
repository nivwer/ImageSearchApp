"use client";

import { IImage } from "@/interfaces/IImage";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  image: IImage;
}

function ImageCard({ image }: IProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(true);

    setTimeout(() => {
      setIsHovered(false);
    }, 1500); 
  };

  return (
    <div
      className="flex w-1/2 sm:w-1/3 flex-wrap grayscale "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
        transition: "filter 1s ease", // Ajusta la duración según sea necesario
      }}
    >
      <div className="w-full p-1 md:p-2 h-44  md:h-64">
        {isLoading && <Skeleton className=" h-full w-full bg-white/30" />}
        <a href={image.links.html} target="_blank">
          <img
            src={image.urls.regular}
            alt=""
            loading="lazy"
            className=" block h-full w-full object-cover object-center"
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        </a>
      </div>
    </div>
  );
}

export default ImageCard;

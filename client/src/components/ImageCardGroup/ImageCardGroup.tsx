"use client";

import { IImage } from "@/interfaces/IImage";
import ImageCard from "../ImageCard/ImageCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  images: IImage[];
}

function ImageCardGroup({ images }: IProps) {
  const [imagesList, setImagesList] = useState<IImage[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    setImagesList(images);
  }, [images]);

  useEffect(() => {
    setImagesList([]);
  }, [searchParams]);

  return (
    <div className="-m-1 flex flex-wrap md:-m-2">
      {images.map((image: IImage) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}

export default ImageCardGroup;

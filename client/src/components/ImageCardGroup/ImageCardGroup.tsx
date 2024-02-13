import { IImage } from "@/interfaces/IImage";
import ImageCard from "../ImageCard/ImageCard";

interface IProps {
  images: IImage[];
}

function ImageCardGroup({ images }: IProps) {
  return (
    <div className="-m-1 flex flex-wrap md:-m-2">
      {images.map((image: IImage) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}

export default ImageCardGroup;

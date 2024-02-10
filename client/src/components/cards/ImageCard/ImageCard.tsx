import { IImage } from "@/interfaces/IImage";

interface IProps {
  image: IImage;
}

function ImageCard({ image }: IProps) {
  return <div key={image.id}>image: {image.id}</div>;
}

export default ImageCard;

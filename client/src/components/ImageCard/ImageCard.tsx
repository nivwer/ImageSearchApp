import { IImage } from "@/interfaces/IImage";

interface IProps {
  image: IImage;
}

function ImageCard({ image }: IProps) {
  return (
    <div className="flex w-1/2 sm:w-1/3 flex-wrap grayscale hover:grayscale-0">
      <div className="w-full p-1 md:p-2 h-44  md:h-64">
        <img
          src={image.urls.regular}
          alt=""
          loading="lazy"
          className=" block h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default ImageCard;

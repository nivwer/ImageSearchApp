import ImageCard from "@/components/cards/ImageCard/ImageCard";
import { IImage } from "@/interfaces/IImage";

async function loadImages(query: string, page: string) {
  const BACKEND_URL = "http://localhost:8000";
  const params: string = `?keyword=${query}&page=${page}&per_page=30`;

  const res = await fetch(`${BACKEND_URL}/search/api/v1/images/${params}`);
  const data = await res.json();

  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  return data;
}

interface ISearchParams {
  query: string;
  page: string;
}

interface IProps {
  searchParams: ISearchParams;
}

async function ResultsPage({ searchParams }: IProps) {
  const { query, page } = searchParams;
  const images = await loadImages(query, page);

  return (
    <div className="container max-w-4xl mx-auto p-0 py-4 sm:p-4">
      <div className="-m-1 flex flex-wrap md:-m-2">
        {images.results.map((image: IImage) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;

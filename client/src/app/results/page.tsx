import ImageCard from "@/components/ImageCard/ImageCard";
import { IImage } from "@/interfaces/IImage";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import Divider from "@/components/Divider/Divider";

async function loadImages(query: string, page: string) {
  const BACKEND_URL = "http://localhost:8000";
  const params: string = `?keyword=${query}&page=${page}&per_page=30`;

  const res = await fetch(`${BACKEND_URL}/search/api/v1/images/${params}`);
  const data = await res.json();

    // await new Promise((resolve) => setTimeout(resolve, 7000));

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

  const url = `/results?query=${query}`;

  return (
    <>
      <Divider children={query} />
      {images && images.results && (
        <div className="-m-1 flex flex-wrap md:-m-2">
          {images.results.map((image: IImage) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
      <Divider children={query} />
      {images && images.total_pages && (
        <CustomPagination
          url={url}
          page={parseInt(page)}
          total_pages={images.total_pages}
        />
      )}
    </>
  );
}

export default ResultsPage;

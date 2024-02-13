import CustomPagination from "@/components/CustomPagination/CustomPagination";
import Divider from "@/components/Divider/Divider";
import ImageCardGroup from "@/components/ImageCardGroup/ImageCardGroup";
import { GiChewedSkull } from "react-icons/gi";

async function loadImages(query: string, page: string) {
  const BACKEND_URL = process.env.BACKEND_URL;
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
      {images && (
        <>
          <Divider children={images.total > 0 ? query : "not found"} />
          {images.total > 0 && <ImageCardGroup images={images.results} />}
          {images.total_pages > 0 && images.total > 0 && (
            <>
              <Divider children={query} />
              <CustomPagination
                url={url}
                page={parseInt(page)}
                total_pages={images.total_pages}
              />
            </>
          )}

          {images.total === 0 && (
            <div className="w-full flex justify-center text-7xl text-white/80">
              <GiChewedSkull />
            </div>
          )}
          <Divider />
        </>
      )}
    </>
  );
}

export default ResultsPage;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetImagesResultsQuery } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { ImageList, ImageListItem } from '@mui/material'


function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    query: "cats",
    page: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("query");
    const page = searchParams.get("page");
    setParams((prevParams) => ({
      ...prevParams,
      query: query ? query : "cats",
      page: page ? page : false,
    }));
  }, [searchParams]);

  useEffect(() => {
    if (params.query === "cats") {
      navigate("/home");
    }
  }, [params]);


  
  const { data, isError, isLoading, error } = useGetImagesResultsQuery(params);

  if (isLoading) return <div>Loading..</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  const results = data.results;


  return (
    <>
      <div>SearchResults</div>
      <ImageList variant="masonry" cols={3} gap={8}>
        {results.map((r) => (
          <ImageListItem key={r.id}>
            <img
              src={r.urls.small}
              // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              // alt={}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default SearchResults;

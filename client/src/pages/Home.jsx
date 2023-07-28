import { useState, useEffect } from "react";
import { Outlet, useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetImagesResultsQuery, useGetPopularSearchesQuery } from "../api/apiSlice";
import { AddImages } from "../features/imagesData/imagesDataSlice";
import { AddPopularSearches } from '../features/popularSearches/popularSearchesSlice'
import {
  Box,
  Container,
  Pagination,
  Stack,
  PaginationItem,
  Divider,
  Button,
  Typography,
} from "@mui/material";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  const { data: popularSearchesData } = useGetPopularSearchesQuery();

  const [params, setParams] = useState({
    query: '',
    page: '1',
  });
  

  useEffect(() => {
    const query = (searchParams.get("query") || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
    const page = (searchParams.get("page") || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    if (query && page) {
      setSearchParams({ query, page });
    }

    setParams(() => ({
      query: query ? query : "cats",
      page: page ? page : "1",
    }));
  }, [searchParams]);

  const { data: imagesData, isError, isLoading, error } = useGetImagesResultsQuery(params);

  useEffect(() => {
    console.log(popularSearchesData)
    dispatch(AddPopularSearches(popularSearchesData))
  }, [popularSearchesData])

  useEffect(() => {
    dispatch(AddImages(imagesData));
  }, [imagesData]);

  if (isLoading) return <div>Loading..</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  const totalPages = imagesData.total_pages;

  const recomend = ["Dog", "Cat", "Car", "Flor"];

  return (
    <>
      <Container>
        <Stack
          sx={{ m: "0 30px" }}
          justifyContent={"start"}
          direction="row"
          spacing={2}
        >
          <Box sx={{ flexGrow: 1 }}>
            {recomend.map((r, i) => {
              return (
                <Button key={i}>
                  <Link to={`/home/results/?query=${r}&page=1`}>{r}</Link>
                </Button>
              );
            })}
          </Box>
          <Typography variant="subtitle1">RESULTS</Typography>
        </Stack>

        <Outlet />
        <Divider sx={{ m: "40px" }}>CENTER</Divider>
        <Box sx={{ m: "30px" }}>
          <Stack justifyContent="center" direction="row" spacing={2}>
            <Pagination
              page={parseInt(params.page)}
              count={totalPages}
              color="secondary"
              sx={{}}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/home/results/?query=${params.query}&page=${item.page}`}
                  {...item}
                />
              )}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}

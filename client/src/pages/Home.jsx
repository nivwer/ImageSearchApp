import { useState, useEffect } from "react";
import { Outlet, useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetImagesResultsQuery,
  useGetPopularSearchesQuery,
} from "../api/apiSlice";
import { AddImages } from "../features/imagesData/imagesDataSlice";
import { AddPopularSearches } from "../features/popularSearches/popularSearchesSlice";
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
  // Query for get the Popular Searches.
  const { data: popularSearchesData } = useGetPopularSearchesQuery();
  const dispatch = useDispatch();
  // Get parameters state from URL.
  const [searchParams, setSearchParams] = useSearchParams();
  // Parameters state for the query.
  const [params, setParams] = useState({
    query: "",
    page: "1",
  });
  // Query for get the Images Data.
  const {
    data: imagesData,
    isError,
    isLoading,
    error,
  } = useGetImagesResultsQuery(params);

  // Update the parameters state if parameters from URL exist.
  useEffect(() => {
    // Remove spaces from URL.
    const query = (searchParams.get("query") || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
    const page = (searchParams.get("page") || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    // Update parameters if exist.
    if (query && page) {
      setSearchParams({ query, page });
    }

    // Update parameters state for the query if exist.
    // If not exist, parameters state is default.
    setParams(() => ({
      query: query ? query : "cats",
      page: page ? page : "1",
    }));
  }, [searchParams]);

  // Add Popular Search results to the global state.
  useEffect(() => {
    console.log(popularSearchesData);
    dispatch(AddPopularSearches(popularSearchesData));
  }, [popularSearchesData]);

  // Add Images Data results to the global state.
  useEffect(() => {
    dispatch(AddImages(imagesData));
  }, [imagesData]);

  // When getting the images data results.
  if (isLoading) return <div>Loading..</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  // Additional logic.
  const totalPages = imagesData.total_pages;
  const popularSearches = ["Dog", "Cat", "Car", "Flor"];

  return (
    <>
      {/* HomePage Container. */}
      <Container>
        <Stack
          sx={{ m: "0 30px" }}
          justifyContent={"start"}
          direction="row"
          spacing={2}
        >
          {/* Recommended Popular Searches. */}
          <Box sx={{ flexGrow: 1 }}>
            {popularSearches.map((r, i) => {
              return (
                <Button key={i}>
                  <Link to={`/home/results/?query=${r}&page=1`}>{r}</Link>
                </Button>
              );
            })}
          </Box>
          {/* View all results. */}
          <Typography variant="subtitle1">RESULTS</Typography>
        </Stack>
        {/* view Images results. */}
        <Outlet />
        <Divider sx={{ m: "40px" }}>CENTER</Divider>

        {/* Page pagination. */}
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

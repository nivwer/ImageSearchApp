// Hooks.
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetImagesResultsQuery,
  useGetPopularSearchesQuery,
} from "../api/apiSlice";
// Actions.
import { AddImages } from "../features/imagesData/imagesDataSlice";
import { AddPopularSearches } from "../features/popularSearches/popularSearchesSlice";
// Components.
import { Outlet, useSearchParams, Link } from "react-router-dom";
import NavPopularSearches from "../components/Navigation/NavPopularSearches";
import {
  Box,
  Container,
  Pagination,
  Stack,
  PaginationItem,
  Divider,
  CircularProgress,
} from "@mui/material";

// Page.
export function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  // Query for get the Popular Searches.
  const { data: popularSearchesData } = useGetPopularSearchesQuery("8");
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
    isFetching,
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
      query: query ? query : "gothic",
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

  return (
    <>
      {/* HomePage Navbar. */}
      <NavPopularSearches />
      {/* HomePage Container. */}
      <Container sx={{ mt: { xs: "75px", md: "150px" }, mb: "75px" }}>
        {/* view Images results. */}
        <Divider sx={{ m: "40px" }}>{params.query.toUpperCase()}</Divider>

        <Box sx={{ minHeight: "80vh" }}>
          {/* If isLoading or isError. */}
          {isLoading || isFetching ? (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              direction="column"
              spacing={1}
              sx={{ width: "100%", height: "80vh" }}
            >
              <CircularProgress color="inherit" />
            </Stack>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <Outlet /> // Images Results.
          )}
        </Box>

        <Divider sx={{ m: "40px" }}>{params.query.toUpperCase()}</Divider>

        {/* Page pagination. */}
        {imagesData && (
          <Box sx={{ m: "30px" }}>
            <Stack justifyContent="center" direction="row" spacing={2}>
              <Pagination
                size="small"
                page={parseInt(params.page)}
                count={imagesData.total_pages}
                color="secondary"
                sx={{}}
                renderItem={(item) => (
                  <PaginationItem
                    sx={{
                      fontSize: { xs: "1.2em", md: "1.4em" },
                      p: { xs: "0", md: "10px" },
                    }}
                    component={Link}
                    to={`/home/results/?query=${params.query}&page=${item.page}`}
                    {...item}
                  />
                )}
              />
            </Stack>
          </Box>
        )}
      </Container>
    </>
  );
}

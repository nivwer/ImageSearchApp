import { useTheme } from "@mui/material/styles";
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
  Toolbar,
  AppBar,
} from "@mui/material";

export function Home() {
  //
  const theme = useTheme();
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

  const popularSearches = [
    "Dog",
    "Cat",
    "Car",
    "Flor",
    "Gothic",
    "Black",
    "Rose",
    "Magical ",
  ];

  const NavPopularSearches = () => (
    <AppBar
      sx={{ zIndex: 10, display: { xs: "none", md: "block", top: 60, } }}
      component={"nav"}
      color="primary"
    >
      <Toolbar
        sx={{
        }}
      >
       
        <Stack
          justifyContent={"center"}
          direction="row"
          spacing={1}
          sx={{ width: "100%", mr: "90px" }}
        >
          {/* Recommended Popular Searches. */}
          {popularSearches.map((r, i) => {
            return (
              <Button
                size="small"
                sx={{ borderRadius: "100px" }}
                variant="contained"
                color="secondary"
                key={i}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.secondary,
                  }}
                  to={`/home/results/?query=${r}&page=1`}
                >
                  {r}
                </Link>
              </Button>
            );
          })}
        </Stack>
         {/* View all results. */}
         {/* <Typography variant="subtitle1">RESULTS</Typography> */}
         
      </Toolbar>
    </AppBar>
  );

  // When getting the images data results.
  if (isLoading)
    return (
      <>
        <NavPopularSearches />
        <div>Loading..</div>
      </>
    );
  else if (isError)
    return (
      <>
        <NavPopularSearches />
        <div>Error: {error.message}</div>
      </>
    );

  // Additional logic.
  const totalPages = imagesData.total_pages;

  return (
    <>
      <NavPopularSearches />
      {/* HomePage Container. */}
      <Container sx={{ mt: {xs: "75px", md: "150px"}, mb: "75px"}} >
        {/* view Images results. */}
        <Divider sx={{ m: "40px" }}>{(params.query).toUpperCase()}</Divider>
        <Outlet />
        <Divider sx={{ m: "40px" }}>{(params.query).toUpperCase()}</Divider>

        {/* Page pagination. */}
        <Box sx={{ m: "30px" }}>
          <Stack justifyContent="center" direction="row" spacing={2}>
            <Pagination
              size="small" 
              page={parseInt(params.page)}
              count={totalPages}
              color="secondary"
              sx={{}}
              renderItem={(item) => (
                <PaginationItem
                  sx={{fontSize: {xs: "1.2em", md: "1.4em"}, p: {xs: "0", md: "10px"}}}
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

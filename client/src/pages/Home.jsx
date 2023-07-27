import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Pagination,
  Stack,
  PaginationItem,
  Divider,
  Breadcrumbs,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import { Outlet, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetImagesResultsQuery } from "../api/apiSlice";
import { AddImages } from "../features/imagesData/imagesDataSlice";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [params, setParams] = useState({
    query: "cats",
    page: "1",
  });

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = searchParams.get("query");
    const page = searchParams.get("page");

    setParams((prevParams) => ({
      ...prevParams,
      query: query ? query : "cats",
      page: page ? page : "1",
    }));
  }, [searchParams]);

  const { data, isError, isLoading, error } = useGetImagesResultsQuery(params);

  useEffect(() => {
    dispatch(AddImages(data));
  }, [data]);

  if (isLoading) return <div>Loading..</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  const totalPages = data.total_pages;

  const recomend = ["Dog", "Cat", "Car", "FLor"];

  return (
    <>
      <Container>
        <Stack sx={{m: '0 30px'}} justifyContent={"start"} direction="row" spacing={2}>
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

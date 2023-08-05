// Components.
import { Link } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/material";

// If page not found.
export function NotFoundPage() {
  return (
    <>
      <Container>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          direction="column"
          spacing={1}
          sx={{ textAlign: "center", width: "100%", height: "calc(100vh - 100px)" }}
        >
          <Typography variant="h1">404</Typography>
          <Typography variant="h4">Page not found</Typography>
          <Typography variant="h6">The page you are looking for doesn't exist on an other error ocurred. <br/> Go back to <Link to={"/home"}>HomePage</Link>.</Typography>
        </Stack>
      </Container>
    </>
  );
}

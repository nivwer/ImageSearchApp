import { NavLink } from "react-router-dom";
import SearchForm from "../../components/Search/SearchForm";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
} from "@mui/material";

export function Navigation() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar component="nav" color="primary">
          <Container>
            <Toolbar>
              <Typography variant="h6">
                <NavLink to="/">ISearch</NavLink>
              </Typography>
              <Box sx={{ flexGrow: 1, m: '0 100px' }}>
                <SearchForm />

              </Box>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Button>
                  <NavLink to="/home">Home</NavLink>
                </Button>
                <Button>
                  <NavLink to="/about">About</NavLink>
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}

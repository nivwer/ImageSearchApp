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
      {/* Navbar on all the pages. */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar component="nav" color="primary">
            <Toolbar sx={{m: '0 5%'}}>
              {/* Logotipo. */}
              <Typography variant="h6">
                <NavLink to="/">ISearch</NavLink>
              </Typography>
              {/* Search component. */}
              <Box sx={{ flexGrow: 1, m: '0 100px' }}>
                <SearchForm />
              </Box>
              {/* NavLinks. */}
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Button>
                  <NavLink to="/home">Home</NavLink>
                </Button>
                <Button>
                  <NavLink to="/about">About</NavLink>
                </Button>
              </Box>
            </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <AppBar position="static" >
          <Toolbar>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "../../components/Search/SearchForm";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  IconButton,
  Drawer,
  SwipeableDrawer,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export function Navigation() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [showSearch, setShowSearch] = useState("none");

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setShowNavLinks(open);
  };

  // const toggleSearch = (open) => {
    
  // }

  const NavLinks = () => (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={1}
      sx={{
        minWidth: { xs: "200px", md: "auto" },
        paddingTop: { xs: "60px", md: "0" },
      }}
    >
      <Button>
        <NavLink to="/home">Home</NavLink>
      </Button>
      <Button>
        <NavLink to="/about">About</NavLink>
      </Button>
    </Stack>
  );

  return (
    <>
      {/* Navbar on all the pages. */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar component="nav" color="primary">
          <Toolbar sx={{ m: { xs: "0", md: "0 5%" } }}>
            {/* Logotipo. */}
            <Typography variant="h6" sx={{ ml: 1, flexGrow: {xs: 1, md: 0} }}>
              <NavLink to="/">ISearch</NavLink>
            </Typography>

            {/* Search component. */}
            <>
              <Box sx={{ m: "0 100px", flexGrow: 1, display: {xs: "none", md: "block"} }}>
                {/* Laptop Screen. */}
                <Box sx={{ flexGrow: 1 }}>
                  <SearchForm />
                </Box>
              </Box>

              {/* Phone Screen. */}
              <Box sx={{ display: { xs: "block", md: "none" }, m: "auto 4px" }}>
                <IconButton
                onClick={() => {
                  setShowSearch("block")
                }} 
                type="button" sx={{ p: "5px", color: "#c4c4c4" }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </>

            {/* NavLinks. */}
            <>
              {/* Laptop Screen. */}
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <NavLinks />
              </Box>
              {/* Phone Screen. */}
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <IconButton
                  onClick={toggleDrawer(true)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: { xs: 0, md: 2 }, color: "#c4c4c4" }}
                >
                  <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                  sx={{ display: { xs: "block", md: "none" } }}
                  anchor="right"
                  open={showNavLinks}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  <NavLinks />
                </SwipeableDrawer>
              </Box>
            </>
          </Toolbar>
        </AppBar>
        <AppBar component="nav" color="primary" sx={{display: {xs: showSearch, md: "none"}}}>
          <Toolbar>
            <IconButton>
              <ArrowBackIosIcon
                onClick={() => {
                  setShowSearch("none")
                }}
                type="button"
                sx={{ p: "1px", color: "#c4c4c4" }}
              />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <SearchForm />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <AppBar position="static">
          <Toolbar></Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

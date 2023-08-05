// Hooks.
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
// Components.
import SearchForm from "../../components/Search/SearchForm";
import { NavLink } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  SwipeableDrawer,
  Stack,
} from "@mui/material";
// Icons.
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Component.
export function Navigation() {
  const theme = useTheme();
  // For lower resolutions.
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState("none");

  // Toggle for the Swipeable Drawer to show NavLinks in the lower resolutions.
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setShowNavLinks(open);
  };

  // NavLinks.
  const navLinks = [
    { tittle: "Home", href: "/home" },
    { tittle: "About", href: "/about" },
  ];

  // Stack of NavLinks.
  const NavLinks = () => (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={1}
      sx={{
        minWidth: { xs: "200px", md: "auto" },
        paddingTop: { xs: "60px", md: "0" },
      }}
    >
      {navLinks.map((l, i) => (
        <Button
          key={i}
          variant="contained"
          color="primary"
          sx={{ borderRadius: "100px" }}
        >
          <NavLink
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
            to={l.href}
          >
            {l.tittle}
          </NavLink>
        </Button>
      ))}
    </Stack>
  );

  return (
    <>
      {/* Navbar on all the pages. */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ zIndex: 50 }} component="nav" color="primary">
          <Toolbar sx={{ m: { xs: "0", md: "0 5%" } }}>
            {/* Logotipo. */}
            <Typography variant="h5" sx={{ ml: 1, flexGrow: { xs: 1, md: 0 } }}>
              <NavLink
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
                to="/"
              >
                ISearch
              </NavLink>
            </Typography>

            {/* Search component. */}
            <>
              {/* Laptop Screen. */}
              <Box
                sx={{
                  m: "0 100px",
                  flexGrow: 1,
                  display: { xs: "none", md: "block" },
                }}
              >
                <SearchForm />
              </Box>

              {/* Phone Screen. */}
              <Box sx={{ display: { xs: "block", md: "none" }, m: "auto 4px" }}>
                {/* When on Click in the button, show SearchBar. */}
                <IconButton
                  onClick={() => {
                    setShowSearchBar("block");
                  }}
                  type="button"
                  sx={{ p: "5px", color: theme.palette.text.primary }}
                >
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
                {/* When on Click in the button, show NavLinks. */}
                <IconButton
                  onClick={toggleDrawer(true)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{
                    mr: { xs: 0, md: 2 },
                    color: theme.palette.text.primary,
                  }}
                >
                  <MenuIcon />
                </IconButton>
                {/* Swipeable Drawer to show NavLinks. */}
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

        {/* SearchBar. */}
        <AppBar
          component="nav"
          color="primary"
          sx={{ display: { xs: showSearchBar, md: "none" } }}
        >
          <Toolbar>
            {/* When on Click in the button, hidden SearchBar. */}
            <IconButton>
              <ArrowBackIosIcon
                onClick={() => {
                  setShowSearchBar("none");
                }}
                type="button"
                sx={{ p: "1px", color: theme.palette.text.primary }}
              />
            </IconButton>
            {/* SearchForm component. */}
            <Box sx={{ flexGrow: 1 }}>
              <SearchForm />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

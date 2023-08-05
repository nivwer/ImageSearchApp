// Hooks.
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
// Components.
import { Link } from "react-router-dom";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";

// Component.
function NavPopularSearches() {
  const theme = useTheme();
  // Get Popular Searches from global state.
  const popularSearches = useSelector((state) => state.popularSearchesData);

  return (
    <>
      {/* Second AppBar. */}
      <AppBar
        sx={{ zIndex: 10, display: { xs: "none", md: "block", top: 60 } }}
        component={"nav"}
        color="primary"
      >
        <Toolbar>
          <Stack
            justifyContent={"center"}
            direction="row"
            spacing={1}
            sx={{ width: "100%", mr: "90px" }}
          >
            {/* Recommended Popular Searches. */}
            {popularSearches.popular_searches.map((r, i) => {
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
                    to={`/home/results/?query=${r.query}&page=1`}
                  >
                    {r.query}
                  </Link>
                </Button>
              );
            })}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavPopularSearches;

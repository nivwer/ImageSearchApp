// Hooks.
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
// Components.
import {
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
// Icons.
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

// Component.
function SearchResults() {
  const theme = useTheme();
  // Get the Images Data results from the global state.
  const imagesData = useSelector((state) => state.imagesData);
  const results = imagesData.results;

  // Media Querys.
  const isXSmallScreen = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.only("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // Number of columns.
  const getCols = () => {
    return isXSmallScreen ? 2 : isSmallScreen ? 4 : isMediumScreen ? 5 : 5;
  };

  return (
    <>
      {/* If Images Results exist. */}
      {results && results.length !== 0 ? (
        <ImageList variant="masonry" cols={getCols()} gap={8}>
          {results.map((r) => (
            <ImageListItem key={r.id}>
              <img src={r.urls.small} alt={r.alt_description} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Stack
          color={theme.palette.text.secondary}
          justifyContent={"center"}
          alignItems={"center"}
          direction="column"
          spacing={1}
          sx={{ textAlign: "center", width: "100%", height: "80vh" }}
        >
          <SentimentDissatisfiedIcon sx={{ fontSize: "2.3em" }} />
          <Typography variant="h5">Images not found.</Typography>
        </Stack>
      )}
    </>
  );
}

export default SearchResults;

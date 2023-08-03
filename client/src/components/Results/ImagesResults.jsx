import { Box, ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

function SearchResults() {
  // Get the Images Data results from the global state.
  const imagesData = useSelector((state) => state.imagesData);
  const results = imagesData.results;

  const isXSmallScreen = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.only("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const getCols = () => {
    if (isMediumScreen) {
      return 5;
    } else if (isSmallScreen) {
      return 4;
    } else if (isXSmallScreen) {
      return 2;
    } else {
      return 5;
    }
  };

  if (results) {
    return (
      <>
        <Box sx={{ minHeight: "80vh" }}>
          <ImageList variant="masonry" cols={getCols()} gap={8}>
            {results.map((r) => (
              <ImageListItem key={r.id}>
                <img
                  src={r.urls.small}
                  // srcSet={r.urls.small}
                  // alt={}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </>
    );
  } else {
    return <div>images not find</div>;
  }
}

export default SearchResults;

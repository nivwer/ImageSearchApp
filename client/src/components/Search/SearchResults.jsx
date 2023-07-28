import { Box, ImageList, ImageListItem } from "@mui/material";
import { useSelector } from "react-redux";

function SearchResults() {
  const imagesData = useSelector((state) => state.imagesData);
  const results = imagesData.results;

  if (results) {
    return (
      <>
        <Box sx={{minHeight: '80vh'}}>
        <ImageList variant="masonry" cols={5} gap={8}>
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

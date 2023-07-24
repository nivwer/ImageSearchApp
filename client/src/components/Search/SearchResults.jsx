import { useSearchParams } from 'react-router-dom'

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get('query'))



  
  // const { data, isError, isLoading, error } = useGetImagesResultsQuery(params);
  
  // if (isLoading) return <div>Loading..</div>;
  // else if (isError) return <div>Error: {error.message}</div>;
  // const searchResults = data;
  // console.log(searchResults)
  

 
 

  return (
    <ul>
      <div>SearchResults</div>
      {/* {searchResults.map((image) => (
      <li key={image.id}>
        <h3>{image.res}</h3>
        <h3>{image.pais}</h3>
      </li>
      ))} */}
    </ul>
  );
}

export default SearchResults;

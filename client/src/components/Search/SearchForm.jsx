import { useGetHelloQuery } from "../../api/apiSlice";

function SearchForm() {
  const { data, isError, isLoading, error } = useGetHelloQuery();

  if (isLoading) return <div>Loading..</div>;
  else if (isError) return <div>Error: {error.message}</div>;
  const res = data.res

  return (
    <ul>
      {res.map((re) => (
        <li>
          <h3>{re.res}</h3>
          <h3>{re.pais}</h3>
        </li>
      ))}
    </ul>
  );
}

export default SearchForm;

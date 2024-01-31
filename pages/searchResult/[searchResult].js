import { useRouter } from "next/router";

import NavBar from "../../components/navbar/navbar";

const SearchResult = () => {
  const router = useRouter();

  console.log("Router Query: ", router);
  return (
    <div>
      <NavBar />
      <h1>Search Result</h1>
    </div>
  );
};

export default SearchResult;

import { useRouter } from "next/router";
import Link from "next/link";

import NavBar from "../../components/navbar/navbar";
import styles from "../../styles/searchResult.module.css";
import { getVideos } from "../../lib/videos";
import Card from "../../components/card/card";

export async function getServerSideProps(context) {
  const searchQuery = context.query.searchResult;

  const searchResults = await getVideos(searchQuery);

  return {
    props: { searchResults },
  };
}

const SearchResult = (searchResults) => {
  const router = useRouter();

  const searchQuery = router.query.searchResult;
  const searchResult = searchResults.searchResults;

  return (
    <div>
      <NavBar />

      <section className={styles.container}>
        <h2 className={styles.title}>Search Results: {searchQuery}</h2>
        <div className={styles.cardWrapper}>
          {searchResult.map((video) => {
            return (
              <Link href={`/watch/${video.id}`}>
                <Card imgUrl={video.imgUrl} size={"normal"} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SearchResult;
import { useRouter } from "next/router";
import Link from "next/link";

import NavBar from "../../components/navbar/navbar";
import styles from "../../styles/searchResult.module.css";
import { getVideos } from "../../lib/videos";
import Card from "../../components/card/card";
import Head from "next/head";
import Image from "next/image";

export async function getServerSideProps(context) {
  const searchQuery = context.query.searchResult;

  const searchResults = await getVideos(searchQuery);

  return {
    props: { searchResults },
  };
}

const SearchResult = ({ searchResults }) => {
  const router = useRouter();

  const searchQuery = router.query.searchResult;

  return (
    <div>
      <Head>
        <title>{searchQuery} - Search Results on Watch Now</title>
        <meta
          name="description"
          content={`Find videos related to ${searchQuery} on Watch Now by Naresh Jaipal. Discover trailers, clips, and more.`}
        />
      </Head>
      <NavBar />

      <section className={styles.container}>
        <div className={styles.titleWrapper}>
          <Image
            className={styles.emoji}
            src={"/static/icons/title/search.svg"}
            width={32}
            height={32}
            alt="emoji"
          />

          <h2 className={styles.title}>Results: {searchQuery}</h2>
        </div>
        <div className={styles.cardWrapper}>
          {searchResults.map((video) => {
            const videoId = video.id;
            if (typeof videoId === "string") {
              return (
                <Link href={`/watch/${videoId}`} key={videoId}>
                  <Card imgUrl={video.imgUrl} videoId={videoId} />
                </Link>
              );
            }
          })}
        </div>
      </section>
    </div>
  );
};

export default SearchResult;

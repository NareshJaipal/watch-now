import NavBar from "../components/navbar/navbar";
import SectionCard from "..//components/card/section-card";
import styles from "../styles/favorite.module.css";
import { getWatchItAgainVideos, getMyFavoritedVideos } from "../lib/videos";
import redirectUser from "../utils/redirectUser";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const favoritedVideos = await getMyFavoritedVideos(userId, token);

  return {
    props: { watchItAgainVideos, favoritedVideos },
  };
}

const Favorite = ({ watchItAgainVideos, favoritedVideos }) => {
  return (
    <>
      <Head>
        <title>My Favorites - Watch Now</title>
        <meta
          name="description"
          content="Watch your favorite videos, revisit clips you enjoyed, and manage your Watch Now favorites list on Watch Now by Naresh Jaipal"
        />
      </Head>
      <main>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCard
            title="Watch it again"
            videos={watchItAgainVideos}
            icon={"/static/icons/title/again.svg"}
            size="normal"
          />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCard
            title="Liked Videos"
            videos={favoritedVideos}
            icon={"/static/icons/title/liked.svg"}
            size="normal"
          />
        </div>
      </main>
    </>
  );
};

export default Favorite;

import NavBar from "../components/navbar/navbar";
import SectionCard from "..//components/card/section-card";
import styles from "../styles/favorite.module.css";
import { getWatchItAgainVideos, getMyFavoritedVideos } from "../lib/videos";
import redirectUser from "../utils/redirectUser";

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
    <div>
      <NavBar />
      <div className={styles.sectionWrapper}>
        <SectionCard
          title="Liked Videos"
          videos={favoritedVideos}
          size="normal"
        />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard
          title="Watch it again"
          videos={watchItAgainVideos}
          size="normal"
        />
      </div>
    </div>
  );
};

export default Favorite;

import Head from "next/head";
import { Inter } from "next/font/google";

import styles from "../styles/Home.module.css";
import NavBar from "../components/navbar/navbar";
import SectionCard from "../components/card/section-card";
import { getVideos, getPopularVideos } from "../lib/videos";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("travel");
  const productivityVideos = await getVideos("productivity");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Watch Now - Discover the Latest Videos</title>

        <meta
          name="description"
          content={`Watch the latest trailers like travel vlogs, productivity tips, and more on Watch Now by Naresh Jaipal`}
        />
      </Head>
      <main className={styles.main}>
        <NavBar logo={true} />

        {/* Sections */}
        <div className={styles.sectionWrapper}>
          <SectionCard
            title="Disney"
            icon={"/static/icons/title/disney.svg"}
            videos={disneyVideos}
            size="larg"
          />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCard
            title="Travel"
            videos={travelVideos}
            icon={"/static/icons/title/travel.svg"}
            size="normal"
          />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCard
            title="Productivity"
            videos={productivityVideos}
            icon={"/static/icons/title/productivity.svg"}
            size="normal"
          />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCard
            title="Popular"
            videos={popularVideos}
            icon={"/static/icons/title/popular.svg"}
            size="normal"
          />
        </div>
      </main>
    </>
  );
}

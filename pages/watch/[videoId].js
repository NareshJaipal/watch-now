import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "../../styles/watch.module.css";
import NavBar from "../../components/navbar/navbar";
import { getVideoDetailsById } from "../../lib/videos";
import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";
import { useEffect, useState } from "react";
import Head from "next/head";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoDetails = await getVideoDetailsById(videoId);

  return {
    props: {
      video: videoDetails.length > 0 ? videoDetails[0] : {},
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["YXqQ_uqd_yI", "a6IIhwZv4ls"];

  const paths = listOfVideos.map((videoId) => ({
    params: {
      videoId,
    },
  }));
  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();
  const videoId = router.query.videoId;
  const { title, description, publishTime, channelName, viewCount } = video;
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);

  useEffect(async () => {
    const response = await fetch(`/api/stats?videoId=${videoId}`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.length > 0) {
      const favorited = data[0].favorited;
      if (favorited === 1) {
        setToggleLike(true);
      } else if (favorited === 0) {
        setToggleDisLike(true);
      }
    }
  }, []);

  const runRatingService = async (favorited) => {
    return await fetch("/api/stats/", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favorited,
        watched: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleToggleLike = async (e) => {
    e.preventDefault();
    setToggleLike(!toggleLike);
    setToggleDisLike(toggleLike);

    const favorited = !toggleLike ? 1 : 0;

    const response = await runRatingService(favorited);
  };

  const handleToggleDisLike = async (e) => {
    e.preventDefault();
    setToggleDisLike(!toggleDisLike);
    setToggleLike(toggleDisLike);

    const favorited = !toggleDisLike ? 0 : 1;

    const response = await runRatingService(favorited);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{video.title} - Watch Now</title>
        <meta
          name="description"
          content={`${video.description} - Watch Now by Naresh Jaipal`}
        />

        <script type="application/ld+json">
          {{
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: `${video.title}`,
            description: `${video.description}`,
            uploadDate: `${video.publishTime}`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
          }}
        </script>
      </Head>
      <main>
        <NavBar />
        <Modal
          isOpen={true}
          contentLabel="Example Modal"
          onRequestClose={() => router.back()}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <iframe
            id="ytplayer"
            className={styles.videoPlayer}
            type="text/html"
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
            frameBorder="0"
          />

          <div className={styles.likeDisLikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
              <button onClick={handleToggleLike}>
                <div className={styles.btnWrapper}>
                  <Like selected={toggleLike} />
                </div>
              </button>
            </div>
            <button onClick={handleToggleDisLike}>
              <div className={styles.btnWrapper}>
                <DisLike selected={toggleDisLike} />
              </div>
            </button>
          </div>

          <div className={styles.additionalInfoWrapper}>
            <div className={styles.additionalInfo}>
              <div className={styles.col1}>
                <p className={styles.publishTime}>{publishTime}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
              </div>
              <div className={styles.col2}>
                <p className={styles.subTitle}>
                  <span className={styles.subTitleText}>Channel Name: </span>
                  <span className={styles.channelName}>{channelName}</span>
                </p>
                <p className={styles.subTitle}>
                  <span className={styles.subTitleText}>View Count: </span>
                  <span className={styles.viewCount}>{viewCount}</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default Video;

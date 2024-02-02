import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "../../styles/watch.module.css";
import NavBar from "../..//components/navbar/navbar";
import { getVideoDetailsById } from "../../lib/videos";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  console.log({ context });
  const videoId = context.params.videoId;
  const videoDetails = await getVideoDetailsById(videoId);

  console.log("Video Details: ", videoDetails[0]);

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
  const { title, description, publishTime, channelName, viewCount } = video;
  return (
    <div className={styles.container}>
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
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
          frameborder="0"
        />

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
    </div>
  );
};

export default Video;

import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "../../styles/watch.module.css";
import NavBar from "../..//components/navbar/navbar";

const Video = () => {
  const router = useRouter();
  console.log({ router });

  const video = {
    title: "Page Title",
    description:
      "this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing this is a text that i am writting for testing",
    publishTime: "10-06-2003",
    channelName: "Disney Hub",
    viewCount: 1000,
  };

  const { title, description, publishTime, channelName, viewCount } = video;
  return (
    <div className={styles.container}>
      <NavBar />

      {/* <div className={styles.backBtn}>
        <span className={styles.backArrow}>←</span> <span>go back</span>
      </div> */}
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

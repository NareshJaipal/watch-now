import Link from "next/link";
import Card from "./card";
import styles from "./section-card.module.css";
import Image from "next/image";

const SectionCard = (props) => {
  const {
    title,
    icon = "/static/icons/title/popular.svg",
    videos = [],
    size,
  } = props;

  return (
    <section className={styles.container}>
      <div className={styles.titleWrapper}>
        <Image
          className={styles.emoji}
          src={icon}
          width={32}
          height={32}
          alt="emoji"
        />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          const videoId = video.id;
          if (typeof videoId === "string") {
            return (
              <Link href={`/watch/${videoId}`} key={videoId}>
                <Card
                  id={idx}
                  imgUrl={video.imgUrl}
                  videoId={videoId}
                  size={size}
                />
              </Link>
            );
          }
        })}
      </div>
    </section>
  );
};

export default SectionCard;

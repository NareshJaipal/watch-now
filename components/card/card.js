import Image from "next/legacy/image";
import styles from "./card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

const Card = (props) => {
  const { imgUrl, size = "normal", id, videoId } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    larg: styles.largItem,
    normal: styles.normalItem,
  };

  const handleImgError = () => {
    if (imgSrc !== `https://img.youtube.com/vi/${videoId}/sddefault.jpg`) {
      setImgSrc(`https://img.youtube.com/vi/${videoId}/sddefault.jpg`);
    } else {
      setImgSrc(
        "https://plus.unsplash.com/premium_photo-1682125771198-f7cbed7cb868?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    }
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ ...scale }}
        className={`${styles.imgMotionWrapper} ${classMap[size]}`}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          layout="fill"
          onError={handleImgError}
          alt="Thumnail"
          // priority="false"
        />
      </motion.div>
    </div>
  );
};

export default Card;

import styles from "./navbar.module.css";
import Image from "next/image";

const NavBar = () => {
  return (
    <div className={styles.layout}>
      <h1>Watch Now</h1>

      {/* searchbar */}
      <div className={styles.searchBar}>
        <input type="text" className={styles.search} placeholder="Search" />
        <div className={styles.searchBtn}>
          <Image width={25} height={25} src="/icons/search.svg"></Image>
        </div>
      </div>
      <div className={styles.searchBarBtn}>
        <Image width={25} height={25} src="/icons/search.svg"></Image>
      </div>

      <div className={styles.circle}></div>
    </div>
  );
};

export default NavBar;

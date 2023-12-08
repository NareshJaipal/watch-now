import { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";

const NavBar = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [column, setColumn] = useState(false);
  const [showMenuItem, setShowMenuItem] = useState(false);
  const [showSearchBar, setSearchBar] = useState(false);
  const [navBarOpen, setNavBarOpen] = useState(false);

  const handleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen);
  };

  const handleMenuBtn = () => {
    setColumn(!column);
    setShowMenuItem(!showMenuItem);
    setSearchBar(!showSearchBar);
    setNavBarOpen(!navBarOpen);
  };

  return (
    <nav className={`${styles.navBar} ${navBarOpen ? styles.navBarOpen : ""}`}>
      <div className={`${styles.left} ${column ? styles.column : ""}`}>
        <div className={styles.logoMenu}>
          <a href="/" className={styles.title}>
            <span className={styles.firstTitle}>Watch</span>
            <span className={styles.secondTitle}>Now</span>
          </a>
          <div className={styles.menuBtn} onClick={handleMenuBtn}>
            <Image src="/icons/menu.svg" width="25" height="25" alt="Menu" />
          </div>
        </div>
        <ul
          className={`${styles.menu} ${
            showMenuItem ? styles.showMenuItem : ""
          }`}
        >
          <li className={styles.menuItem}>
            <a href="#">Home</a>
          </li>
          <li className={styles.menuItem}>
            <a href="#">Favorite</a>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <div
          className={`${styles.searchBar} ${
            searchBarOpen ? styles.searchBarOpen : ""
          } ${showSearchBar ? styles.showSearchBar : ""}`}
        >
          <input
            className={styles.searchInput}
            type="text"
            name="search"
            placeholder="Search here..."
          />
          <span className={styles.search} onClick={handleSearchBar}>
            <Image
              src="/icons/search.svg"
              width="25"
              height="25"
              alt="Search"
            />
          </span>
        </div>
        {/* <div className={styles.profile}></div> */}
      </div>
    </nav>
  );
};

export default NavBar;

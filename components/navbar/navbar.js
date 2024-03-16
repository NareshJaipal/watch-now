import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { magic } from "../../lib/magic-client";

import styles from "./navbar.module.css";

const NavBar = (props) => {
  const { logo = false } = props;
  const user_profile = "/static/user_profile_icon.avif";

  const [showDropdown, setShowDropdown] = useState("");
  const [dropDownOn, setDropDownOn] = useState(true);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [show, setshow] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);
  const [hideNavItems, setHideNavItems] = useState(false);
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [didToken, setDidToken] = useState("");

  const router = useRouter();

  const getUserData = async () => {
    try {
      const userInfo = await magic.user.getInfo();
      const token = await magic.user.getIdToken();
      setDidToken(token);

      setEmail(userInfo.email);
    } catch (e) {
      console.error("Error in Meta Data: ", e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSearchBar = (e) => {
    e.preventDefault();

    if (searchBarOpen) {
      if (searchQuery !== "") {
        router.push(`/searchResult/${searchQuery}`);
      }
    } else {
      setSearchBarOpen(true);
      setshow(true);
      setHideLogo(true);
      setHideNavItems(true);
    }
  };

  const handleOnChangeSearchQuery = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleSearchClose = (e) => {
    e.preventDefault();
    setSearchBarOpen(false);
    setshow(true);
    setHideLogo(false);
    setHideNavItems(false);
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(true);
    setDropDownOn(true);
  };

  const handleOffDropDown = (e) => {
    e.preventDefault();
    setTimeout(function () {
      setShowDropdown(false);
    }, 200);
    setDropDownOn(false);
  };

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const handleHomePage = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleFavoritePage = (e) => {
    e.preventDefault();
    router.push("/favorite");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link
          className={`${styles.logoLink} ${hideLogo ? styles.hideLogo : ""}`}
          href="/"
        >
          {logo ? (
            <div className={styles.logoWrapper}>
              <Image
                className={styles.logo}
                src={"/static/logo.png"}
                width="115"
                height="60"
                alt="Logo"
                priority="false"
              />
            </div>
          ) : (
            <div onClick={handleGoBack} className={styles.backBtn}>
              ←
            </div>
          )}
        </Link>

        <ul
          className={`${styles.navItems} ${
            hideNavItems ? styles.hideNavItems : ""
          }`}
        >
          <li className={styles.navItem} onClick={handleHomePage}>
            <Image
              className={styles.navItemIcon}
              src={"/static/icons/home.svg"}
              width={25}
              height={25}
              alt="Home Icon"
            />
            <span className={styles.navItemName}>Home</span>
          </li>
          <li className={styles.navItem} onClick={handleFavoritePage}>
            <Image
              className={styles.navItemIcon}
              src={"/static/icons/favorite.svg"}
              width={25}
              height={25}
              alt="Favorite Icon"
            />
            <span className={styles.navItemName}>Favorite</span>
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div className={styles.searchBarWrapper}>
            <div
              className={`${styles.searchBar} ${
                searchBarOpen ? styles.searchBarOpen : ""
              } `}
            >
              <span className={styles.searchClose} onClick={handleSearchClose}>
                <Image
                  src="/static/icons/close.svg"
                  width="25"
                  height="25"
                  alt="Search Close"
                />
              </span>
              <input
                className={`${styles.searchInput} ${
                  show ? styles.show : styles.hide
                }`}
                type="text"
                name="search"
                placeholder="Search here..."
                onChange={handleOnChangeSearchQuery}
              />
              <span className={styles.search} onClick={handleSearchBar}>
                <Image
                  src="/static/icons/search.svg"
                  width="25"
                  height="25"
                  alt="Search"
                />
              </span>
            </div>
          </div>
          <div className={styles.userProfileWrapper}>
            <Image
              className={styles.userProfile}
              src={user_profile}
              alt="User"
              width={45}
              height={45}
              onClick={handleShowDropdown}
            />
          </div>
        </nav>
      </div>
      <div className={styles.navDropdownWrapper}>
        {showDropdown && (
          <div
            className={`${styles.navDropdown} ${
              dropDownOn ? styles.dropDownOn : styles.dropDownOff
            }`}
          >
            <div className={styles.profileWrapper}>
              <div className={styles.closeBtnWrapper}>
                <Image
                  className={styles.closeBtn}
                  src={"/static/icons/close.svg"}
                  width={28}
                  height={28}
                  alt="cross btn"
                  onClick={handleOffDropDown}
                />
              </div>
              <Image
                className={styles.profileImage}
                src={user_profile}
                width={200}
                height={200}
                alt="Profile Pic"
              />
              <div className={styles.userName}>@user_name</div>
              <div className={styles.emailAddress}>{email}</div>
            </div>
            <div className={styles.signOutWrapper}>
              <hr />
              <a className={styles.linkName} onClick={handleSignout}>
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { magic } from "../../lib/magic-client";

import styles from "./navbar.module.css";

import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

const NavBar = (props) => {
  const { logo = false } = props;

  const { userInfo } = useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState("");
  const [dropDownOn, setDropDownOn] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [show, setshow] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);
  const [hideNavItems, setHideNavItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [didToken, setDidToken] = useState("");

  const [userProfile, setUserProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("user name");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("/static/user_profile_icon.avif");

  const [imageError, setImageError] = useState(
    "Image size must be less then 400KB"
  );
  const [nameError, setNameError] = useState("");

  if (userInfo) {
    if (
      image !== userInfo.image ||
      name !== userInfo.name ||
      phone !== userInfo.phone
    ) {
      console.log(userInfo);
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
      setImage(userInfo.image);
    }
  }

  const router = useRouter();

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const userInfo = await magic.user.getInfo();
      const token = await magic.user.getIdToken();
      setDidToken(token);
      setEmail(userInfo.email);
      setIsLoading(false);
    } catch (e) {
      console.error("Error in Meta Data: ", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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

  const handleEditProfile = (e) => {
    e.preventDefault();

    setEditProfile(true);

    setTimeout(function () {
      setShowDropdown(false);
    }, 200);
    setDropDownOn(false);
  };

  const handleEditProfileClose = (e) => {
    e.preventDefault();

    setEditProfile(false);
  };

  const handleEditProfileCancelBtn = (e) => {
    e.preventDefault();

    setEditProfile(false);
  };

  const handleEditProfileSaveBtn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (name === "" || name === "user name" || email === "") {
      setNameError("Enter a valid name");
      setIsLoading(false);
    } else {
      const response = await fetch("/api/userInfo", {
        method: "POST",
        body: JSON.stringify({
          email,
          image,
          name,
          phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        console.log({ response });
        setIsLoading(false);
        alert("Profile updated successfully");
      } else {
        setIsLoading(false);
        alert("Profile updated failed try again");
      }
    }
  };

  function handleOnChangeUploadImage(e) {
    setIsLoading(true);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size === 409600) {
        console.log(file.size);

        const reader = new FileReader();
        reader.onloadend = function () {
          setImage(reader.result);
          setIsLoading(false);
        };

        reader.readAsDataURL(file);
      } else {
        setImageError("Image size over 400KB");
        alert("Image size over 400KB");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setImageError("Something went wrong please try again");
    }
  }

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
              src={image}
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
                src={image}
                width={200}
                height={200}
                alt="Profile Pic"
              />
              <div className={styles.userName}>{name}</div>
              <div className={styles.userName}>{phone}</div>
              <div className={styles.emailAddress}>{email}</div>
            </div>
            <div className={styles.signOutWrapper}>
              <a className={styles.linkNameEdit} onClick={handleEditProfile}>
                Edit your profile
              </a>
              <hr />
              <a className={styles.linkName} onClick={handleSignout}>
                Sign out
              </a>
            </div>
          </div>
        )}
        {editProfile && (
          <div className={styles.editProfileWrapper}>
            {isLoading && (
              <div className={styles.loaderWrapper}>
                <div className={styles.loader}></div>
              </div>
            )}
            <div className={styles.editProfile}>
              <div className={styles.closeEditProfileBtnWrapper}>
                Edit Profile
                <Image
                  className={styles.closeBtn}
                  src={"/static/icons/close.svg"}
                  width={28}
                  height={28}
                  alt="cross btn"
                  onClick={handleEditProfileClose}
                />
              </div>
              {imageError === "Image size must be less then 400KB" ? (
                <label className={styles.errorBlack}>{imageError}</label>
              ) : (
                <label className={styles.error}>{imageError}</label>
              )}
              <div className={styles.editImageWrapper}>
                <Image
                  className={styles.userProfile}
                  src={image}
                  width={130}
                  height={130}
                  alt="Profile Pic"
                />

                <label className={styles.uploadImageLabel} htmlFor="avatar">
                  Upload Image
                </label>

                <input
                  className={styles.uploadImageInput}
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleOnChangeUploadImage}
                />
              </div>
              <div className={styles.editInfoWrapper}>
                <label className={styles.label} htmlFor="name">
                  Name
                </label>
                <label className={styles.error}>{nameError}</label>
                <input
                  className={styles.inputField}
                  placeholder="Enter your name"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label className={styles.label} htmlFor="phone">
                  Phone No.
                </label>
                <input
                  className={styles.inputField}
                  placeholder="+92 3XX XXXXXXX"
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  className={styles.inputField}
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  value={email}
                  disabled
                />
              </div>
              <div className={styles.buttonsWrapper}>
                <button
                  onClick={handleEditProfileCancelBtn}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditProfileSaveBtn}
                  className={styles.saveBtn}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

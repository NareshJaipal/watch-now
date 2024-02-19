import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";

import styles from "../styles/login.module.css";
import { useRouter } from "next/router";

const Login = () => {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(true);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete),
        router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    // console.log("event", e.target.value);
    const email = e.target.value;
    setEmail(email);
  };

  const handleSignInWithEmail = async (e) => {
    console.log("hi button");
    e.preventDefault();
    if (email) {
      // log in a user by their email
      try {
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({ email });
        console.log({ didToken });
        if (didToken) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          console.log({ response });

          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            console.log({ loggedInResponse });
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg("Something went wrong logging in");
          }
        }
      } catch (error) {
        setIsLoading(false);
        // Handle errors if required!
        console.error("Soething went wrong loging in", error);
      }
    } else {
      setIsLoading(false);
      setUserMsg("Email address can't be empty");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a href="/" className={styles.logoLink}>
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
          </a>
        </div>
      </header>
      <div className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signInHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.inputEmail}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          {isLoading ? (
            <button className={styles.loadingButton}>Loading...</button>
          ) : (
            <button
              onClick={handleSignInWithEmail}
              className={styles.signInButton}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

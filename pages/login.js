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
      setIsLoading(false);
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
    const email = e.target.value;
    setEmail(email);
  };

  const handleSignInWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          const response = await fetch("/api/login/", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg("Something went wrong logging in");
          }
        }
      } catch (error) {
        setIsLoading(false);
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
        <title>Sign In - Watch Now</title>
        <meta
          name="description"
          content="Sign in to Watch Now account to access your favorite movies and shows on Watch Now by Naresh Jaipal"
        />
      </Head>
      <main>
        <header className={styles.header}>
          <a href="/" className={styles.logoLink}>
            <Image
              className={styles.logo}
              src={"/static/logo.png"}
              width="115"
              height="60"
              alt="Logo"
              priority="false"
            />
          </a>
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
      </main>
    </div>
  );
};

export default Login;

import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import { useRouter } from "next/router";
import Loading from "../components/loading/loading";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // const routeToPage = async () => {
  //   try {
  //     const isLoggedIn = await magic.user.isLoggedIn();
  //     if (isLoggedIn) {
  //       // route to dashboard
  //       router.push("/");
  //     } else {
  //       // route to login page
  //       router.push("/login");
  //     }
  //   } catch (error) {
  //     console.error("Something went wrong in routging:", error);
  //   }
  // };

  // useEffect(() => {
  //   routeToPage();
  // }, []);

  // useEffect(() => {
  //   const handleComplete = () => {
  //     setIsLoading(false);
  //   };

  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleComplete),
  //       router.events.off("routeChangeError", handleComplete);
  //   };
  // }, [router]);

  // return isLoading ? <Loading /> : <Component {...pageProps} />;
  return <Component {...pageProps} />;
}

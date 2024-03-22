import "@/styles/globals.css";
import UserProvider from "../contexts/userContext";

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default App;

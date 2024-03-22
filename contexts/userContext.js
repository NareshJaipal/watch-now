import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/userInfo", {
          method: "GET",
        });
        const data = await response.json();

        if (data.findUser.length > 0) {
          setUserInfo(data.findUser[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

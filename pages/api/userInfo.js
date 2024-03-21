import { createUserInfo, findUserInfo, updateInfo } from "@/lib/db/hasura";
import { verifyToken } from "@/lib/utils";

export default async function userInfo(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      const userId = await verifyToken(token);

      const findUser = await findUserInfo(token, userId);
      const doesUserExist = (await findUser?.length) > 0;

      if (req.method === "POST") {
        const { email = "", image = "", name = "", phone = "" } = req.body;
        if (doesUserExist) {
          const response = await updateInfo(token, {
            image,
            name,
            phone,
            userId,
          });

          res.status(200).json({
            done: true,
            userId,
            do: "Update User Information",
            response,
          });
        } else {
          const response = await createUserInfo(token, {
            email,
            image,
            name,
            phone,
            userId,
          });

          res.status(200).json({
            done: true,
            userId,
            path: "Create User Information",
            response,
          });
        }
      } else {
        if (doesUserExist) {
          res.status(200).json({
            done: true,
            userId,
            path: "Fetching user Info",
            findUser,
          });
        } else {
          res.status(200).json({
            done: true,
            userId,
            path: "If Your Not Found",
            findUser,
          });
        }
      }
    } else {
      res.status(403).json({ message: "cookies does not exist" });
    }
  } catch (err) {
    res.status(500).json({ done: false, error: err.message });
  }
}

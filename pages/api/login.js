import { isNewUser, createNewUser } from "../../lib/db/hasura";
import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";
import { setTokenCookie } from "../../lib/cookie";

export default async function (req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : "";

      const metaData = await magicAdmin.users.getMetadataByToken(didToken);
      const token = jwt.sign(
        {
          ...metaData,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metaData.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );

      const isNewUserQuery = await isNewUser(token, metaData.issuer);

      isNewUserQuery && (await createNewUser(token, metaData));

      const cookie = setTokenCookie(token, res);

      res.send({ done: true });
    } catch (error) {
      console.error("something went wrong in logging in", error);
      res
        .status(500)
        .send({ message: `Sometshing went wrong in logging in, ${error}` });
    }
  } else {
    res.send({ message: "method is not POST" });
  }
}

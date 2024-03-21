import {
  updateStats,
  createNewStats,
  findVideoIdByUser,
} from "@/lib/db/hasura";
import { verifyToken } from "../../lib/utils";

export default async function stats(req, res) {
  try {
    const token = req.cookies.token;
    const inputParams = req.method === "POST" ? req.body : req.query;
    const { videoId } = inputParams;

    if (!token) {
      res.status(403).send({ message: "cookie dose not exist" });
    } else {
      const userId = await verifyToken(token);
      const findVideo = await findVideoIdByUser(token, userId, videoId);
      const doesStatsExist = findVideo?.length > 0;

      if (req.method === "POST") {
        const { favorited = 0, watched = false } = req.body;
        if (doesStatsExist) {
          const response = await updateStats(token, {
            userId,
            videoId,
            favorited,
            watched,
          });
          res.send({ done: true, decodeToken, doesStatsExist, response });
        } else {
          const response = await createNewStats(token, {
            userId,
            videoId,
            favorited,
          });
          res.send({ done: true, decodeToken, doesStatsExist, response });
        }
      } else {
        if (doesStatsExist) {
          const response = await findVideo;
          res.send(response);
        } else {
          res.send({ user: null, msg: "video not found" });
        }
      }
    }
  } catch (error) {
    console.error({ error: "error occured /stats", error });
    res.status(500).send({ done: false, error: error.message });
  }
}

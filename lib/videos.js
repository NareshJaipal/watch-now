import VideosData from "../data/videos.json";

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  );

  return await response.json();
};

export const getCommonVideos = async (url) => {
  try {
    // const isDev = process.env.DEVELOPMENT;
    const isDev = false;
    const data = isDev ? VideosData : await fetchVideos(url);
    if (data?.error) {
      console.log("Error in Youtube API: ", data.error);
      return [];
    }

    return data.items.map((item) => {
      const id = item.id?.videoId || item.id;
      const viewCount = item?.statistics?.viewCount || "0";
      return {
        title: item.snippet.title,
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelName: item.snippet.channelTitle,
        viewCount,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library ", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};

export const getVideoDetailsById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};

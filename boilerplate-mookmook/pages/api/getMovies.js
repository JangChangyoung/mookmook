import axios from "axios";

const ID_KEY = "yPwqEQd6dulKpOaBfVU_";
const SECRET_KEY = "TH0fEpgJNv";

export default async (req, res) => {
  const { keyword } = req.query;

  try {
    if (!keyword || keyword.length === 0) throw new Error("no content");

    const data = await axios.get(
      `https://openapi.naver.com/v1/search/movie.json?query=${encodeURIComponent(
        keyword
      )}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,DELETE,OPTIONS",
          "Access-Control-ALlow-Headers": "Origin,Context-Type,X-Auth-Token",
          "X-Naver-Client-Id": ID_KEY,
          "X-Naver-Client-Secret": SECRET_KEY,
        },
      }
    );
    res.status(200).json({
      success: true,
      data: data.data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: "Bad Request" });
  }
};

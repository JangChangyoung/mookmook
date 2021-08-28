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
      )}&display=100&genre=1&genre=2&genre=3&genre=4&genre=5&genre=6&genre=7&genre=8&genre=9&genre=10&genre=11&genre=12&genre=13&genre=14&genre=15&genre=16&genre=17&genre=18&genre=19&genre=20&genre=22&genre=23&genre=24&genre=25&genre=26&genre=27&genre=28`,
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

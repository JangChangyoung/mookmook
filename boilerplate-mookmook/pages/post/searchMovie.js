/* eslint-disable react/button-has-type */
import React from "react";
import axios from "axios";

const ID_KEY = "yPwqEQd6dulKpOaBfVU_";
const SECRET_KEY = "TH0fEpgJNv";

class SearchMovie extends React.Component {
  constructor(props) {
    super(props);
  }

  getMovie = async function (search) {
    // const MOVIE_URL = 'https://openapi.naver.com/v1/search/movie.json';
    const MOVIE_URL = "/v1/search/movie.json";

    try {
      if (search === "") {
        // 처리
      } else {
        const {
          data: { movies },
        } = await axios.get(MOVIE_URL, {
          params: {
            query: "인터스텔라",
            display: 20,
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,DELETE,OPTIONS",
            "Access-Control-ALlow-Headers": "Origin,Context-Type,X-Auth-Token",
            "X-Naver-Client-Id": ID_KEY,
            "X-Naver-Client-Secret": SECRET_KEY,
          },
        });
        console.log(movies);
      }
    } catch (err) {
      return console.error(err);
    }
  };

  render() {
    return (
      // <div>search Movie</div>
      <button onClick={this.getMovie}>영화 검색</button>
    );
  }
}

export default SearchMovie;

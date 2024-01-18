import React, { useEffect, useState } from "react";
import "./css/home/home.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
function Home() {
  let [wineList, setWineList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/main/wine")
      .then((response) => {
        console.log(response.data);
        setWineList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(wineList);
  }, []);
  return (
    <div className="container">
      <div className="tag_container">
        <div className="search">
          <input className="search-txt" type="text" placeholder="Search..." />
          <button className="search-btn">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="1.5x"
              className="search-icon"
            />
          </button>
        </div>
        <div className="tag_wine_container">
          <p>와인 종류</p>
          <ul>
            <li>레드</li>
            <li>화이트</li>
            <li>레드</li>
            <li>화이트</li>
            <li>레드</li>
          </ul>
        </div>
        <div className="tag_wine_container">
          <p>아로마 향</p>
          <ul>
            <li>사과</li>
            <li>딸기</li>
            <li>자몽</li>
            <li>레몬</li>
            <li>캐넛</li>
            <li>파인애플</li>
          </ul>
        </div>
      </div>
      <div className="wine_container">
        <ul>
          {wineList.map(function (wine, i) {
            return (
              <li key={i}>
                <div className="wine_list_card">
                  <div className="wine_names">
                    <span className="wine_name">{wine.wine_name}</span>
                    <hr></hr>
                    <span className="wine_name_en">{wine.wine_name_en}</span>
                  </div>

                  <img src={wine.wine_image} />

                  <div className="wine_info">
                    <span>
                      <b>{wine.wine_info[0]}</b> | {wine.wine_info[1]} |{" "}
                      {wine.wine_info[2]}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;

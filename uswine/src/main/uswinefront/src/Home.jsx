import React, { useEffect, useState } from "react";
import "./css/home/home.css";
import {
  faMagnifyingGlass,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import AuthApi from "./AuthApi";
function Home() {
  let navigate = useNavigate();

  let [wineList, setWineList] = useState([]);

  let [searchWine, setSearchWine] = useState("");
  let [tagWine, setTagWine] = useState([]);
  let [tagWineAroma, setTagWineAroma] = useState([]);

  let [totalPage, setTotalPage] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let [totalWine, setTotalWine] = useState("");

  let [searchBtn, setSearchBtn] = useState(0);

  const wineTagList = [
    "레드",
    "화이트",
    "로제",
    "스파클링",
    "주정강화",
    "고도주",
    "맥주",
    "우리술",
    "사케/청주",
  ];

  const wineAromaList = [
    "오크",
    "바닐라",
    "삼나무",
    "피어",
    "모카",
    '흑연',
    '레몬',
    '사과',
    '라임',
    '파인애플',
    '감귤',
    '오렌지',
    '체리',
    '블랙베리',
    '딸기',
    '블루베리',
    '라스베리',
    '산딸기',
    '망고',
    '배',
    '포도',
    '샤인마스카트',
    '케리',
    '블랙커런트',
    '라즈베리',
    '자몽',
    '자두',
    '키위',
  ];
  function prevAnimation() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      var wineContainer = document.querySelector(".wine_list_current");
      var PrevwineContainer = document.querySelector(".wine_list_prev");
      var NextwineContainer = document.querySelector(".wine_list_next");
      wineContainer.classList.remove("right");
      PrevwineContainer.classList.remove("right");
      NextwineContainer.classList.remove("right");

      wineContainer.classList.add("slide_animation");
      PrevwineContainer.classList.add("slide_animation");
      NextwineContainer.classList.add("slide_animation");

      wineContainer.classList.add("left");
      PrevwineContainer.classList.add("left");
      NextwineContainer.classList.add("left");

      setTimeout(() => {
        wineContainer.classList.remove("slide_animation");
        PrevwineContainer.classList.remove("slide_animation");
        NextwineContainer.classList.remove("slide_animation");

        wineContainer.classList.remove("left");
        PrevwineContainer.classList.remove("left");
        NextwineContainer.classList.remove("left");
      }, 500);
    }
  }
  function nextAnimation() {
    setCurrentPage(parseInt(currentPage, 10) + 1);
    var wineContainer = document.querySelector(".wine_list_current");
    var PrevwineContainer = document.querySelector(".wine_list_prev");
    var NextwineContainer = document.querySelector(".wine_list_next");

    wineContainer.classList.remove("left");
    PrevwineContainer.classList.remove("left");
    NextwineContainer.classList.remove("left");

    wineContainer.classList.add("slide_animation");
    PrevwineContainer.classList.add("slide_animation");
    NextwineContainer.classList.add("slide_animation");

    wineContainer.classList.add("right");
    PrevwineContainer.classList.add("right");
    NextwineContainer.classList.add("right");

    setTimeout(() => {
      wineContainer.classList.remove("slide_animation");
      PrevwineContainer.classList.remove("slide_animation");
      NextwineContainer.classList.remove("slide_animation");

      wineContainer.classList.remove("right");
      PrevwineContainer.classList.remove("right");
      NextwineContainer.classList.remove("right");
    }, 500);
  }

  function tagClick(e) {
    const selectTag = e.target.textContent;
    if (e.target.classList.contains("selectTag")) {
      e.target.classList.remove("selectTag");
      setTagWine((prevTags) => prevTags.filter((tag) => tag !== selectTag));
    } else {
      e.target.classList.add("selectTag");
      setTagWine([...tagWine, selectTag]);
    }
  }

  function tagAromaClick(e) {
    const selectTag = e.target.textContent;
    if (e.target.classList.contains("selectTag")) {
      e.target.classList.remove("selectTag");
      setTagWineAroma((prevTags) =>
        prevTags.filter((tag) => tag !== selectTag)
      );
    } else {
      e.target.classList.add("selectTag");
      setTagWineAroma([...tagWineAroma, selectTag]);
    }
  }

  function wineDetailsNav(Id) {
    navigate(`wine/${Id}`);
  }
  useEffect(() => {
    if (searchBtn > 0) {
      AuthApi("/api/main/wine", {
        page: currentPage - 1,
        searchWine: searchWine,
        tagWine: tagWine,
        tagWineAroma: tagWineAroma,
      }).then((data) => {
        console.log(data);
        if (data.totalPage == 0) {
          alert("검색결과가 없습니다.");
        } else {
          setWineList(data.wineList);
          setTotalWine(data.totalPage);
          setTotalPage(Math.ceil(data.totalPage / 20));
        }
      });
    } else {
      AuthApi("/api/main/wine", {
        page: currentPage - 1,
      }).then((data) => {
        setWineList(data.wineList);
        setTotalWine(data.totalPage);
        setTotalPage(Math.ceil(data.totalPage / 20));
      });
    }
  }, [currentPage, searchBtn]);

  return (
    <div className="container">
      <div className="tag_container">
        <div className="search">
          <input
            className="search-txt"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchWine(e.target.value)}
          />
          <button
            className="search-btn"
            onClick={() => {
              setCurrentPage(1);
              setSearchBtn(searchBtn + 1);
            }}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="1x"
              className="search-icon"
            />
          </button>
        </div>
        <div className="tag_wine_container">
          <span>와인 종류</span>
          <ul>
            {wineTagList.map(function (wine, i) {
              return (
                <li key={i} onClick={tagClick}>
                  {wine}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="tag_wine_container">
          <span>아로마</span>
          <ul>
            {wineAromaList.map(function (aroma, i) {
              return (
                <li key={i} onClick={tagAromaClick}>
                  {aroma}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="wine_container">
        <div>
          <div className="total_wine_count">( {totalWine} 병 )</div>
          <div className="wine_view">
            <ul className="wine_list_prev">
              {wineList.map(function (wine, i) {
                return (
                  <li key={i}>
                    <div className="wine_list_card">
                      <div className="wine_names">
                        <span className="wine_name">{wine.wine_name}</span>
                        <hr></hr>
                        <span className="wine_name_en">
                          {wine.wine_name_en}
                        </span>
                      </div>

                      <img src={wine.wine_image} alt="" />

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
          <div className="wine_view">
            <ul className="wine_list_current">
              {wineList.map(function (wine, i) {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      wineDetailsNav(wine.id);
                    }}
                  >
                    <div className="wine_list_card">
                      <div className="wine_names">
                        <span className="wine_name">{wine.wine_name}</span>
                        <hr></hr>
                        <span className="wine_name_en">
                          {wine.wine_name_en}
                        </span>
                      </div>

                      <img src={wine.wine_image} alt="" />

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
          <div className="wine_view">
            <ul className="wine_list_next">
              {wineList.map(function (wine, i) {
                return (
                  <li key={i}>
                    <div className="wine_list_card">
                      <div className="wine_names">
                        <span className="wine_name">{wine.wine_name}</span>
                        <hr></hr>
                        <span className="wine_name_en">
                          {wine.wine_name_en}
                        </span>
                      </div>

                      <img src={wine.wine_image} alt="" />

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
      </div>
      <div className="page_controller">
        <div
          className="page_up"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <FontAwesomeIcon icon={faAngleUp} size="2x" opacity="0.5" />
        </div>
        <div className="prev_page" onClick={prevAnimation}>
          <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
        </div>
        <div className="page_box">
          <input
            className="page_input"
            type="number"
            defaultValue={currentPage}
            key={currentPage}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const page = e.target.value;
                if (page >= 1 && page <= totalPage) {
                  document
                    .querySelector(".page_box")
                    .classList.remove("error_page");
                  document
                    .querySelector(".page_input")
                    .classList.remove("error_page");
                  setCurrentPage(page);
                } else {
                  document
                    .querySelector(".page_box")
                    .classList.add("error_page");
                  document
                    .querySelector(".page_input")
                    .classList.add("error_page");
                  alert("없는 페이지 입니다.");
                }
              }
            }}
          />
          &nbsp;/ &nbsp;{totalPage}
        </div>
        <div className="next_page" onClick={nextAnimation}>
          <FontAwesomeIcon icon={faAngleRight} size="2x" opacity="0.5" />
        </div>
      </div>
    </div>
  );
}

export default Home;

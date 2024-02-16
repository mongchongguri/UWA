import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/home/home.css";
import "../../../css/home/OnSaleWine.css";
import {
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import { useNavigate } from "react-router-dom";

function OnSaleWine() {
  let navigate = useNavigate();
  let [onSaleWine, setOnSaleWine] = useState([]);

  let [totalPage, setTotalPage] = useState();
  let [totalWine, setTotalWine] = useState();
  let [currentPage, setCurrentPage] = useState(1);

  let [searchWine, setSearchWine] = useState("");
  let [searchBtn, setSearchBtn] = useState(0);

  useEffect(() => {
    AuthApi("/api/onsale/list", {
      wineName: searchWine,
    }).then((data) => {
      console.log(data);
      setTotalPage(data.totalPages);
      setTotalWine(data.totalElements);
      setOnSaleWine(data.content);
    });
  }, [searchBtn]);

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
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }
  function nextAnimation() {
    if (currentPage < totalPage) {
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
    } else {
      alert("마지막 페이지 입니다.");
    }
  }

  return (
    <div className="container">
      <div className="tag_container">
        <div className="search">
          <input
            className="search-txt"
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearchWine(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => setSearchBtn(searchBtn + 1)}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="1x"
              className="search-icon"
            />
          </button>
        </div>
      </div>
      <div className="wine_container">
        <div>
          <div className="total_wine_count">( {totalWine} 병 )</div>
          <div className="wine_view">
            <ul className="wine_list_prev">
              {onSaleWine.map(function (wine, i) {
                return (
                  <li key={i}>
                    <div className="wine_list_card">
                      <div className="wine_names">
                        <span className="wine_name">{wine.wineName}</span>
                        <hr></hr>
                        <span className="wine_name_en">{wine.wineNameEn}</span>
                      </div>

                      <img src={wine.wineImageURL} alt="" />

                      <div className="wine_info">
                        <span>
                          <b>{wine.wineType}</b> | {wine.wineRegion}
                        </span>
                      </div>
                      <div className="wine_seller_info">
                        <p>{wine.nickname}</p>
                        <p>{wine.sellMoney} 원</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="wine_view">
            <ul className="wine_list_current">
              {onSaleWine != null
                ? onSaleWine.map(function (wine, i) {
                    return (
                      <li
                        key={i}
                        onClick={() => navigate(`/onsale/${wine.mongoId}`)}
                      >
                        <div className="wine_list_card">
                          <div className="wine_names">
                            <span className="wine_name">{wine.wineName}</span>
                            <hr></hr>
                            <span className="wine_name_en">
                              {wine.wineNameEn}
                            </span>
                          </div>

                          <img src={wine.wineImageURL} alt="" />

                          <div className="wine_info">
                            <span>
                              <b>{wine.wineType}</b> | {wine.wineRegion}
                            </span>
                          </div>
                          <div className="wine_seller_info">
                            <p>{wine.nickname}</p>
                            <p>{wine.sellMoney} 원</p>
                          </div>
                        </div>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <div className="wine_view">
            <ul className="wine_list_next">
              {onSaleWine.map(function (wine, i) {
                return (
                  <li key={i}>
                    <div className="wine_list_card">
                      <div className="wine_names">
                        <span className="wine_name">{wine.wineName}</span>
                        <hr></hr>
                        <span className="wine_name_en">{wine.wineNameEn}</span>
                      </div>

                      <img src={wine.wineImageURL} alt="" />

                      <div className="wine_info">
                        <span>
                          <b>{wine.wineType}</b> | {wine.wineRegion}
                        </span>
                      </div>
                      <div className="wine_seller_info">
                        <p>{wine.nickname}</p>
                        <p>{wine.sellMoney} 원</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* 페이지 컨트롤러 */}
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
    </div>
  );
}

export default OnSaleWine;

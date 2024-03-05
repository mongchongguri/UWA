import {
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../../../AuthApi";

const AdminSellerWine = () => {
  let navigate = useNavigate();

  let [mongoWineList, setMongoWineList] = useState([]);
  let [mysqlWineList, setMysqlWineList] = useState([]);

  let [searchWine, setSearchWine] = useState("");

  let [totalPage, setTotalPage] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let [totalWine, setTotalWine] = useState("");

  let [searchBtn, setSearchBtn] = useState(0);

  function handlePrevPage(e) {
    if (currentPage > 1) {
      setCurrentPage(parseInt(currentPage) - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }
  function handleNextPage(e) {
    if (currentPage < totalPage) {
      setCurrentPage(parseInt(currentPage) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }

  useEffect(() => {
    AuthApi("/api/admin/management/wine/sellerwine", {
      page: currentPage - 1,
      searchWine: searchWine,
    })
      .then((res) => {
        setMongoWineList(res.mongo);
        setMysqlWineList(res.mysql);
        setTotalPage(res.totalpage + 1);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  return (
    <div id="management_wine_container">
      <div id="management_wine_content">
        <h1>Seller판매 와인관리</h1>
        <div id="switch_seller_btn">
          <button
            onClick={() => {
              navigate("/admin/management/wine");
            }}
          >
            MD판매
          </button>
          <button
            onClick={() => {
              navigate("/admin/management/sellerwine");
            }}
          >
            Seller판매
          </button>
        </div>
        <div className="admin_wine_tag_container">
          <div className="admin_wine_search">
            <input
              className="admin_wine_search-txt"
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
        </div>
        <div className="admin_wineList_container">
          <div>
            <div id="wine_view">
              <ul
                id="wine_list_next"
                style={{
                  display: "flex",
                }}
              >
                {mongoWineList.map(function (wine, i) {
                  return (
                    <li key={i}>
                      <Link
                        to={`/admin/management/sellerwinedetail/${mysqlWineList[i].id}`}
                        id="admin_wine_link"
                      >
                        <div
                          className="admin_wine_list_card"
                          style={{
                            width: "230px",
                            height: "289px",
                          }}
                        >
                          <div className="wine_names">
                            <span className="wine_name">{wine.wineName}</span>
                            <hr></hr>
                            <span className="wine_name_en">
                              {wine.wineNameEn}
                            </span>
                          </div>

                          <img
                            src={wine.wineImageURL}
                            alt=""
                            style={{
                              width: "80px",
                              height: "120px",
                              margin: "0",
                            }}
                          />

                          <div className="wine_info">
                            <span>
                              <b>{wine.wineType}</b>&nbsp;|&nbsp;
                              {wine.wineRegion}
                            </span>
                          </div>

                          <div className="wine_seller_info">
                            <div>{mysqlWineList[i].nickname}</div>
                            <div>
                              {mysqlWineList[i].stock == "0"
                                ? "품절"
                                : mysqlWineList[i].sellMoney.toLocaleString() +
                                  "원"}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div id="admin_wine_detail_Foot">
          <div className="admin_wine_page_controller">
            <div className="prev_page" onClick={handlePrevPage}>
              <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
            </div>

            <div className="admin_wine_page_box">
              <input
                className="page_input"
                type="number"
                defaultValue={currentPage}
                key={currentPage}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    const page = e.target.value;
                    if (page >= 1 && page <= 1014) {
                      document
                        .querySelector(".admin_wine_page_box")
                        .classList.remove("error_page");
                      document
                        .querySelector(".page_input")
                        .classList.remove("error_page");
                      setCurrentPage(page);
                    } else {
                      document
                        .querySelector(".admin_wine_page_box")
                        .classList.add("error_page");
                      document
                        .querySelector(".page_input")
                        .classList.add("error_page");
                    }
                  }
                }}
              />
              &nbsp;/ &nbsp;{totalPage}
            </div>
            <div className="next_page" onClick={handleNextPage}>
              <FontAwesomeIcon icon={faAngleRight} size="2x" opacity="0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSellerWine;

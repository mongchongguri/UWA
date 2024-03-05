import React, { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../../../css/admin/admin_chart/admin_alltradechart.css";
import DateFormat from "../../../function/DateFormat";

const AllTradeChart = () => {
  let [page, setPage] = useState(1);
  let [totalPage, setTotalPage] = useState(0);
  let [tradelist, setTradelist] = useState([]);

  function handlePrevPage(e) {
    if (page > 1) {
      setPage(parseInt(page) - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }
  function handleNextPage(e) {
    if (page < totalPage) {
      setPage(parseInt(page) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }

  useEffect(() => {
    AuthApi("/api/admin/chart/tradechart", {
      page: page - 1,
    })
      .then((res) => {
        setTradelist(res.tradeList);
        setTotalPage(res.totalPage + 1);
      })
      .catch((error) => console.error(error));
  }, [page]);

  return (
    <div id="tradeChart">
      <h5>전체 거래 현황</h5>
      <ul id="tradeTable">
        <li>
          <ul id="tableHeader">
            <li>거래번호</li>
            <li>와인이름</li>
            <li>판매금액</li>
            <li>판매시각</li>
            <li>판매자</li>
            <li>구매자</li>
            <li>판매재고</li>
            <li>총 판매금액</li>
          </ul>
        </li>
        {tradelist.map(function (trade, i) {
          return (
            <li key={i}>
              <ul>
                <li>{trade.id}</li>
                <li>{trade.wineName}</li>
                <li>
                  &#8361;{" "}
                  {trade.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </li>
                <li>{DateFormat(trade.timestamp)}</li>
                <li>{trade.sellername}</li>
                <li>{trade.username}</li>
                <li>{trade.stock}</li>
                <li>
                  &#8361;{" "}
                  {(trade.stock * trade.price)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
      <div
        className="admin_wine_page_controller"
        style={{ justifyContent: "center" }}
      >
        <div className="prev_page" onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
        </div>

        <div className="admin_wine_page_box">
          <input
            className="page_input"
            type="number"
            defaultValue={page}
            key={page}
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
                  setPage(page);
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
  );
};

export default AllTradeChart;

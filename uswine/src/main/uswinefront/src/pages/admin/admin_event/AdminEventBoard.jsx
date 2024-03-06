import React, { useEffect, useState } from "react";
import "../../../css/admin/admin_event/admin_event_board.css";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import AuthApi from "../../../AuthApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import EventDateFormat from "../../../function/EventDateFormat";

const AdminEventBoard = () => {
  const navigate = useNavigate();

  let page = 1;

  let [currentPage, setCurrentPage] = useState(page);
  let [totalPages, setTotalPages] = useState(1);

  let [eventList, setEventList] = useState([]);

  useEffect(() => {
    AuthApi("/api/admin/event/getEventList", {
      page: currentPage - 1,
    })
      .then((res) => {
        setEventList(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((error) => console.error(error));
  }, []);

  const goToEventCreatePage = () => {
    navigate("/admin/event/create");
  };

  function prevPageHandler() {
    if (currentPage > 1) {
      navigate(`/admin/event/${currentPage - 1}`);
      setCurrentPage(currentPage - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }

  function nextPageHandler() {
    if (currentPage < totalPages) {
      navigate(navigate(`/admin/event/${currentPage - 1}`));
      setCurrentPage(parseInt(currentPage, 10) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }

  return (
    <div id="event_board_container">
      <div id="event_board_contentBlock">
        <div id="event_board_titleBlock">
          <h1>이벤트 관리</h1>
        </div>
        <div id="create_event_btn">
          <button onClick={goToEventCreatePage}>이벤트 생성</button>
        </div>
        <div id="eventlist">
          <Table id="evetlist_table">
            <thead>
              <tr>
                <th></th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>마감일</th>
              </tr>
            </thead>
            <tbody>
              {eventList !== undefined
                ? eventList.map(function (board, i) {
                    const isClosedEvent =
                      new Date(board.endDate).getTime() < new Date().getTime();
                    return (
                      <tr key={i}>
                        {isClosedEvent ? (
                          <>
                            <td style={{ color: "#aaa" }}>마감된 이벤트</td>
                            <td>
                              <Link
                                to={`/admin/event/detail/${board.id}`}
                                style={{ color: "#aaa" }}
                              >
                                {board.title}
                              </Link>
                            </td>
                            <td style={{ color: "#aaa" }}>{board.nickname}</td>
                            <td style={{ color: "#aaa" }}>
                              {EventDateFormat(board.writeDate)}
                            </td>
                            <td style={{ color: "#aaa" }}>
                              {EventDateFormat(board.endDate)}
                            </td>
                          </>
                        ) : (
                          <>
                            <td>진행중인 이벤트</td>
                            <td>
                              <Link to={`/admin/event/detail/${board.id}`}>
                                {board.title}
                              </Link>
                            </td>
                            <td>{board.nickname}</td>
                            <td>{EventDateFormat(board.writeDate)}</td>
                            <td>{EventDateFormat(board.endDate)}</td>
                          </>
                        )}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </div>
        <div id="event_page_btn">
          <div className="prev_page" onClick={prevPageHandler}>
            <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
          </div>
          <input
            className="page_input"
            type="number"
            defaultValue={currentPage}
            key={currentPage}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const page = e.target.value;
                if (page >= 1 && page <= totalPages) {
                  document
                    .querySelector(".page_box")
                    .classList.remove("error_page");
                  document
                    .querySelector(".page_input")
                    .classList.remove("error_page");
                  navigate(`/event/${page}/`);
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
          /&nbsp;&nbsp;&nbsp;&nbsp;{totalPages}
          <div className="next_page" onClick={nextPageHandler}>
            <FontAwesomeIcon icon={faAngleRight} size="2x" opacity="0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventBoard;

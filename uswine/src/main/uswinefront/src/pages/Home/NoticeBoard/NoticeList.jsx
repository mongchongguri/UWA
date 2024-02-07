import { Outlet, useNavigate, useParams } from "react-router-dom";
import "../../../css/home/NoticeBoard.css";
import AuthApi from "../../../AuthApi";
import { useEffect, useState } from "react";
import DateFormat from "../../../function/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

function UserNotice() {
  let navigate = useNavigate();
  let { page } = useParams();

  let [currentPage, setCurrentPage] = useState(page);
  let [totalPages, setTotalPages] = useState(1);
  let [boardCount, setBoardCount] = useState();

  let [initBoardList, setInitBoardList] = useState([]);
  let [noticeBoardList, setNoticeBoardList] = useState([]);
  let [viewBoardCount, setViewBoardCount] = useState(10);




  useEffect(() => {
    AuthApi("/api/notice/noticelist", {
      currentPage: currentPage - 1,
      viewPageNum: viewBoardCount,

    }).then((data) => {
      setBoardCount(data.totalElements);
      setTotalPages(data.totalPages);
      setInitBoardList(data.content);
    });
  }, [currentPage, viewBoardCount]);

  useEffect(() => {
    async function fetchData() {
      let recommendList = [...initBoardList];
      const init = initBoardList.map(async (board, i) => {
        const comment = await AuthApi("/api/notice/noticeCountComment", {
          noticeIdx: board.id,
        });
        const recomment = await AuthApi("/api/notice/noticeCountRecomment", {
          noticeIdx: board.id,
        });
        console.log(comment,recomment)
        recommendList[i].comment = comment + recomment;
      });

      await Promise.all(init);
      setNoticeBoardList(recommendList);
    }
    fetchData();
  }, [initBoardList]);

  function prevPageHandler() {
    if (currentPage > 1) {
      navigate(`/notice/${currentPage - 1}`);
      setCurrentPage(currentPage - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }

  function nextPageHandler() {
    if (currentPage < totalPages) {
      navigate(
        `/notice/${parseInt(currentPage, 10) + 1}`
      );
      setCurrentPage(parseInt(currentPage, 10) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }

  return (
    <div className="notice_board_container">
      <div className="board_container">
        <p className="board_info_text">공지사항</p>
        <div className="board_setting_container">
          <div className="board_count">( {boardCount} 개 )</div>
          <div className="board_view_count_container">
            목록
            <select
              className="board_view_count"
              onChange={(e) => {
                setViewBoardCount(parseInt(e.target.value.match(/\d+/)[0], 10));
                navigate(`/notice/1`);
                setCurrentPage(1);
              }}
            >
              <option>10 개</option>
              <option>20 개</option>
              <option>30 개</option>
              <option>40 개</option>
              <option>50 개</option>
            </select>
          </div>
        </div>
        <ul className="board_list_container">
          <li>
            <ul className="board_info_container">
              <li className="board_info_title"></li>
              <li className="board_info_title" style={{ color: "#666" }}>
                제목
              </li>

              <li
                className="board_info_title"
                style={{ color: "#666", fontSize: "15px" }}
              >
                작성일
              </li>
            </ul>
          </li>
          <li>
            {noticeBoardList !== undefined
              ? noticeBoardList.map(function (board, i) {
                  return (
                    <ul className="board_info_container board_list" key={i}>
                      <li>{board.id}</li>
                      <li
                        onClick={() => {
                          navigate(`/noticeDetail/${board.id}`);
                        }}
                      >
                        {board.title}{" "}
                        <span className="notice_comment_count">
                          {board.comment}
                        </span>
                      </li>
                      <li>{DateFormat(board.writedate)}</li>
                    </ul>
                  );
                })
              : null}
          </li>
        </ul>
 
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
        <div className="prev_page" onClick={prevPageHandler}>
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
                if (page >= 1 && page <= totalPages) {
                  document
                    .querySelector(".page_box")
                    .classList.remove("error_page");
                  document
                    .querySelector(".page_input")
                    .classList.remove("error_page");
                  navigate(`/notice//${page}`);
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
          &nbsp;/ &nbsp;{totalPages}
        </div>
        <div className="next_page" onClick={nextPageHandler}>
          <FontAwesomeIcon icon={faAngleRight} size="2x" opacity="0.5" />
        </div>
        <div
          className="page_down"
          onClick={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <FontAwesomeIcon icon={faAngleDown} size="2x" opacity="0.5" />
        </div>
      </div>
    </div>
  );
}

export default UserNotice;

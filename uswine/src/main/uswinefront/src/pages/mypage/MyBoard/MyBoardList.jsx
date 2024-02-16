import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import DateFormat from "../../../function/DateFormat";
import "../../../css/mypage/myboard.css"
export default function MyBoardList(){
    const token = localStorage.getItem("token") || "";
    if (token == "") {
        alert("로그인이 필요한 서비스 입니다.");
        window.history.back();
        return <></>;
    } else {
        const userinfo = jwtDecode(token);
        return <MyBoardListComponent userinfo={userinfo} />;
    }
}
function MyBoardListComponent({userinfo}){
    let navigate = useNavigate()

    let { page } = useParams()

    const [currentPage, setCurrentPage] = useState(page)
    const [myBoardList,setMyBoardList] = useState([])
    const [totalPage,setTotalPage] = useState(1)
    const [myCommentCount,setMYCommentCount] = useState({})
    const [myRecommentCount,setMyRecommentCount] = useState({})
    const [myRecommendCount,setMyRecommendCount] = useState({})
    useEffect(() => {
        AuthApi("/api/myboard/myboardList",{
            nickname:userinfo.nickname,
            page : currentPage
        }).then((data)=>{
            console.log(data)
            
            setMyBoardList(data.board.content)
            if(data.board.totalPages!= 0){
                setTotalPage(data.board.totalPages)
            }
            Object.entries(data.comment_map).forEach(([id, value]) => {
                setMYCommentCount((prevMyCommentCount) => ({
                    ...prevMyCommentCount,
                    [id]: value
                }));
            });
            Object.entries(data.recomment_map).forEach(([id, value]) => {
                setMyRecommentCount((prevMyRecommentCount) => ({
                    ...prevMyRecommentCount,
                    [id]: value
                }));
            });
            Object.entries(data.recommend_map).forEach(([id, value]) => {
                setMyRecommendCount((prevMyRecommendCount) => ({
                    ...prevMyRecommendCount,
                    [id]: value
                }));
            });
        })
    },[currentPage])

    function prevPageHandler() {
        if (currentPage > 1) {
          navigate(`/mypage/myboard/${parseInt(currentPage) - 1}/`);
          setCurrentPage(currentPage - 1);
        } else {
          alert("첫번째 페이지 입니다.");
        }
      }
    
      function nextPageHandler() {
        if (currentPage < totalPage) {
          navigate(
            `/mypage/myboard/${parseInt(currentPage, 10) + 1}/`
          );
          setCurrentPage(parseInt(currentPage, 10) + 1);
        } else {
          alert("마지막 페이지 입니다.");
        }
      }
    return(
        <div className="my_board_out_container">
            <div className="my_board_container">
                <ul className="my_board_list_container">
                <li>
                    <ul className="my_board_info_container">
                    <li className="my_board_info_title"></li>
                    <li className="my_board_info_title" style={{ color: "#666" }}>
                        제목
                    </li>
                    
                    <li
                        className="my_board_info_title"
                        style={{ color: "#666", fontSize: "15px" }}
                    >
                        작성일
                    </li>
                    <li
                        className="my_board_info_title"
                        style={{ color: "#666", fontSiz: "15px" }}
                    >
                        추천
                    </li>
                    </ul>
                </li>
                <li>
                    {myBoardList !== undefined
                    ? myBoardList.map(function (board, i) {
                        return (
                            <ul className="my_board_info_container board_list" key={i}>
                            <li></li>
                            <li
                                onClick={() => {
                                navigate(`/board/${board.id}`);
                                }}
                            >
                                {board.title}{" "}
                                <span className="my_board_comment_count">
                                {myCommentCount[board.id]+myRecommentCount[board.id]}
                                </span>
                            </li>
                            
                            <li>{DateFormat(board.writedate)}</li>
                            <li>{myRecommendCount[board.id]}</li>
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
                        if (page >= 1 && page <= totalPage) {
                        document
                            .querySelector(".page_box")
                            .classList.remove("error_page");
                        document
                            .querySelector(".page_input")
                            .classList.remove("error_page");
                        navigate(`/mypage/myboard/${currentPage}`);
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
    )
}

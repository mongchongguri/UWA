import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import "../../../css/mypage/myinfo.css"
import logo from "../../../css/imgs/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleLeft, faAngleRight,  faEnvelope, faHouse, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import DateFormat from "../../../function/DateFormat";
export default function MyInfo(){
    const token = localStorage.getItem("token") || "";
    if (token == "") {
        alert("로그인이 필요한 서비스 입니다.");
        window.history.back();
        return <></>;
    } else {
        const userinfo = jwtDecode(token);
        return <MyInfoComponent userinfo={userinfo} />;
    }
}
function MyInfoComponent({userinfo}){
    const navigate = useNavigate()
    const { page } = useParams()

    const [currentPage, setCurrentPage] = useState(page);
    const [totalPage,setTotalPage] = useState(1);

    const [getInfo, setGetInfo] = useState({})
    const [getPhone, setGetPhone] = useState('')
    const [getAddress, setGetAddress] = useState('');
    const [getDetailAddress, setGetDetailAddress] = useState('')

    const [buyWineList,setBuyWineList] = useState([]);
    const [totalBuyWine,setTotalBuyWine] = useState('');
    const [totalBoardCount,setTotalBoardCount] = useState('');
    const [totalCommentCount,setTotalCommentCount] = useState('');
    const [goodsState,setGoodsState] = useState([]);

    const [boardList,setBoardList] = useState([])
    const [boardList_Comment, setBoardList_Comment] = useState([])
    const [boardList_Recomment, setBoardList_Recomment] = useState([])

    const [commentBoardList,setCommentBoardList] = useState([])
    const [commentBoardList_Comment, setCommentBoardList_Comment] = useState([])
    const [commentBoardList_Recomment, setCommentBoardList_Recomment] = useState([])

    const [openModal,setOpenModal] = useState(false)
    const [openNewNickname , setOpenNewNickname] = useState(false)
    const [openNewPassword, setOpenNewPassword] = useState(false)
    const [newNickname,setNewNickname] = useState('');
    const [newPassword,setNewPassword] = useState('');

    const [isCheckNickname,setIsCheckNickname] = useState(false);
    useEffect(() => {
        console.log(userinfo)
        setGoodsState([])
        AuthApi("/api/myinfo/getInfo",{
            userinfo
        }).then((data)=>{
            setGetInfo(data);
            let phoneNumber = data.phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
            setGetPhone(phoneNumber)
            const numbers = data.address.match(/^\d+/)
            const address = data.address.substring(numbers[0].length).trim()
            const [, basicAddress, detailAddress] = address.match(/(.+)\s(.+)/);
            setGetAddress(basicAddress)
            setGetDetailAddress(detailAddress)
        })
        AuthApi("/api/myinfo/buywine",{
            userinfo,
            currentPage
        }).then((data)=>{
            console.log(data)
            setBuyWineList(data.content)
            setTotalBuyWine(data.totalElements)
            if(data.totalPages !=0){
                setTotalPage(data.totalPages)
            }
        })
        AuthApi("/api/myinfo/getList",{
            userinfo
        }).then((data)=>{
            setBoardList(data.board.content)
            setTotalBoardCount(data.board.totalElements)
            Object.entries(data.comment_map).forEach(([id, value]) => {
                setBoardList_Comment((prevCommentCount) => ({
                    ...prevCommentCount,
                    [id]: value
                }));
            });
            Object.entries(data.recomment_map).forEach(([id, value]) => {
                setBoardList_Recomment((prevRecommentCount) => ({
                    ...prevRecommentCount,
                    [id]: value
                }));
            });
        })
        AuthApi("/api/myinfo/getCommentList",{
            userinfo
        }).then((data)=>{
            setCommentBoardList(data.board)
            setTotalCommentCount(data.totalCount)
            Object.entries(data.comment_map).forEach(([id, value]) => {
                setCommentBoardList_Comment((prevCommentCount) => ({
                    ...prevCommentCount,
                    [id]: value
                }));
            });
            Object.entries(data.recomment_map).forEach(([id, value]) => {
                setCommentBoardList_Recomment((prevRecommentCount) => ({
                    ...prevRecommentCount,
                    [id]: value
                }));
            });
        })
        AuthApi("/api/myinfo/getState",{
            userinfo,
            currentPage
        }).then((data)=>{
            data.content.forEach(([array1,])=>{
                setGoodsState((prevState) => [...prevState, array1.delivery]);
            })
        })
    },[currentPage])
    function changeNickname(){
        setNewNickname('')
        setOpenModal(true);
        setOpenNewNickname(true);
    }
    function checkNewNickname(){
        AuthApi("/api/myinfo/checkNewNickname",{
            newNickname
        }).then((data)=>{
            console.log(data)
            if(data === 1){
                alert("이미 존재하는 닉네임 입니다.")
            }else{
                setIsCheckNickname(true)
                alert("사용가능한 닉네임 입니다.")
            }
        })
    }
    function changePassword(){
        setNewPassword('')
        setOpenModal(true);
        setOpenNewPassword(true);
    }
    function closeModal(){
        setOpenModal(false);
        setOpenNewNickname(false);
        setOpenNewPassword(false);
    }
    function updateNickname(){
        if(isCheckNickname){
            AuthApi("/api/myinfo/updateNickname",{
                userinfo,
                newNickname
            }).then((data)=>{
                console.log(data)
                if(data !== 0){
                    window.location.reload()
                }else{
                    alert("닉네임을 변경할 수 없습니다.")
                }
            })
        }else{
            alert("닉네임 중복체크를 해주세요")
            document.getElementById("userinfo_new_nickname").focus()
        }
    }
    function updatePassword(){
        AuthApi("/api/myinfo/updatePassword",{
            userinfo,
            newPassword
        }).then((data)=>{
            console.log(data)
            if(data !== 0){
                navigate('/')
                // 로그아웃시켜야함
            }else{
                alert("비밀번호를 변경할 수 없습니다.")
            }
        })
    }

    function prevPageHandler() {
        if (currentPage > 1) {
          navigate(`/mypage/myinfo/${parseInt(currentPage) - 1}/`);
          setCurrentPage(currentPage - 1);
        } else {
          alert("첫번째 페이지 입니다.");
        }
      }
    
      function nextPageHandler() {
        if (currentPage < totalPage) {
          navigate(
            `/mypage/myinfo/${parseInt(currentPage, 10) + 1}/`
          );
          setCurrentPage(parseInt(currentPage, 10) + 1);
        } else {
          alert("마지막 페이지 입니다.");
        }
      }

    return(
        <div className="userinfoOutContainer">
            {openModal ?
            <div className="userinfo_modal">
                <div className="userinfo_modal_input">
                    {openNewNickname ?
                    <>
                    <div className="userinfo_new_nickname_box">
                        <span>새 닉네임</span>
                        <div className="userinfo_new_nickname_input">
                            <input 
                                type="text" 
                                id="userinfo_new_nickname" 
                                onChange={(e)=>setNewNickname(e.target.value)}
                            />
                            <button
                                className="userinfo_check_new_nickname"
                                onClick={checkNewNickname}
                            >
                                중복체크
                        </button>
                        </div>
                    </div>
                    <div className="userinfo_modal_button_box">
                        <button
                            className="userinfo_update_nickname_button"
                            onClick={updateNickname}
                        >
                            수정
                        </button>
                        <button
                            className="userinfo_close_modal"
                            onClick={closeModal}
                        >
                            닫기
                        </button>
                    </div>
                    </>
                    : null}
                    {openNewPassword ?
                    <>
                    <div className="userinfo_new_password_box">
                        <span>새 비밀번호</span>
                        <input 
                            type="text" 
                            id="userinfo_new_password" 
                            onChange={(e)=>setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="userinfo_modal_button_box">
                        <button
                            className="userinfo_update_password_button"
                            onClick={updatePassword}
                        >
                            수정
                        </button>
                        <button
                            className="userinfo_close_modal"
                            onClick={closeModal}
                        >
                            닫기
                        </button>
                    </div>
                    </>
                    : null}
                </div>
            </div>
            : null}
            <div className="userinfoInContainer">
                <div className="userinfoBox">
                    <div className="userinfo_logo">
                        <img src={logo} />
                        <div className="userinfo_name">
                            {getInfo.nickname} | {getInfo.role == "ROLE_ADMIN" ? '관리자' : (getInfo.role == "ROLE_SELLER" ? '판매자' : '사용자')}
                        </div>
                        <div className="userinfo_changeinfo">
                            <button 
                                className="changeinfo_button"
                                onClick={changeNickname}
                            >
                                닉네임 수정
                            </button>
                            <button 
                                className="changeinfo_button"
                                onClick={changePassword}
                            >
                                비밀번호 수정
                            </button>
                        </div>
                    </div>
                    <div className="userinfo_phone">
                        <div className="userinfo_phone_logo">
                            <FontAwesomeIcon icon={faPhone} style={{color:"#aaa"}}/>
                        </div>
                        {getPhone}
                    </div>
                    <div className="userinfo_email">
                        <div className="userinfo_email_logo">
                            <FontAwesomeIcon icon={faEnvelope } style={{color:"#aaa"}}/>
                        </div>
                        <div className="userinfo_email_value">
                            {getInfo.email}
                        </div>
                    </div>
                    <div className="userinfo_address">
                        <div className="userinfo_address_logo">
                            <FontAwesomeIcon icon={faHouse} style={{color:"#aaa"}}/>
                        </div>
                        <div className="userinfo_address_value">
                            <div className="userinfo_address_basic">
                                {getAddress}
                            </div>
                            <div className="userinfo_address_detail">
                                {getDetailAddress}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userinfoLines">
                    
                    <div className="userinfoMiddleLine">
                        <div className="userTotalBoardBox">
                            <div className="userTotalBoardBox_label">
                                <div id="userinfo_totalboard_first_label">
                                    작성한 글목록 <span>(총 : {totalBoardCount}개)</span>
                                </div>
                                <div id="userinfo_totalboard_second_label">
                                    <Link to={"/mypage/myboard/1"}>
                                        전체글보기
                                    </Link>
                                </div>
                            </div>
                            <div className="userTotalBoardBox_value">
                                {boardList.length !== 0
                                ? <ul className="userinfo_board_info_container board_list userinfo_headcolumn">
                                    <li>
                                        제목
                                    </li>
                                    <li>
                                        작성일
                                    </li>
                                </ul>
                                : null}
                                {boardList.length !== 0
                                ? boardList.map(function (board, i) {
                                    return (
                                        <ul 
                                            className={i!=boardList.length-1 ? "userinfo_board_info_container board_list" : "userinfo_board_info_container board_list userinfo_lastul" }
                                            key={i}
                                        >
                                        <li
                                            onClick={() => {
                                            navigate(`/board/${board.id}`);
                                            }}
                                        >
                                            {board.title}{" "}
                                            <span className="userinfo_board_comment_count">
                                            {boardList_Comment[board.id]+boardList_Recomment[board.id]}
                                            </span>
                                        </li>
                                        
                                        <li>{DateFormat(board.writedate)}</li>
                                        </ul>
                                    );
                                    })
                                : "작성한 글이 없습니다."}
                            </div>
                        </div>
                        <div className="userTotalCommentBox">
                            <div className="userTotalBoardBox_label">
                                <div id="userinfo_totalboard_first_label">
                                    댓글 작성한 글목록 <span>(총 : {totalCommentCount}개)</span>
                                </div>
                                <div id="userinfo_totalboard_second_label">
                                    <Link to={"/mypage/mycomment/1"}>
                                        전체글보기
                                    </Link>
                                </div>
                            </div>
                            <div className="userTotalBoardBox_value">
                                {commentBoardList.length !== 0
                                ? <ul className="userinfo_board_info_container board_list userinfo_headcolumn">
                                    <li>
                                        제목
                                    </li>
                                    <li>
                                        작성일
                                    </li>
                                </ul>
                                : null}
                                {commentBoardList.length !== 0
                                ? commentBoardList.map(function (board, i) {
                                    return (
                                        <ul 
                                            className={i!=commentBoardList.length-1 ? "userinfo_board_info_container board_list" : "userinfo_board_info_container board_list userinfo_lastul" }
                                            key={i}
                                        >
                                        <li
                                            onClick={() => {
                                            navigate(`/board/${board.id}`);
                                            }}
                                        >
                                            {board.title}{" "}
                                            <span className="userinfo_board_comment_count">
                                            {commentBoardList_Comment[board.id]+commentBoardList_Recomment[board.id]}
                                            </span>
                                        </li>
                                        
                                        <li>{DateFormat(board.writedate)}</li>
                                        </ul>
                                    );
                                    })
                                : "작성한 댓글이 없습니다."}
                            </div>
                        </div>
                    </div>
                    <div className="userinfoBackLine">
                        <div className="userinfo_buywinelist_Box">
                            <div className="userinfo_buywinelist_label">
                                <div id="userinfo_buywinelist_first_label">
                                    구매내역 <span>(총 : {totalBuyWine}개)</span>
                                </div>
                            </div>
                            <div className="userinfo_buywinelist_value">
                                <ul className="userinfo_buywinelist_container board_list userinfo_headcolumn">
                                    <li>
                                        판매자
                                    </li>
                                    <li>
                                        구매와인
                                    </li>
                                    <li>
                                        구매날짜
                                    </li>
                                    <li>
                                        총 구매가격
                                    </li>
                                    <li>
                                        제품현황
                                    </li>
                                </ul>
                                {buyWineList.length !== 0
                                ? buyWineList.map(function (board, i) {
                                    return (
                                        <ul 
                                            className={i!=buyWineList.length-1 ? "userinfo_buywinelist_container board_list" : "userinfo_buywinelist_container board_list userinfo_lastul" }
                                            key={i}
                                            onClick={()=>{
                                                navigate(`/wine/${board.wineId}`)
                                            }}
                                        >
                                        <li>{board.sellername}</li>
                                        <li>{board.wineName}</li>
                                        <li>{DateFormat(board.timestamp)}</li>
                                        <li>{board.price*board.stock}</li>
                                        <li>{goodsState[i] == 0 ? "주문완료" : (goodsState[i] == 1 ? "입고완료" : (goodsState[i] == 2 ? "배송중" : "배송완료"))}</li>
                                        </ul>
                                    );
                                    })
                                : "구매내역이 없습니다."}
                                <div className="userinfo_page_controller">
                                    
                                    <div className="prev_page" onClick={prevPageHandler}>
                                    <FontAwesomeIcon icon={faAngleLeft} size="1x" opacity="0.5" />
                                    </div>
                                    <div className="userinfo_page_box">
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
                                                .querySelector(".userinfo_page_box")
                                                .classList.remove("error_page");
                                            document
                                                .querySelector(".page_input")
                                                .classList.remove("error_page");
                                            navigate(`/board/${currentPage}`);
                                            setCurrentPage(page);
                                            } else {
                                            document
                                                .querySelector(".userinfo_page_box")
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
                                    <FontAwesomeIcon icon={faAngleRight} size="1x" opacity="0.5" />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
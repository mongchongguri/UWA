import { useEffect, useState } from "react"
import "../../../css/admin/Notice.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import AuthApi from "../../../AuthApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
  } from "@fortawesome/free-solid-svg-icons";
import DateFormat from "../../../function/DateFormat";
export default function AdminNotice(){
    const token = localStorage.getItem("token") || "";
    if (token === "") {
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <AdminNoticeComponent userinfo={userinfo} />;
      } else {
        return <></>
      }
      
    }
}
function AdminNoticeComponent (){
    const { page } = useParams()
    const [currentPage,setCurrentPage] = useState(page)
    const [noticeList,setNoticeList] = useState([])
    const [totalPage,setTotalPage] = useState('')
    const [clickConfirm,setClickConfirm] = useState(0)
    const [noticeCommentCount,setNoticeCommentCount] = useState({})
    const [noticeRecommentCount,setNoticeRecommentCount] = useState({})
    useEffect(() => {
        console.log(currentPage)
        AuthApi('/api/admin/NoticeList',{
            currentPage
        }).then((data)=>{
            console.log(data)
            setNoticeList(data.notice_List.content)
            setTotalPage(data.notice_List.totalPages+'')
            console.log(data.comment_map)
            Object.entries(data.comment_map).forEach(([id, value]) => {
                setNoticeCommentCount((prevNoticeCommentCount) => ({
                    ...prevNoticeCommentCount,
                    [id]: value
                }));
            });
            Object.entries(data.recomment_map).forEach(([id, value]) => {
                setNoticeRecommentCount((prevNoticeRecommentCount) => ({
                    ...prevNoticeRecommentCount,
                    [id]: value
                }));
            });
        })
        
    },[clickConfirm])
    
    const navigate = useNavigate()
    function gotoWrite(){
        navigate('/admin/noticeWrite')
    }
    function handlePrevPage(e){
        if(currentPage > 1){
            setCurrentPage(parseInt(currentPage)-1)
            getNoticeList(parseInt(currentPage)-1)
        }else{
            alert("첫번째 페이지 입니다.")
        }
    }
    function handleNextPage(e){
        if(currentPage < totalPage){
            setCurrentPage(parseInt(currentPage)+1)
            getNoticeList(parseInt(currentPage)+1)
        }else{
            alert("마지막 페이지 입니다.");
        }
    }
    function getNoticeList(currentPage){
        navigate(`/admin/notice/${currentPage}`);
        setClickConfirm(clickConfirm+1)
    }

    function deleteNotice(id){
        console.log(id)
        AuthApi('/api/admin/deleteNotice',{
            id
        }).then((data)=>{
            alert("삭제되었습니다")
            navigate(`/admin/notice/${currentPage}`);
            setClickConfirm(clickConfirm+1)
        })
    }
    return(
        <div>
            <div id="noticeList">
                <div id="noticeTitle">
                    <h1>공지사항</h1>
                </div>
                <div id="noticeListHead">
                    <div id="headColumn_notice" className="headTitle">
                        공지제목
                    </div>
                    <div id="headColumn_notice" className="headWriteDate">
                        작성일
                    </div>
                
                </div>
                <div id="noticeListBody">
                        {noticeList.map((notice,index)=>(
                            <div key={index} style={{ display: 'flex', alignItems: 'center',
                            height:'60px',borderBottom:'1px solid #000',width:'100%' }}>
                                <div id={`noticetitle_${notice.id}`} style={{width:'70%', display:'flex',
                                justifyContent:'center'}}>
                                    <Link to={`/admin/noticeDetail/${notice.id}/1`} >{notice.title}</Link>
                                    <span className="admin_notice_comment_count">
                                        {noticeCommentCount[notice.id]+noticeRecommentCount[notice.id]}
                                    </span>
                                </div>
                                <div id={`noticewritedate_${notice.id}`} style={{width:'15%', display:'flex',
                                justifyContent:'center',marginRight:'5%'}}>
                                    {DateFormat(notice.writedate)}
                                </div>
                                <button id={`deleteNotice_${notice.id}`} className="deleteNotice_button"
                                onClick={(e)=>deleteNotice(e.target.id)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                </div>
                <div id="buttonArea_notice">
                    <button id="notice_writeButton" onClick={gotoWrite}>
                            글쓰기
                    </button>
                </div>
                <div id="noticeListFoot">
                    <div className="notice_page_controller">
                        <div className="prev_page" onClick={handlePrevPage}>
                            <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5"/>
                        </div>

                        <div className="notice_page_box">
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
                                    .querySelector(".notice_page_box")
                                    .classList.remove("error_page");
                                document
                                    .querySelector(".page_input")
                                    .classList.remove("error_page");
                                setCurrentPage(page);
                                } else {
                                document
                                    .querySelector(".notice_page_box")
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
                            <FontAwesomeIcon icon={faAngleRight} size="2x" opacity="0.5"/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
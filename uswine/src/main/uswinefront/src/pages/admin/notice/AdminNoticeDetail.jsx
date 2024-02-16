import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import MarkUp from "../../../function/MarkUp"
import AuthApi from "../../../AuthApi"
import "../../../css/admin/admin_notice/NoticeDetail.css"
import AdminCommentList from "./AdminNoticeCommentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
  } from "@fortawesome/free-solid-svg-icons";
import DateFormat from "../../../function/DateFormat";
export default function AdminNoticeDetail(){
    const token = localStorage.getItem("token") || "";
    if (token === "") {
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <AdminNoticeDetailComponent userinfo={userinfo} />;
      } else {
        return <></>
      }
      
    }
  }
function AdminNoticeDetailComponent(){
    const navigate = useNavigate()
    const {id,page}=useParams()
    let [currentPage,setCurrentPage] = useState(page)
    let [notice,setNotice] = useState({})
    let [commentList, setCommentList] = useState([]);
    let [recommentList, setRecommentList] = useState({});
    let [recommentListLength,setRecommentListLength] = useState(0)
    const [totalPage,setTotalPage] = useState('')
    const [totalElements,setTotalElements] = useState('')
    const [commentCheck,setCommentCheck] = useState({})
    const [recommentCheck,setRecommentCheck] = useState({})

    const [clickConfirm,setClickConfirm] = useState(0)
    useEffect(() => {
        setCommentCheck({})
        setRecommentCheck({})
        AuthApi("/api/admin/getNotice",{
            id
        }).then((data)=>{
            console.log(data)
            setNotice(data)
        })
        AuthApi("/api/admin/getCommentList",{
            id,
            currentPage
        }).then((data)=>{
            console.log(data)
            setCommentList(data.commentList.content)
            setTotalPage(data.commentList.totalPages)
            setTotalElements(data.commentList.totalElements)
            data.commentList.content.forEach((comment)=>{
                let commentId = comment.id
                let recommentList = data[commentId]

                setRecommentList((prevRecommentList)=>({
                    ...prevRecommentList,
                    [commentId]:recommentList
                }))
            })
        })
        AuthApi("/api/admin/adminRecommentCount",{
            id
        }).then((data)=>{
            setRecommentListLength(data)
        })
        const allCheckbox = document.querySelectorAll('.checkbox_notice')
        allCheckbox.forEach((checkbox) => {
            checkbox.checked = false
        })
    },[clickConfirm])

    function deleteNoticeComment(){
        console.log(commentCheck)
        console.log(recommentCheck)
        if(commentCheck.length === 0&&recommentCheck.length === 0){
            alert('삭제할 대상을 선택해주세요')
        }else{
            AuthApi("/api/admin/deleteNoticeComment",{
                commentCheck,
                recommentCheck
            }).then((data)=>{
                alert("삭제되었습니다")
                navigate(`/admin/noticeDetail/${id}/${page}`)
                setClickConfirm(clickConfirm+1)
            })
        }
    }


    function addCommentCheck(nickname,prevCommentCheck){
        return {
            ...prevCommentCheck,
            [nickname]:true
        }
    }
    function removeCommentCheck(nickname,prevCommentCheck){
        const updatedCommentCheck = {...prevCommentCheck}
        delete updatedCommentCheck[nickname]
        return updatedCommentCheck
    }
    function handleCommentCheck(nickname){
        console.log(nickname)
        setCommentCheck((prevCommentCheck)=>{
            if(prevCommentCheck[nickname]){
                return removeCommentCheck(nickname,prevCommentCheck)
            }else{
                return addCommentCheck(nickname,prevCommentCheck)
            }
        })
    }



    function addRecommentCheck(nickname,prevRecommentCheck){
        return {
            ...prevRecommentCheck,
            [nickname]:true
        }
    }
    function removeRecommentCheck(nickname,prevRecommentCheck){
        const updatedRecommentCheck = {...prevRecommentCheck}
        delete updatedRecommentCheck[nickname]
        return updatedRecommentCheck
    }
    function handleRecommentCheck(nickname){
        console.log(nickname)
        setRecommentCheck((prevRecommentCheck)=>{
            if(prevRecommentCheck[nickname]){
                return removeRecommentCheck(nickname,prevRecommentCheck)
            }else{
                return addRecommentCheck(nickname,prevRecommentCheck)
            }
        })
    }

    function handlePrevPage(e){
        if(currentPage > 1){
            setCurrentPage(parseInt(currentPage)-1)
            getNoticeDetail(parseInt(currentPage)-1)
        }else{
            alert("첫번째 페이지 입니다.")
        }
    }
    function handleNextPage(e){
        if(currentPage < totalPage){
            setCurrentPage(parseInt(currentPage)+1)
            getNoticeDetail(parseInt(currentPage)+1)
        }else{
            alert("마지막 페이지 입니다.");
        }
    }
    function getNoticeDetail(currentPage){
        navigate(`/admin/noticeDetail/${id}/${currentPage}`);
        setClickConfirm(clickConfirm+1)
    }
    
    return (
        <div className="admin_notice_detail_container">
        <div className="admin_notice_details_container">
            <div className="notice_detail_title">{notice.title}</div>
            <div className="notice_detail_info_container">
                <div>관리자</div>
                <div>{notice.writedate ? DateFormat(notice.writedate) : null}</div>
                <div>댓글 {totalElements + recommentListLength}</div>
            </div>
            <div className="notice_detail_content">
                <MarkUp MakrDownData={notice.content} />
            </div>
            <div className="notice_detail_comment">
                <div className="notice_comment_list_container">
                
                    {commentList.length == 0 ? null : (
                    <AdminCommentList
                        comments={commentList}
                        handleCommentCheck={handleCommentCheck}
                        recommentList={recommentList}
                        handleRecommentCheck={handleRecommentCheck}
                        DateFormat={DateFormat}
                        deleteNoticeComment={deleteNoticeComment}
                    />
                    )}
                </div>
            </div>
            <div id="notice_detail_Foot">
                <div className="notice_detail_page_controller">
                    {commentList.length>0 ?
                        <>
                            <div className="prev_page" onClick={handlePrevPage}>
                                <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5"/>
                            </div>

                            <div className="notice_detail_page_box">
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
                                        .querySelector(".notice_detail_page_box")
                                        .classList.remove("error_page");
                                    document
                                        .querySelector(".page_input")
                                        .classList.remove("error_page");
                                    setCurrentPage(page);
                                    } else {
                                    document
                                        .querySelector(".notice_detail_page_box")
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
                        </>
                        : '댓글이 없습니다'
                    }
                </div>
            </div>
        </div>
        </div>
    )
    
}

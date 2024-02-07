import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
  } from "@fortawesome/free-solid-svg-icons";
export default function UserListFoot({searchType,searchWord,DESC,
    searchGroup,searchDate,totalPage,setUserCheck,currentPage,setCurrentPage}){
    const navigate = useNavigate();

    function handlePrevPage(e){
        if(currentPage > 1){
            setCurrentPage(parseInt(currentPage)-1)
            getUserList(parseInt(currentPage)-1)
        }else{
            alert("첫번째 페이지 입니다.")
        }
    }
    function handleNextPage(e){
        if(currentPage < totalPage){
            setCurrentPage(parseInt(currentPage)+1)
            getUserList(parseInt(currentPage)+1)
        }else{
            alert("마지막 페이지 입니다.");
        }
    }
    function getUserList(currentPage){
        navigate(`/admin/userList/${searchType}/${searchGroup}/${DESC}/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
    }

    return(
        <> 
            <div className="user_page_controller">
                <div className="prev_page" onClick={handlePrevPage}>
                    <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5"/>
                </div>

                <div className="user_page_box">
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
                            .querySelector(".user_page_box")
                            .classList.remove("error_page");
                        document
                            .querySelector(".page_input")
                            .classList.remove("error_page");
                        setCurrentPage(page);
                        } else {
                        document
                            .querySelector(".user_page_box")
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
        </>
    )
}
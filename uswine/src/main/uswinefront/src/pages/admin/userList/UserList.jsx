import { useState,useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap";
import '../../../css/admin/UserList.css'
import UserListBody from "./UserListBody";
import UserListFoot from "./UserListFoot";
import AuthApi from "../../../AuthApi";
import { jwtDecode } from "jwt-decode";
export default function UserList(){
    const token = localStorage.getItem("token") || "";
    if (token === "") {
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <UserListComponent userinfo={userinfo} />;
      } else {
        return <></>
      }
      
    }
}

function UserListComponent(){

    //params 변수들 
    const {Type,Group,StartDate,EndDate,Sort,Page,Word}=useParams()
    // params요구하는 스테이트들
    const [searchType,setSearchType] = useState(Type)
    const [searchWord,setSearchWord] = useState((Word===undefined)?"":Word)
    const [searchGroup,setSearchGroup] = useState(Group)
    const [searchDate,setSearchDate] = useState({
        startDate:StartDate,
        endDate:EndDate
    })
    const [currentPage,setCurrentPage]=useState(Page)
    const [DESC,setDESC] = useState(Sort)

    const navigate = useNavigate()
    
    
    // 체크된 유저목록
    const [userCheck,setUserCheck] = useState({})
    
    // 리턴받은 유저리스트
    const [userList,setUserList] = useState([])
    const [totalPage,setTotalPage] = useState(1)


    // 조회버튼 클릭시
    const [clickSearch,setClickSearch] = useState(0)

    let [userRoleValue,setUserRoleValue] = useState({})
    let [userNickValue,setUserNickValue] = useState({})

    // 페이지 로드시 유저 리스트 가져오기
    useEffect(() => {
        console.log(DESC)
        setUserCheck({})
        let sendStartDate = searchDate.startDate
        let sendEndDate = searchDate.endDate
        if(sendStartDate==='undefined'){
            sendStartDate = null
        }
        if(sendEndDate === 'undefined'){
            sendEndDate = null
        }
        const allCheckbox = document.querySelectorAll('.checkbox')
        const mainbox = document.getElementById('checkAll')
        allCheckbox.forEach((checkbox) => {
            checkbox.checked = false
        })
        mainbox.checked = false
        AuthApi('/api/admin/List',{
            searchType:searchType,
            searchWord:searchWord,
            searchGroup:searchGroup,
            searchStartDate:sendStartDate,
            searchEndDate:sendEndDate,
            page:currentPage-1,
            searchDESC:DESC
        }).then((data)=>{
            console.log('Server response:', data);
            if(data !== ""){
                if(data !== 0){
                    setUserList(data.content)
                    if(data.totalPages != 0){
                        setTotalPage(data.totalPages)
                    }
                }
            }else{
                alert('날짜를 다시 지정해주세요')
                window.history.back()
            }
        })
    },[currentPage,clickSearch])



    // user 체크
    function addUserCheck(nickname,prevUserCheck){
        return {
            ...prevUserCheck,
            [nickname]:true
        }
    }
    function removeUserCheck(nickname,prevUserCheck){
        const updatedUserCheck = {...prevUserCheck}
        delete updatedUserCheck[nickname]
        return updatedUserCheck
    }
    function handleUserCheck(nickname){
        console.log(nickname)
        const allcheck = document.getElementById('checkAll')
        setUserCheck((prevUserCheck)=>{
            if(prevUserCheck[nickname]){
                allcheck.checked = false
                return removeUserCheck(nickname,prevUserCheck)
            }else{
                return addUserCheck(nickname,prevUserCheck)
            }
        })
    }

    // 유저 전체 체크
    function checkAll(){
        setUserCheck({})
        const allCheckbox = document.querySelectorAll('.checkbox')
        const mainbox = document.getElementById('checkAll')
        if(mainbox.checked){
            allCheckbox.forEach((checkbox) => {
                const nickname = checkbox.id
                handleUserCheck(nickname)
                checkbox.checked = true
            })
            mainbox.checked = true
        }else{
            allCheckbox.forEach((checkbox) => {
                checkbox.checked = false
            })
            mainbox.checked = false
        }
    }


    // 리스트 정렬 버튼
    function handleButtonActive(button,desc){
        document.querySelectorAll('.sortButton').forEach((btn) => {
            btn.classList.remove('active')
        })
        if(button === 'id'){
            if(desc === 'none'){
                document.getElementById('idSort').classList.add('active')
                setDESC('ASC')
                navigate(`/admin/userList/id/${searchGroup}/ASC/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            }else{
                document.getElementById('idSortDESC').classList.add('active')
                setDESC('DESC')
                navigate(`/admin/userList/id/${searchGroup}/DESC/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            }
        }else if(button === 'name'){
            if(desc === 'none'){
                document.getElementById('nameSort').classList.add('active')
                setDESC('ASC')
                navigate(`/admin/userList/nickname/${searchGroup}/ASC/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            }else{
                document.getElementById('nameSortDESC').classList.add('active')
                setDESC('DESC')
                navigate(`/admin/userList/nickname/${searchGroup}/DESC/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            }   
        }else if(button === 'lastupdate'){
            if(desc === 'none'){
                document.getElementById('lastupdateSort').classList.add('active')
                setDESC('ASC_date')
                navigate(`/admin/userList/${searchType}/${searchGroup}/ASC_date/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            }else{
                document.getElementById('lastupdateSortDESC').classList.add('active')
                setDESC('DESC_date')
                navigate(`/admin/userList/${searchType}/${searchGroup}/DESC_date/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            }
        }
    }

    // 검색버튼
    function handleSerchUser(){
        document.querySelectorAll('.sortButton').forEach((btn) => {
            btn.classList.remove('active')
        })
        navigate(`/admin/userList/${searchType}/${searchGroup}/ASC/1/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
        setDESC('ASC')
        setCurrentPage(1)
        setClickSearch(clickSearch+1)
    }
    
    // 선택된 유저 삭제
    function handleDeleteUser(){
        console.log("유저 삭제")
        console.log(userCheck)
        if(Object.keys(userCheck).length===0){
            alert("삭제할 유저를 선택해주세요")
        }else{
            AuthApi('/api/admin/Delete',{
                users:userCheck
            }).then((data)=>{
                alert("삭제되었습니다.")
                navigate(`/admin/userList/id/all/ASC/1/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            })
        }
    }
    // 선택된 유저 저장
    function handleSaveUser(){
        console.log("유저 저장")
        console.log(userCheck)
        if(Object.keys(userCheck).length===0){
            alert("수정할 유저를 선택해주세요")
        }else{
            AuthApi('/api/admin/UpdateUsers',{
                users:userCheck,
                userChangeRoles:userRoleValue,
                userChangeNicks:userNickValue
            }).then((data)=>{
                if (data === 1){
                    alert("수정되었습니다.")
                    navigate(`/admin/userList/${searchType}/${searchGroup}/${DESC}/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                    setClickSearch(clickSearch+1)
                }else if(data === -1){
                    alert("판매자승인 요청이 존재하지 않습니다.")
                    navigate(`/admin/userList/${searchType}/${searchGroup}/${DESC}/${currentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                    setClickSearch(clickSearch+1)
                }
            })
        }
    }

    function handleDateChange(e){
        const selectedDate = new Date(e.target.value)
        setSearchDate({
            ...searchDate,
             [e.target.id]:selectedDate.toISOString().split('T')[0]
        })
    }

    // // 페이징확인용 유저 추가
    // function addUser(){
    //     AuthApi('/api/user/Add',{
    //         add:""
    //     }).then((data)=>{
    //         console.log('유저추가 완료 '+data)
    //     })
    // }

    return(
        <div id="userListBlock">
            <div id="searchUser">
                <Form.Select
                    id="serchType"
                    name="serchtype"
                    value={searchType}
                    onChange={(e)=>setSearchType(e.target.value)}
                >
                    <option value='id' >아이디</option>
                    <option value='nickname'>닉네임</option>
                </Form.Select>
                <Form.Control
                    type="text"
                    id="serchWord"
                    name="serchword"
                    placeholder="검색어"
                    value={searchWord}
                    onChange={(e)=>setSearchWord(e.target.value)}
                />
                <Form.Select
                    id="serchGroup"
                    name="serchgroup"
                    value={searchGroup}
                    onChange={(e)=>setSearchGroup(e.target.value)}
                >   
                    <option value='all'>전체</option>
                    <option value='admin'>관리자</option>
                    <option value='user'>사용자</option>
                    <option value='seller'>판매자</option>
                    <option value='ban'>권한 정지</option>
                </Form.Select>
                <Form.Control
                    type="date"
                    id="startDate"
                    name="serchstartdate"
                    value={searchDate.startDate||""}
                    onChange={handleDateChange}
                />
                -
                <Form.Control
                    type="date"
                    id="endDate"
                    name="serchenddate"
                    value={searchDate.endDate||""}
                    onChange={handleDateChange}
                />
                <Button id="searchUserButton" variant="light" onClick={handleSerchUser} >
                    조회
                </Button>
            </div>
            <hr />
            <div id="userList">
                <div id="countBlock">
                    <Button variant="light"  id="save" onClick={handleSaveUser}>
                        저장
                    </Button>
                    <Button variant="light"  id="delete" onClick={handleDeleteUser}>
                        삭제
                    </Button>

                    {/* 페이징확인용 유저 추가 버튼 */}
                    {/* <Button variant="light" id="addUser" onClick={addUser}>
                        멤버추가
                    </Button> */}
                    {/* 검색결과 갯수 */}
                    {/* <span>검색결과 : {countSerchUser}</span> */}
                </div>
                <div id="userListHead">
                    <input
                        type="checkbox"
                        id="checkAll"
                        name="checkall"
                        className="checkboxmain"
                        onChange={checkAll}
                    />
                    <div id="headColumn">
                        이메일
                    </div>
                    <div id="idSortBlock">
                        <button variant="primary" id="idSort"
                         className="sortButton" onClick={()=>{handleButtonActive('id','none')}}>
                        </button>
                        <button variant="primary" id="idSortDESC" 
                        className="sortButton" onClick={()=>{handleButtonActive('id','desc')}}>
                        </button>
                    </div>
                    <div id="headColumn">
                        닉네임
                    </div>
                    <div id="nameSortBlock">
                        <button variant="primary" id="nameSort"
                         className="sortButton" onClick={()=>{handleButtonActive('name','none')}}>
                        </button>
                        <button variant="primary" id="nameSortDESC" 
                        className="sortButton" onClick={()=>{handleButtonActive('name','desc')}}>
                        </button>
                    </div>
                    <div id="headGroup">
                        그룹(역할)
                    </div>
                    <div id="headColumn">
                        가입일자
                    </div>
                    <div id="lastupdateSortBlock">
                        <button variant="primary" id="lastupdateSort"
                         className="sortButton" onClick={()=>{handleButtonActive('lastupdate','none')}}>
                        </button>
                        <button variant="primary" id="lastupdateSortDESC" 
                        className="sortButton" onClick={()=>{handleButtonActive('lastupdate','desc')}}>
                        </button>
                    </div>
                </div>
                <div id="userListBody">
                    <UserListBody userList={userList} handleUserCheck={handleUserCheck} searchDate={searchDate}
                    searchWord={searchWord} searchType={searchType} searchGroup={searchGroup} searchcurrentPage={currentPage}
                    DESC={DESC} clickSearch={clickSearch} setClickSearch={setClickSearch} userRoleValue={userRoleValue}
                    setUserRoleValue={setUserRoleValue} userNickValue={userNickValue} setUserNickValue={setUserNickValue}/>
                </div>
                <div id="userListFoot">
                    <UserListFoot searchType={searchType} searchWord={searchWord} searchGroup={searchGroup} searchDate={searchDate} 
                    totalPage={totalPage} setUserCheck={setUserCheck} currentPage={currentPage}
                    setCurrentPage={setCurrentPage} DESC={DESC}/>
                </div>
            </div>
        </div>
    )
}
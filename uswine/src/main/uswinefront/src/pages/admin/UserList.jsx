import { useState,useEffect } from "react"
import { Button, Form } from "react-bootstrap";
import axios from 'axios'
import '../../css/admin/UserList.css'
import UserListBody from "./UserListBody";
export default function UserList(){
    const [serchType,setSerchType] = useState('id')
    const [serchWord,setSerchWord] = useState('')
    const [serchGroup,setSerchGroup] = useState('all')

    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())

    const [countSerchUser,setCountSerchUser] = useState('')

    const [userCheck,setUserCheck] = useState({})
    
    const [userList,setUserList] = useState([])
    const [ids,setIds]=useState([])

    // 페이지 로드시 유저 리스트 가져오기
    useEffect(() => {
        async function userListLoad(){
            try {
                const response = await axios.post('http://localhost:8080/api/user/List',{
                    serchType:"",
                    serchWord:"",
                    serchGroup:""
                });
                
                console.log('Server response:', response.data);
                setUserList(response.data)
                setIds(response.data.map(user => user.id))
                
            } catch (error) {
                console.error('Error:', error);
            }
        }
        userListLoad()
    },[])

    // user 체크
    function addUserCheck(id,prevUserCheck){
        return {
            ...prevUserCheck,
            [id]:true
        }
    }
    function removeUserCheck(id,prevUserCheck){
        const updatedUserCheck = {...prevUserCheck}
        delete updatedUserCheck[id]
        return updatedUserCheck
    }
    function handleUserCheck(id){
        setUserCheck((prevUserCheck)=>{
            if(prevUserCheck[id]){
                return removeUserCheck(id,prevUserCheck)
            }else{
                return addUserCheck(id,prevUserCheck)
            }
        })
    }

    // 유저 전체 체크
    function checkAll(ids){
        console.log("전체선택")
        setUserCheck((prevUserCheck) => {
            const allChecked = document.getElementById('idCheck').checked;
    
            return allUserCheck(prevUserCheck, allChecked, ids);
        });
    }
    function allUserCheck(prevUserCheck,allChecked,ids){
        const updatedUserCheck = {}
        ids.forEach((id)=>{
            updatedUserCheck[id] = true
        })
        if(allChecked){
            return updatedUserCheck
        }else{
            return {}
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
            }else{
                document.getElementById('idSortDESC').classList.add('active')
            }
        }else if(button === 'name'){
            if(desc === 'none'){
                document.getElementById('nameSort').classList.add('active')
            }else{
                document.getElementById('nameSortDESC').classList.add('active')
            }
        }else if(button === 'lastupdate'){
            if(desc === 'none'){
                document.getElementById('lastupdateSort').classList.add('active')
            }else{
                document.getElementById('lastupdateSortDESC').classList.add('active')
            }
        }
    }

    // 검색버튼
    async function handleSerchUser(){
        console.log("검색요청: type="+serchType+", word"+serchWord)
        try {
            const response = await axios.post('http://localhost:8080/api/user/List',{
                serchType:serchType,
                serchWord:serchWord,
                serchGroup:serchGroup
            });
            
            console.log('Server response:', response.data);
            setUserList(response.data)
            setIds(response.data.map(user => user.id))
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // 선택된 유저 삭제
    function handleDeleteUser(){
        console.log("유저 삭제")
        console.log(userCheck)
    }

    return(
        <div id="userListBlock">
            <div id="searchUser">
                <Form.Select
                    id="serchType"
                    name="serchtype"
                    value={serchType}
                    onChange={(e)=>setSerchType(e.target.value)}
                >
                    <option value='id' >아이디</option>
                    <option value='nickname'>닉네임</option>
                </Form.Select>
                <Form.Control
                    type="text"
                    id="serchWord"
                    name="serchword"
                    placeholder="검색어"
                    value={serchWord}
                    onChange={(e)=>setSerchWord(e.target.value)}
                />
                <Form.Select
                    id="serchGroup"
                    name="serchgroup"
                    value={serchGroup}
                    onChange={(e)=>setSerchGroup(e.target.value)}
                >   
                    <option value='all'>전체</option>
                    <option value='admin'>관리자</option>
                    <option value='user'>사용자</option>
                    <option value='seller'>판매자</option>
                </Form.Select>
                <Form.Control
                    type="date"
                    id="serchStartDate"
                    name="serchstartdate"
                    value={startDate}
                    onChange={(e)=>setStartDate(e.target.value)}
                />
                -
                <Form.Control
                    type="date"
                    id="serchEndDate"
                    name="serchenddate"
                    value={endDate}
                    onChange={(e)=>setEndDate(e.target.value)}
                />
                <Button id="searchUserButton" variant="light" onClick={handleSerchUser} >
                    조회
                </Button>
            </div>
            <hr />
            <div id="userList">
                <div id="countBlock">
                    <Button variant="light" color="red" id="delete" onClick={handleDeleteUser}>
                        삭제
                    </Button>
                    <span>검색결과:{countSerchUser}</span>
                </div>
                <div id="userListHead">
                    <input
                        type="checkbox"
                        id="checkAll"
                        name="checkall"
                        onChange={()=>checkAll({ids})}
                    />
                    아이디
                    <div id="idSortBlock">
                        <button variant="primary" id="idSort"
                         className="sortButton" onClick={()=>{handleButtonActive('id','none')}}>
                        </button>
                        <button variant="primary" id="idSortDESC" 
                        className="sortButton" onClick={()=>{handleButtonActive('id','desc')}}>
                        </button>
                    </div>
                    이름
                    <div id="nameSortBlock">
                        <button variant="primary" id="nameSort"
                         className="sortButton" onClick={()=>{handleButtonActive('name','none')}}>
                        </button>
                        <button variant="primary" id="nameSortDESC" 
                        className="sortButton" onClick={()=>{handleButtonActive('name','desc')}}>
                        </button>
                    </div>
                    <div id="headGroup">
                        그룹
                    </div>
                    수정일자
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
                    <UserListBody userList={userList}/>
                </div>
            </div>
        </div>
    )
}
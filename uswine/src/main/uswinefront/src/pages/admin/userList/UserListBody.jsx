import { useEffect } from "react";
import { Form } from "react-bootstrap";
import AuthApi from "../../../AuthApi";
import { useNavigate } from "react-router-dom";
export default function UserListBody({userList,handleUserCheck,searchType,searchGroup,searchDate,searchWord
,searchcurrentPage,DESC,clickSearch,setClickSearch,userRoleValue,setUserRoleValue,
userNickValue,setUserNickValue}){
    let navigate = useNavigate()

    function changeGroup(value,nickname){
        setUserRoleValue((prevUserRoleValue)=>({
            ...prevUserRoleValue,
            [nickname]:value,
        }))
    }
    function changeNickname(value, origin) {
        setUserNickValue((prevUserNickValue) => ({
          ...prevUserNickValue,
          [origin]: value,
        }));
      }

    function updateUser(user){
        console.log(userNickValue[user.nickname]);
        AuthApi('/api/admin/Update',{
            user,
            changeRole: userRoleValue[user.nickname],
            changeNick: userNickValue[user.nickname]
        }).then((data)=>{
            if (data === 1){
                alert("수정되었습니다.")
                navigate(`/admin/userList/${searchType}/${searchGroup}/${DESC}/${searchcurrentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            }else if(data === -1){
                alert("판매자승인 요청이 존재하지 않습니다.")
                navigate(`/admin/userList/${searchType}/${searchGroup}/${DESC}/${searchcurrentPage}/${searchDate.startDate}/${searchDate.endDate}/${searchWord}`);
                setClickSearch(clickSearch+1)
            }
        })
    }
    useEffect(() => {
        // userList가 변경될 때마다 각 사용자의 역할 값을 userRoleValues 상태에 설정
        if (userList.length > 0) {
            const roleValues = {};
            const nickValues = {};
            userList.forEach(user => {
                roleValues[user.nickname] = user.role === 'ROLE_ADMIN' ? 'admin' : (user.role === 'ROLE_USER' ? 'user' : (user.role === 'ROLE_SELLER' ? 'seller' : 'ban'));
                nickValues[user.nickname] = user.nickname
            });
            setUserRoleValue(roleValues);
            setUserNickValue(nickValues);
        }
    }, [userList]);
    return(
        <>
        {userList.map((user,index) => (
            <div key={index} id={`user_${index}`} style={{ display: 'flex', alignItems: 'center',
            height:'60px',borderBottom:'1px solid #000',width:'100%' }}>
                <input
                    type="checkbox"
                    id={`${user.nickname}`}
                    name="checkbox"
                    className="checkbox"
                    onChange={(e)=>handleUserCheck(e.target.id)}
                    style={{marginLeft: '1%',width:'5%',marginRight:'5%'}}
                />
                <div id={`userEmail_${index}`} style={{width:'15%',display: 'flex', alignItems: 'center',marginRight:'7%',
                whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
                    {user.email}
                </div>
                <div id={`userNickName_${index}`} style={{width:'8%',display: 'flex', alignItems: 'center',marginRight:'14.5%'}}>
                    <Form.Control
                    type="text"
                    id={`userNick_${user.nickname}`}
                    name="userNick"
                    value={
                        userNickValue[user.nickname] || ""
                    }
                    onChange={(e)=>changeNickname(e.target.value,user.nickname)}
                />
                </div>
                
                <div id={`userRole_${index}`} style={{width:'8%',display: 'flex', alignItems: 'center',marginRight:'7.5%'}} >
                    <Form.Select
                        id={`${user.nickname}_group`}
                        name="serchgroup"
                        value={
                            userRoleValue[user.nickname]
                            // user.role === 'ROLE_ADMIN' ? 'admin' : (user.role === 'ROLE_USER' ? 'user' : 'seller')
                        }
                        onChange={(e)=>changeGroup(e.target.value,user.nickname)}
                    >
                        <option value='admin'>관리자</option>
                        <option value='seller'>판매자</option>
                        <option value='user'>사용자</option>
                        <option value = 'ban'>권한 정지</option>
                    </Form.Select>
                </div>
                
                <div id={`joinDate_${index}`} style={{width:'19.4%',display: 'flex', alignItems: 'center',
                whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden',marginRight:'1%'}}>
                    {user.joindate}
                </div>
                <button style={{whiteSpace:'nowrap',width:'70px',justifyContent:'center',
                height:'30px',border:'1px solid black', borderRadius:'5px', fontSize:'14px'}}
                onClick={()=>updateUser(user)}>
                    정보수정
                </button>
            </div>
        ))}
        </>
    )
}
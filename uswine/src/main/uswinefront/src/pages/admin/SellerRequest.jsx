import { useEffect, useState } from "react"
import "../../css/admin/SellerRequest.css"
import AuthApi from "../../AuthApi"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import {
    faAngleLeft,
    faAngleRight,
  } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
export default function SellerRequest(){
    const token = localStorage.getItem("token") || "";
    if (token === "") {
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <SellerRequestComponent userinfo={userinfo} />;
      } else {
        return <></>
      }
      
    }
}
function SellerRequestComponent(){
    const navigate = useNavigate()

    const { page } = useParams()
    const [currentPage,setCurrentPage] = useState(page)
    
    
    const [clickConfirm,setClickConfirm] = useState(0)
    const [sellerRequest,setSellerRequest] = useState([])
    const [totalPage,setTotalPage] = useState('')
    const [phone,setPhone]=useState({})
    useEffect(() => {
        AuthApi('/api/admin/SellerRequest',{
            currentPage
        }).then((data)=>{
            const requestList = data.content
            console.log(requestList)
            setSellerRequest(requestList)
            setTotalPage(data.totalPages+'')
            if(requestList.length>0){
                let phoneValue = {}
                requestList.forEach(request => {
                    phoneValue[request.email] = request.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
                })
                setPhone(phoneValue)
            }
        })
    },[currentPage,clickConfirm])
    function confirmClick(clickedEmail){
        let email = clickedEmail.split('_')[2]
        console.log(email)
        AuthApi('/api/admin/RequestConfirm',{
            email:email
        }).then((data)=>{
            console.log(data)
            navigate(`/admin/sellerRequest/${currentPage}`)
            setClickConfirm(clickConfirm+1)
        })
    }
    function deniedClick(clickedEmail){
        let email = clickedEmail.split('_')[2]
        console.log(email)
        AuthApi('/api/admin/DeniedConfirm',{
            email:email
        }).then((data)=>{
            console.log(data)
            navigate(`/admin/sellerRequest/${currentPage}`)
            setClickConfirm(clickConfirm+1)
        })
    }

    function handlePrevPage(e){
        if(currentPage > 1){
            setCurrentPage(parseInt(currentPage)-1)
            getRequestList(parseInt(currentPage)-1)
        }else{
            alert("첫번째 페이지 입니다.")
        }
    }
    function handleNextPage(e){
        if(currentPage < totalPage){
            setCurrentPage(parseInt(currentPage)+1)
            getRequestList(parseInt(currentPage)+1)
        }else{
            alert("마지막 페이지 입니다.");
        }
    }
    function getRequestList(currentPage){
        navigate(`/admin/sellerRequest/${currentPage}`);
        setClickConfirm(clickConfirm+1)
    }
    return (
        <div id="requestList">
            <div id="requestTitle">
                <h1>판매자 요청</h1>
            </div>
            <div id="requestListHead">
                <div id="headColumn_request" className="headEmail">
                    이메일
                </div>
                <div id="headColumn_request" className="headPhone">
                    휴대전화
                </div>
                <div id="headColumn_request" className="headBank">
                    은행
                </div>
                <div id="headColumn_request" className="headAccount">
                    계좌번호
                </div>
            </div>
            <div id="requestListBody">
                {sellerRequest.map((request,index)=>(
                    <div key={index} style={{ display: 'flex', alignItems: 'center',
                    height:'60px',borderBottom:'1px solid #000',width:'100%' }}>
                        <div id={`request_${request.email}`} style={{width:'35%', display:'flex',
                        justifyContent:'center', marginLeft:'2.5%', marginRight:'0.6%',whiteSpace:'nowrap',
                        textOverflow:'ellipsis',overflow:'hidden'}}>
                            {request.email}
                        </div>
                        <div id={`request_${request.phone}`} style={{width:'10%',marginRight:'4%',
                        whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
                            {phone[request.email]}
                        </div>
                        <div id ={`request_${request.bank}`}style={{width:'10%',display:'flex',
                        justifyContent:'center',marginRight:'5%',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
                            {request.bank}
                        </div>
                        <div id={`request_${request.Account}`} style={{width:'10%',display:'flex',
                        justifyContent:'center',marginRight:'5%'}}>
                            {request.account}
                        </div>
                        <div id="buttonArea_seller">
                            <div id="confirm" className={`confirm_div_${request.email}`}>
                                <Button variant="light" id={`confirm_button_${request.email}`}  onClick={(e)=>confirmClick(e.target.id)}>
                                    수락
                                </Button>
                            </div>
                            <div id="denied" className={`denied_div_${request.email}`}>
                                <Button variant="light" id={`denied_button_${request.email}`}  onClick={(e)=>deniedClick(e.target.id)}>
                                    거절
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="requestListFoot">
                <div className="seller_page_controller">
                    <div className="prev_page" onClick={handlePrevPage}>
                        <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5"/>
                    </div>

                    <div className="seller_page_box">
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
                                .querySelector(".seller_page_box")
                                .classList.remove("error_page");
                            document
                                .querySelector(".page_input")
                                .classList.remove("error_page");
                            setCurrentPage(page);
                            } else {
                            document
                                .querySelector(".seller_page_box")
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
    )
}
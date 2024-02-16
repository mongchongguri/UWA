import { useEffect, useState } from "react"
import AuthApi from "../AuthApi"
import { useNavigate, useParams } from "react-router-dom"
import "../css/Delivery.css"
import DateFormat from "../function/DateFormat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
  } from "@fortawesome/free-solid-svg-icons";
export default function Delivery(){
    const { page } = useParams()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(page)
    const [totalPage,setTotalPage] = useState(1)

    const [deliveryList,setDeliveryList] = useState([]);
    const [deliveryInfoList,setDeliveryInfoList] = useState([]);
    useEffect(() => {
        setDeliveryList([])
        setDeliveryInfoList([])
        AuthApi("/api/delivery/getDeliveryState",{
            currentPage
        }).then((data)=>{
            console.log(data)
            if(data.totalPages != 0){
                setTotalPage(data.totalPages)
            }
            data.content.forEach(([array1,array2])=>{
                setDeliveryList((prevList) => [...prevList, array1]);
                setDeliveryInfoList((prevList) => [...prevList, array2]);
            })
        })
    },[])

    function completeDelivery(id){
        AuthApi("/api/delivery/complete",{
            id
        }).then((data)=>{
            if(data == 1){
                window.location.reload()
            }else{
                alert("다시 시도해 주십시오")
            }
        })
    }

    function prevPageHandler() {
        if (currentPage > 1) {
          navigate(`/delivery/${parseInt(currentPage) - 1}/`);
          setCurrentPage(currentPage - 1);
        } else {
          alert("첫번째 페이지 입니다.");
        }
      }
    
      function nextPageHandler() {
        if (currentPage < totalPage) {
          navigate(
            `/delivery/${parseInt(currentPage, 10) + 1}/`
          );
          setCurrentPage(parseInt(currentPage, 10) + 1);
        } else {
          alert("마지막 페이지 입니다.");
        }
      }

    return (
        <div className="delivery_container">
            <div className="deliver_title">
                <h1>배송 목록</h1>
            </div>
            <div className="delivery_column">
                <ul>
                    <li>
                        운송장 번호
                    </li>
                    <li>
                        판매자
                    </li>
                    <li>
                        택배사
                    </li>
                    <li>
                        배송 시작 시간
                    </li>
                    <li>
                        배송 주소
                    </li>
                    <li>
                        수령인
                    </li>
                    <li></li>
                </ul>
            </div>
            <div className="delivery_body">
                {deliveryList.map(function (delivery, i) {
                    return(
                        <ul key={i} className={i%2 === 0 ? null:"background_change"}>
                            <li>
                                <div className="delivery_body_value">
                                    {delivery.invoiceNumber}
                                </div>
                            </li>
                            <li>
                                <div className="delivery_body_value">
                                    {deliveryInfoList[i].sellername}
                                </div>
                            </li>
                            <li>
                                <div className="delivery_body_value">
                                    {delivery.courierCompany}
                                </div>
                            </li>
                            <li>
                                <div className="delivery_body_value">
                                    {DateFormat(delivery.deliveryTime)}
                                </div>
                            </li>
                            <li>
                                <div className="delivery_body_value">
                                    {deliveryInfoList[i].useraddress}
                                </div>
                            </li>
                            <li>
                                <div className="delivery_body_value">
                                    {deliveryInfoList[i].username}
                                </div>
                            </li>
                            <li>
                                <div className="delivery_body_value">
                                    <button 
                                        className="complete_delivery"
                                        onClick={()=>{completeDelivery(delivery.id)}}
                                    >
                                        배송완료
                                    </button>
                                </div>
                            </li>
                        </ul>
                    )
                })}
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
                        navigate(`/delivery/${currentPage}`);
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
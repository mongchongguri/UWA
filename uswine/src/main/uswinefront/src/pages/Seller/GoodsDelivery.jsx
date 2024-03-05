import { jwtDecode } from "jwt-decode";
import "../../css/seller/GoodsDelivery.css";
import "../../css/seller/SalesManagement.css";
import { useEffect, useState } from "react";
import AuthApi from "../../AuthApi";
import DateFormat from "../../function/DateFormat";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAsyncError } from "react-router-dom";

function GoodsDelivery() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("로그인이 필요한 서비스 입니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    if (userinfo.role != "ROLE_SELLER") {
      alert("권한이 없습니다.");
      window.history.back();
      return <></>;
    } else {
      return <GoodsDeliveryComponent userinfo={userinfo} />;
    }
  }
}

function GoodsDeliveryComponent({ userinfo }) {
  let [orderState, setOrderState] = useState([]);
  let [orderCount, setOrderCount] = useState();
  let [orderCurrentPage, setOrderCurrentPage] = useState(1);
  let [orderTotalPage, setOrderTotalPage] = useState(1);

  let [invokeState, setInvokeState] = useState([]);
  let [invokeCount, setInvokeCount] = useState();
  let [invokeCurrentPage, setInvokeCurrentPage] = useState(1);
  let [invokeTotalPage, setInvokeTotalPage] = useState(1);

  let [deliveryState, setDeliveryState] = useState([]);
  let [deliveryCount, setDeliveryCount] = useState();
  let [deliveryCurrentPage, setDeliveryCurrentPage] = useState(1);
  let [deliveryTotalPage, setDeliveryTotalPage] = useState(1);

  let [completeState, setCompleteState] = useState([]);
  let [completeCount, setCompleteCount] = useState([]);
  let [completeCurrentPage, setCompleteCurrentPage] = useState(1);
  let [completeTotalPage, setCompleteTotalPage] = useState(1);

  let [changeState, setChangeState] = useState(0);
  let [deliverybtn, setDeliverybtn] = useState(false);
  let [deliveryCompany, setDeliveryCompnany] = useState();
  let [invoiceNumber, setInvoiceNumber] = useState();

  let [itemId, setItemId] = useState();
  let [itemState, setItemState] = useState();

  useEffect(() => {
    AuthApi("/api/seller/goods/order", {
      email: userinfo.username,
      page: orderCurrentPage - 1,
    }).then((data) => {
      console.log(data);
      setOrderState(data.content);
      setOrderCount(data.totalElements);
      if (data.totalPages != 0) {
        setOrderTotalPage(data.totalPages);
      }
    });
  }, [orderCurrentPage, changeState]);

  useEffect(() => {
    AuthApi("/api/seller/goods/invoke", {
      email: userinfo.username,
      page: invokeCurrentPage - 1,
    }).then((data) => {
      console.log(data);
      setInvokeState(data.content);
      setInvokeCount(data.totalElements);
      if (data.totalPages != 0) {
        setInvokeTotalPage(data.totalPages);
      }
    });
  }, [invokeCurrentPage, changeState]);

  useEffect(() => {
    AuthApi("/api/seller/goods/delivery", {
      email: userinfo.username,
      page: deliveryCurrentPage - 1,
    }).then((data) => {
      console.log(data);
      setDeliveryState(data.content);
      setDeliveryCount(data.totalElements);
      if (data.totalPages != 0) {
        setDeliveryTotalPage(data.totalPages);
      }
    });
  }, [deliveryCurrentPage, changeState]);

  useEffect(() => {
    AuthApi("/api/seller/goods/complete", {
      email: userinfo.username,
      page: completeCurrentPage - 1,
    }).then((data) => {
      console.log(data);
      setCompleteState(data.content);
      setCompleteCount(data.totalElements);
      if (data.totalPages != 0) {
        setCompleteTotalPage(data.totalPages);
      }
    });
  }, [completeCurrentPage, changeState]);

  function changeStateHandler() {
    const date = new Date();
    let changeState = {
      id: itemId,
      state: itemState,
      timestamp: date,
    };
    if (itemState == 1) {
      changeState.deliveryCompany = deliveryCompany;
      changeState.invoice = invoiceNumber;
    }
    console.log(changeState);
    AuthApi("/api/seller/goods/change", changeState).then((data) => {
      if (data == 1) {
        alert("배송 상태가 업데이트 되었습니다.");
        setChangeState(changeState + 1);
        setDeliverybtn(false);
        window.location.reload();
      }
    });
  }
  return (
    <div className="goods_delivery_container">
      {deliverybtn ? (
        <div className="management_resale_container">
          <div className="management_resale_input_box">
            <p>배송 정보를 입력해주세요.</p>
            <hr />
            <div className="delvery_info_input">
              <input
                type="text"
                placeholder="택배사를 입력해주세요."
                onChange={(e) => {
                  setDeliveryCompnany(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="송장번호를 입력해주세요."
                onChange={(e) => {
                  setInvoiceNumber(e.target.value);
                }}
              />
              <div className="delivery_info_btn_container">
                <button
                  onClick={() => {
                    if (deliveryCompany == "" || invoiceNumber == "") {
                      alert("비어있는 정보가 존재합니다.");
                    } else {
                      changeStateHandler();
                    }
                  }}
                >
                  등록
                </button>
                <button onClick={() => setDeliverybtn(false)}>취소</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="delivery_container">
        <div className="sell_detail_info">
          <div className="sell_wine_count">
            <p>주문 수량</p>
            <p>{orderCount}</p>
          </div>
          <div className="sell_wine_count">
            <p>입고 상태</p>
            <p>{invokeCount}</p>
          </div>
          <div className="sell_wine_count">
            <p>배송 상태</p>
            <p>{deliveryCount}</p>
          </div>
          <div className="sell_wine_count">
            <p>배송 완료</p>
            <p>{completeCount}</p>
          </div>
        </div>
        {/* 배송 관리 */}
        <div className="wine_delivery_state">
          <div className="wine_info_list_container">
            <p className="wine_info_title">주문 현황 ( {orderCount} 개 )</p>
            <ul>
              <li>
                <ul className="sell_wine_list sell_list_title">
                  <li>거래 번호</li>
                  <li>와인 이름</li>
                  <li>배송지</li>
                  <li>판매 재고</li>
                  <li>판매 시간</li>
                  <li>배송 상태</li>
                </ul>
              </li>
              <li className="delivery_list">
                {orderState != null
                  ? orderState.map(function (order, i) {
                      return (
                        <ul className="sell_wine_list" key={i}>
                          <li>{order[0].id}</li>
                          <li>{order[1].wineName}</li>
                          <li>{order[1].useraddress}</li>
                          <li>{order[1].stock}</li>
                          <li>{DateFormat(order[0].orderTime)}</li>
                          <li>
                            <button
                              className="delivery_state_btn"
                              onClick={() => {
                                setItemId(order[0].id);
                                setItemState(0);
                                changeStateHandler();
                              }}
                            >
                              주문 확인
                            </button>
                          </li>
                        </ul>
                      );
                    })
                  : null}
              </li>
            </ul>
            <div className="management_page_controller">
              <div>
                <button
                  onClick={() => {
                    if (orderCurrentPage > 1) {
                      setOrderCurrentPage(orderCurrentPage - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <input
                  type="number"
                  value={orderCurrentPage}
                  onChange={(e) => {
                    setOrderCurrentPage(e.target.value);
                  }}
                />
                /<span>{orderTotalPage}</span>
                <button
                  onClick={() => {
                    if (orderCurrentPage < orderTotalPage) {
                      setOrderCurrentPage(parseInt(orderCurrentPage, 10) + 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 입고 현황 */}
        <div className="wine_delivery_state">
          <div className="wine_info_list_container">
            <p className="wine_info_title">입고 현황 ( {invokeCount} 개 )</p>
            <ul>
              <li>
                <ul className="sell_wine_list sell_list_title">
                  <li>거래 번호</li>
                  <li>와인 이름</li>
                  <li>배송지</li>
                  <li>판매 재고</li>
                  <li>입고 시간</li>
                  <li>배송 상태</li>
                </ul>
              </li>
              <li className="delivery_list">
                {invokeState != null
                  ? invokeState.map(function (order, i) {
                      return (
                        <ul className="sell_wine_list" key={i}>
                          <li>{order[0].id}</li>
                          <li>{order[1].wineName}</li>
                          <li>{order[1].useraddress}</li>
                          <li>{order[1].stock}</li>
                          <li>{DateFormat(order[0].stockingTime)}</li>
                          <li>
                            <button
                              className="delivery_state_btn"
                              onClick={() => {
                                setItemId(order[0].id);
                                setItemState(1);
                                setDeliverybtn(true);
                              }}
                            >
                              배송 시작
                            </button>
                          </li>
                        </ul>
                      );
                    })
                  : null}
              </li>
            </ul>
            <div className="management_page_controller">
              <div>
                <button
                  onClick={() => {
                    if (invokeCurrentPage > 1) {
                      setInvokeCurrentPage(invokeCurrentPage - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <input
                  type="number"
                  value={invokeCurrentPage}
                  onChange={(e) => {
                    setInvokeCurrentPage(e.target.value);
                  }}
                />
                /<span>{invokeTotalPage}</span>
                <button
                  onClick={() => {
                    if (invokeCurrentPage < invokeTotalPage) {
                      setInvokeCurrentPage(parseInt(invokeCurrentPage, 10) + 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 배송 현황 */}
        <div className="wine_delivery_state">
          <div className="wine_info_list_container">
            <p className="wine_info_title">배송 현황 ( {deliveryCount} 개 )</p>
            <ul>
              <li>
                <ul className="sell_wine_list sell_list_title">
                  <li>거래 번호</li>
                  <li>와인 이름</li>
                  <li>배송지</li>
                  <li>판매 재고</li>
                  <li>배송 시간</li>
                  <li>배송 상태</li>
                </ul>
              </li>
              <li className="delivery_list">
                {deliveryState != null
                  ? deliveryState.map(function (order, i) {
                      return (
                        <ul className="sell_wine_list" key={i}>
                          <li>{order[0].id}</li>
                          <li>{order[1].wineName}</li>
                          <li>{order[1].useraddress}</li>
                          <li>{order[1].stock}</li>
                          <li>{DateFormat(order[0].deliveryTime)}</li>
                          <li>배송중</li>
                        </ul>
                      );
                    })
                  : null}
              </li>
            </ul>
            <div className="management_page_controller">
              <div>
                <button
                  onClick={() => {
                    if (deliveryCurrentPage > 1) {
                      setDeliveryCurrentPage(deliveryCurrentPage - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <input
                  type="number"
                  value={deliveryCurrentPage}
                  onChange={(e) => {
                    setDeliveryCurrentPage(e.target.value);
                  }}
                />
                /<span>{deliveryTotalPage}</span>
                <button
                  onClick={() => {
                    if (deliveryCurrentPage < deliveryTotalPage) {
                      setDeliveryCurrentPage(
                        parseInt(deliveryCurrentPage, 10) + 1
                      );
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 배송 완료 */}
        <div className="wine_delivery_state">
          <div className="wine_info_list_container">
            <p className="wine_info_title">배송 완료 ( {completeCount} 개 )</p>
            <ul>
              <li>
                <ul className="sell_wine_list sell_list_title">
                  <li>거래 번호</li>
                  <li>와인 이름</li>
                  <li>배송지</li>
                  <li>판매 재고</li>
                  <li>완료 시간</li>
                  <li>배송 상태</li>
                </ul>
              </li>
              <li className="delivery_list">
                {completeState != null
                  ? completeState.map(function (order, i) {
                      return (
                        <ul className="sell_wine_list" key={i}>
                          <li>{order[0].id}</li>
                          <li>{order[1].wineName}</li>
                          <li>{order[1].useraddress}</li>
                          <li>{order[1].stock}</li>
                          <li>{DateFormat(order[0].completionTime)}</li>
                          <li>배송완료</li>
                        </ul>
                      );
                    })
                  : null}
              </li>
            </ul>
            <div className="management_page_controller">
              <div>
                <button
                  onClick={() => {
                    if (completeCurrentPage > 1) {
                      setCompleteCurrentPage(completeCurrentPage - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <input
                  type="number"
                  value={completeCurrentPage}
                  onChange={(e) => {
                    setCompleteCurrentPage(e.target.value);
                  }}
                />
                /<span>{completeTotalPage}</span>
                <button
                  onClick={() => {
                    if (completeCurrentPage < completeTotalPage) {
                      setCompleteCurrentPage(
                        parseInt(completeCurrentPage, 10) + 1
                      );
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoodsDelivery;

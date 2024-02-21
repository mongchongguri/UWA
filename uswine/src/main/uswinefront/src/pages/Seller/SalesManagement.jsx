import { jwtDecode } from "jwt-decode";
import "../../css/seller/SalesManagement.css";
import { useEffect, useState } from "react";
import AuthApi from "../../AuthApi";
import PhoneNumberFormant from "../../function/PhoneNumberFormat";
import DateFormat from "../../function/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { ServerlessApplicationRepository } from "aws-sdk";

function SalesManagement() {
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
      return <SalesManagementComponent userinfo={userinfo} />;
    }
  }
}

function SalesManagementComponent({ userinfo }) {
  let [info, setInfo] = useState({});

  let [wineList, setWineList] = useState([]);
  let [wineMDList, setWineMDList] = useState([]);
  let [wineMDName, setWineMDName] = useState([]);

  let [soldOutWineList, setSoldOutWineList] = useState([]);
  let [soldOutWineMdList, setSoldOutWineMDList] = useState([]);
  let [soldOutWineMDNameList, setSoldOutWineMdNameList] = useState([]);
  let [transactionList, setTransactionList] = useState([]);
  let [withdrawList, setWithdrawList] = useState([]);

  let [wineCount, setWineCount] = useState(0);
  let [soldOutCount, setSoldOutCount] = useState(0);
  let [transactionCount, setTransactionCount] = useState(0);

  let [viewListState, setViewListState] = useState(1);
  let [withdrawState, setWithdrawState] = useState(false);
  let [withdrawMoney, setWithdrawMoney] = useState();
  let [reSaleState, setReSaleState] = useState(false);
  let [cancelState, setCancelState] = useState(0);
  let [reSaleItemId, setReSaleItemId] = useState();
  let [inputReSaleStock, setInputReSaleStock] = useState();

  let [sellingWineCurrentPage, setSellingWineCurrentPage] = useState(1);
  let [sellingWineTotalPage, setSellingTotalPage] = useState(1);
  let [soldWineCurrentPage, setSoldWineCurrentPage] = useState(1);
  let [soldWineTotalPage, setSoldWineTotalPage] = useState(1);
  let [transactionCurrentPage, setTransactionCurrentPage] = useState(1);
  let [transactionTotalPage, setTransactionTotalPage] = useState(1);
  let [withdrawCurrentPage, setWithdrawCurrentPage] = useState(1);
  let [withdrawTotalPage, setWithdrawTotalPage] = useState(1);

  useEffect(() => {
    if (viewListState == 1) {
      AuthApi("/api/seller/management/info", {
        email: userinfo.username,
        sellingpage: sellingWineCurrentPage - 1,
        soldpage: soldWineCurrentPage - 1,
      }).then((data) => {
        setInfo(data.info);
        setWineList(data.wine.content);
        setWineCount(data.wine.totalElements);
        setSoldOutWineList(data.soldout.content);
        setSoldOutCount(data.soldout.totalElements);

        if (data.wine.totalPages != 0) {
          setSellingTotalPage(data.wine.totalPages);
        }
        if (data.soldout.totalPages != 0) {
          setSoldWineTotalPage(data.soldout.totalPages);
        }
      });
    } else if (viewListState == 0) {
      AuthApi("/api/seller/management/infoMD", {
        email: userinfo.username,
        sellingpage: sellingWineCurrentPage - 1,
        soldpage: soldWineCurrentPage - 1,
      }).then((data) => {
        setInfo(data.info);
        setWineMDList(data.wine.content);
        setWineMDName(data.wineName);
        setWineCount(data.wine.totalElements);

        setSoldOutWineMDList(data.soldout.content);
        setSoldOutCount(data.soldout.totalElements);
        setSoldOutWineMdNameList(data.wineSoldName);

        if (data.wine.totalPages != 0) {
          setSellingTotalPage(data.wine.totalPages);
        }
        if (data.soldout.totalPages != 0) {
          setSoldWineTotalPage(data.soldout.totalPages);
        }
      });
    }
  }, [viewListState, reSaleState, cancelState, withdrawState]);

  useEffect(() => {
    AuthApi("/api/seller/management/transaction", {
      email: userinfo.username,
      page: transactionCurrentPage - 1,
    }).then((data) => {
      setTransactionList(data.content);
      setTransactionCount(data.totalElements);
      if (data.totalPages != 0) {
        setTransactionTotalPage(data.totalPages);
      }
    });
  }, [transactionCurrentPage]);

  useEffect(() => {
    AuthApi("/api/seller/management/withdrawlist", {
      email: userinfo.username,
      page: withdrawCurrentPage,
    }).then((data) => {
      setWithdrawList(data.content);
      if (data.totalPages != 0) {
        setWithdrawTotalPage(data.totalPages);
      }
    });
  }, [withdrawCurrentPage]);

  function reSale(id) {
    setReSaleState(true);
    setReSaleItemId(id);
  }

  function reSaleStock() {
    if (inputReSaleStock > 0) {
      AuthApi("/api/seller/management/resale", {
        id: reSaleItemId,
        reStock: inputReSaleStock,
        document: viewListState,
      }).then((data) => {
        if (data == 1) {
          alert("상품 등록이 완료되었습니다.");
        } else {
          alert("상품 등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
        setReSaleState(false);
      });
    } else {
      alert("재고를 입력해주세요.");
    }
  }

  function wineCancel(id) {
    const cancel = window.confirm("해당 와인 판매를 취소 하시겠습니까?");

    if (cancel) {
      AuthApi("/api/seller/management/resale", {
        id: id,
        reStock: -1,
        document: viewListState,
      }).then((data) => {
        if (data == 1) {
          alert("상품 등록이 취소되었습니다.");
        } else {
          alert("상품 취소에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
        setCancelState(cancelState + 1);
      });
    }
  }

  function withdraw() {
    if (parseInt(withdrawMoney, 10) > parseInt(info.money, 10)) {
      alert("출금 가능 금액 이하로 입력해주세요.");
    } else {
      const date = new Date();
      AuthApi("/api/seller/management/withdraw", {
        email: userinfo.username,
        nickname: userinfo.nickname,
        bank: info.bank,
        account: info.account,
        withdraw: withdrawMoney,
        timestamp: date,
      }).then((data) => {
        if (data == 1) {
          alert("출금이 완료되었습니다.");
        }
        setWithdrawState(false);
      });
    }
  }

  return (
    <div className="sales_management_container">
      <div className="management_container">
        {reSaleState ? (
          <div className="management_resale_container">
            <div className="management_resale_input_box">
              <p>판매할 재고를 입력해주세요.</p>
              <hr />
              <div className="management_resale_input">
                <input
                  type="number"
                  placeholder="재고를 입력해주세요."
                  onChange={(e) => {
                    setInputReSaleStock(e.target.value);
                  }}
                />
                <button onClick={() => reSaleStock()}>등록</button>
                <button onClick={() => setReSaleState(false)}>취소</button>
              </div>
            </div>
          </div>
        ) : null}

        {withdrawState ? (
          <div className="management_resale_container">
            <div className="management_resale_input_box">
              <p>출금할 금액을 입력해주세요.</p>
              <hr />
              <div className="management_resale_input">
                <input
                  type="number"
                  placeholder="금액을 입력해주세요."
                  onChange={(e) => {
                    setWithdrawMoney(e.target.value);
                  }}
                />
                <button onClick={() => withdraw()}>등록</button>
                <button onClick={() => setWithdrawState(false)}>취소</button>
              </div>
              <hr />
              <p style={{ color: "#ff8888" }}>출금 수수료 : 5%</p>
            </div>
          </div>
        ) : null}

        <div className="seller_info_card">
          <div className="seller_detail_info">
            <p className="sell_total_income">총 수익 : {info.totalMoney} 원</p>
            <div className="sell_detail_info">
              <div className="sell_wine_count">
                <p>판매중인 와인</p>
                <p>{wineCount}</p>
              </div>
              <div className="sell_wine_count">
                <p>판매완료 와인</p>
                <p>{soldOutCount}</p>
              </div>
              <div className="sell_wine_count">
                <p>거래 현황</p>
                <p>{transactionCount}</p>
              </div>
              <div className="sell_wine_count">
                <p>출금 가능 금액</p>
                <p>
                  {info.money} <span className="money_unit">원</span>
                </p>
              </div>
            </div>
            <div className="sell_withdraw_container">
              <div>
                <span>{info.bank}</span>
                <span>{info.account}</span>
                <button
                  className="withdraw_btn"
                  onClick={() => setWithdrawState(true)}
                >
                  출금하기
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 판매중인 와인 */}
        <div className="wine_info_title_container">
          <button
            className={viewListState == 1 ? "wine_info_title_button" : "null"}
            onClick={() => {
              setViewListState(1);
            }}
          >
            개인 와인 목록
          </button>
          <button
            className={viewListState == 0 ? "wine_info_title_button" : "null"}
            onClick={() => {
              setViewListState(0);
            }}
          >
            MD 와인 목록
          </button>
        </div>
        <div className="wine_info_list_container">
          <p className="wine_info_title">판매중인 와인</p>
          <ul>
            <li>
              <ul className="sell_wine_list sell_list_title">
                <li>품목 번호</li>
                <li>와인 이름</li>
                <li>판매 금액</li>
                <li>등록 시간</li>
                <li>판매 상태</li>
                <li>재고 현황</li>
                <li>판매 처리</li>
              </ul>
            </li>
            <li>
              {wineList != null && viewListState == 1
                ? wineList.map(function (wine, i) {
                    return (
                      <ul className="sell_wine_list" key={i}>
                        <li>{wine.id}</li>
                        <li>{wine.wineName}</li>
                        <li>{wine.sellMoney}</li>
                        <li>{DateFormat(wine.selldate)}</li>
                        <li>판매중</li>
                        <li>{wine.stock} 개</li>
                        <li>
                          <button
                            className="sell_cancel"
                            onClick={() => {
                              wineCancel(wine.id);
                            }}
                          >
                            판매 취소
                          </button>
                        </li>
                      </ul>
                    );
                  })
                : null}
              {wineMDList != null && viewListState == 0
                ? wineMDList.map(function (wine, i) {
                    return (
                      <ul className="sell_wine_list" key={i}>
                        <li>{wine.id}</li>
                        <li>{wineMDName[i]}</li>
                        <li>{wine.sellMoney}</li>
                        <li>{DateFormat(wine.sellDate)}</li>
                        <li>판매중</li>
                        <li>{wine.sellStock} 개</li>
                        <li>
                          <button
                            className="sell_cancel"
                            onClick={() => {
                              wineCancel(wine.id);
                            }}
                          >
                            판매 취소
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
                  if (sellingWineCurrentPage > 1) {
                    setSellingWineCurrentPage(sellingWineCurrentPage - 1);
                  }
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <input
                type="number"
                value={sellingWineCurrentPage}
                onChange={(e) => {
                  setSellingWineCurrentPage(e.target.value);
                }}
              />
              /<span>{sellingWineTotalPage}</span>
              <button
                onClick={() => {
                  if (sellingWineCurrentPage < sellingWineTotalPage)
                    setSellingWineCurrentPage(
                      parseInt(sellingWineCurrentPage, 10) + 1
                    );
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
        {/* 판매완료 와인 */}
        <div className="wine_info_list_container">
          <p className="wine_info_title">판매완료 와인</p>
          <ul>
            <li>
              <ul className="sell_wine_list sell_list_title">
                <li>품목 번호</li>
                <li>와인 이름</li>
                <li>판매 금액</li>
                <li>등록 시간</li>
                <li>판매 상태</li>
                <li>재고 현황</li>
                <li>판매 처리</li>
              </ul>
            </li>
            <li>
              {soldOutWineList != null
                ? soldOutWineList.map(function (wine, i) {
                    if (wine.stock == 0) {
                      return (
                        <ul className="sell_wine_list" key={i}>
                          <li>{wine.id}</li>
                          <li>{wine.wineName}</li>
                          <li>{wine.sellMoney}</li>
                          <li>{DateFormat(wine.selldate)}</li>
                          <li>판매완료</li>
                          <li>{wine.stock} 개</li>
                          <li>
                            <button
                              className="sell_cancel"
                              onClick={() => reSale(wine.id)}
                            >
                              재등록
                            </button>
                          </li>
                        </ul>
                      );
                    }
                  })
                : null}
              {soldOutWineMdList != null && viewListState == 0
                ? soldOutWineMdList.map(function (wine, i) {
                    return (
                      <ul className="sell_wine_list" key={i}>
                        <li>{wine.id}</li>
                        <li>{soldOutWineMDNameList[i]}</li>
                        <li>{wine.sellMoney}</li>
                        <li>{DateFormat(wine.sellDate)}</li>
                        <li>판매완료</li>
                        <li>{wine.sellStock} 개</li>
                        <li>
                          <button
                            className="sell_cancel"
                            onClick={() => {
                              reSale(wine.id);
                            }}
                          >
                            재등록
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
                  if (soldWineCurrentPage > 1) {
                    setSoldWineCurrentPage(soldWineCurrentPage - 1);
                  }
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <input
                type="number"
                value={soldWineCurrentPage}
                onChange={(e) => {
                  setSoldWineCurrentPage(e.target.value);
                }}
              />
              /<span>{soldWineTotalPage}</span>
              <button
                onClick={() => {
                  if (soldWineCurrentPage < soldWineTotalPage) {
                    setSoldWineCurrentPage(
                      parseInt(soldWineCurrentPage, 10) + 1
                    );
                  }
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
        <div className="wine_info_list_container">
          <p className="wine_info_title">거래 현황</p>
          <ul>
            <li>
              <ul className="sell_wine_list sell_list_title">
                <li>거래 번호</li>
                <li>와인 이름</li>
                <li>판매 금액</li>
                <li>판매 시각</li>
                <li>구매자</li>
                <li>판매 재고</li>
                <li>총 판매 금액</li>
              </ul>
            </li>
            <li>
              {transactionList != null
                ? transactionList.map(function (wine, i) {
                    return (
                      <ul className="sell_wine_list" key={i}>
                        <li>{wine.id}</li>
                        <li>{wine.wineName}</li>
                        <li>{wine.price}</li>
                        <li>{DateFormat(wine.timestamp)}</li>
                        <li>{wine.username}</li>
                        <li>{wine.stock} 개</li>
                        <li>{wine.price * wine.stock} 원</li>
                      </ul>
                    );
                  })
                : null}
            </li>
          </ul>
        </div>
        <div className="management_page_controller">
          <div>
            <button
              onClick={() => {
                if (transactionCurrentPage > 1) {
                  setTransactionCurrentPage(transactionCurrentPage - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <input
              type="number"
              value={transactionCurrentPage}
              onChange={(e) => {
                setTransactionCurrentPage(e.target.value);
              }}
            />
            /<span>{transactionTotalPage}</span>
            <button
              onClick={() => {
                if (transactionCurrentPage < transactionTotalPage) {
                  setTransactionCurrentPage(
                    parseInt(transactionCurrentPage, 10) + 1
                  );
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="wine_info_list_container">
          <p className="wine_info_title">출금 내역</p>
          <ul>
            <li>
              <ul className="sell_wine_list sell_list_title">
                <li>출금 번호</li>
                <li>출금 계좌</li>
                <li>계좌 은행</li>
                <li>출금 시각</li>
                <li>신청 금액</li>
                <li>수수료</li>
                <li>출금 금액</li>
              </ul>
            </li>
            <li>
              {withdrawList != null
                ? withdrawList.map(function (withdraw, i) {
                    return (
                      <ul className="sell_wine_list" key={i}>
                        <li>{withdraw.id}</li>
                        <li>{withdraw.account}</li>
                        <li>{withdraw.bank}</li>
                        <li>{DateFormat(withdraw.timestamp)}</li>
                        <li>
                          {parseInt(withdraw.wihtdraw, 10) +
                            parseInt(withdraw.revenue, 10)}{" "}
                          원
                        </li>
                        <li>{withdraw.revenue} 원</li>
                        <li>{withdraw.wihtdraw} 원</li>
                      </ul>
                    );
                  })
                : null}
            </li>
          </ul>
        </div>
        <div className="management_page_controller">
          <div>
            <button
              onClick={() => {
                if (withdrawCurrentPage > 1) {
                  setWithdrawCurrentPage(withdrawCurrentPage - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <input
              type="number"
              value={withdrawCurrentPage}
              onChange={(e) => {
                setWithdrawCurrentPage(e.target.value);
              }}
            />
            /<span>{withdrawTotalPage}</span>
            <button
              onClick={() => {
                if (withdrawCurrentPage < withdrawTotalPage) {
                  setWithdrawCurrentPage(parseInt(withdrawCurrentPage, 10) + 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesManagement;

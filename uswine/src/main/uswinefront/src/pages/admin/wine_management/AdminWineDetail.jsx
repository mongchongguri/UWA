import React, { useEffect, useState } from "react";
import "../../../css/admin/wine_management/admin_wineDetail.css";
import { useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi";

const AdminWineDetail = () => {
  const { id } = useParams();

  const [mongo, setMongo] = useState({});
  const [mysql, setMysql] = useState({});

  useEffect(() => {
    AuthApi("/api/admin/management/wine/wineDetail", {
      id: id,
    })
      .then((res) => {
        setMongo(res.mongo);
        console.log("MONGO: ", res.mongo);
        setMysql(res.mysql);
        console.log("MYSQL: ", res.mysql);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div id="management_winedetail_container">
      <div id="management_winedetail_content">
        <h1>와인 상세정보</h1>
        <div className="wine_detail_img">
          <img src={mongo.wine_image} alt="wine" />
          <div>
            <ul className="wine_detail_info_list seller_info">
              <li>
                <div className="info_title">판매자</div>
                <div className="info_detail">{mysql.nickname}</div>
              </li>
              <li>
                <div className="info_title">판매금액</div>
                <div className="info_detail">{mysql.sellMoney} 원</div>
              </li>
              <li>
                <div className="info_title">판매처</div>
                <div className="info_detail">
                  <span>{mysql.postCode}</span>
                  <br />
                  <span>{mysql.address}</span>
                </div>
              </li>
              <li>
                <div className="info_title">연락처</div>
                <div className="info_detail">{mysql.phone}</div>
              </li>
              <li>
                <div className="info_title">판매자 정보</div>
                <div className="info_detail">{mysql.sellerInfo}</div>
              </li>
              <li>
                <div className="info_title">남은 수량</div>
                <div className="info_detail">{mysql.stock} 개</div>
              </li>
            </ul>
          </div>
          {/* <div className="wine_buy_btn">
            <button
              onClick={() => {
                navigate(
                  `/onsale/chat/room/${wineInfo.nickName}/${wineInfo.id}`
                );
              }}
            >
              채팅하기
            </button>
            <button>장바구니</button>
            <button>구매하기</button>
          </div>
        </div> */}
          <div className="wine_details_info">
            <ul className="wine_detail_list">
              <li>
                <ul className="wine_detail_info">
                  <li>{mongo.wine_region_info}</li>
                </ul>
              </li>
              <li className="wine_detail_name">{mongo.wine_name}</li>
              <li className="wine_detail_name_en">{mongo.wine_name_en}</li>
              <li className="wine_detail_note">
                {mongo.wine_info[0]} | {mongo.wine_info[1]} |{" "}
                {mongo.wine_info[2]}
              </li>
              <li className="wine_detail_note">
                <p>
                  <b>판매자 추가 정보</b>
                </p>
                {mongo.wine_note}
              </li>
              <li>
                <div className="wine_info_table">
                  {mongo.wine_taste != null
                    ? mongo.wine_taste.map((taste, idx) => {
                        return (
                          <ul className="wine_info_list" key={idx}>
                            <li>{taste[0]}</li>
                            {Array.from({ length: 5 }, (_, i) => {
                              if (taste[1] > i) {
                                return (
                                  <li
                                    className={`wine_detail_taste taste_${
                                      i + 1
                                    }`}
                                  ></li>
                                );
                              } else {
                                return <li className="wine_detail_taste"></li>;
                              }
                            })}
                          </ul>
                        );
                      })
                    : null}
                </div>
              </li>
              <li>
                <div className="wine_detail_aroma">아로마</div>
                <ul className="wine_aroma_list">
                  {mongo.wine_aroma != null
                    ? mongo.wine_aroma.map((aroma, i) => {
                        if (i + 1 === mongo.wine_aroma.length) {
                          return <li>{aroma}</li>;
                        } else {
                          return (
                            <>
                              <li>{aroma}</li>
                              <li style={{ color: "#888" }}>|</li>
                            </>
                          );
                        }
                      })
                    : null}
                </ul>
              </li>
              <li>
                <ul className="wine_detail_info_list">
                  <li>
                    <div className="info_title">생산자</div>
                    <div className="info_detail">
                      {mongo.wine_detail_info[0] == ""
                        ? "정보 없음"
                        : mongo.wine_detail_info[0]}
                    </div>
                  </li>
                  <li>
                    <div className="info_title">국가/샌산지역</div>
                    <div className="info_detail">
                      {mongo.wine_detail_info[1] == ""
                        ? "정보 없음"
                        : mongo.wine_detail_info[1]}
                    </div>
                  </li>
                  <li>
                    <div className="info_title">주요품종</div>
                    <div className="info_detail">
                      {mongo.wine_detail_info[2] == ""
                        ? "정보 없음"
                        : mongo.wine_detail_info[2]}
                    </div>
                  </li>
                  <li>
                    <div className="info_title">스타일</div>
                    <div className="info_detail">
                      {mongo.wine_detail_info[3] == ""
                        ? "정보 없음"
                        : mongo.wine_detail_info[3]}
                    </div>
                  </li>
                  <li>
                    <div className="info_title">양조</div>
                    <div className="info_detail">
                      {mongo.wine_detail_info[4] == ""
                        ? "정보 없음"
                        : mongo.wine_detail_info[4]}
                    </div>
                  </li>
                  <li>
                    <div className="info_title">알코올</div>
                    <div className="info_detail">
                      {mongo.wine_detail_info[5] == ""
                        ? "정보 없음"
                        : mongo.wine_detail_info[5] + " %"}
                    </div>
                  </li>
                  <li>
                    <div className="info_title">음용온도</div>
                    <div className="info_detail">
                      {mongo.wine_detail_info[6] == ""
                        ? "정보 없음"
                        : mongo.wine_detail_info[6]}
                    </div>
                  </li>
                  <li>
                    <div className="info_title">수입사</div>
                    <div className="info_detail">
                      {mongo.wine_detail_info[7] == ""
                        ? "정보 없음"
                        : mongo.wine_detail_info[7]}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWineDetail;

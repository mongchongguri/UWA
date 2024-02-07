import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/home/WineDetailsPage.css";
import "../../../css/home/WineDetailSellInfo.css";
import AuthApi from "../../../AuthApi";
import { jwtDecode } from "jwt-decode";
import {
  faBox,
  faDollarSign,
  faPhone,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PhoneNumberFormant from "../../../function/PhoneNumberFormat";

function WineDetailsPage() {
  let { id } = useParams();

  let [wineDetail, setWineDetail] = useState([]);

  useEffect(() => {
    AuthApi("/api/wine/idx", {
      Id: id,
    }).then((data) => {
      setWineDetail(data);
    });
  }, [id]);

  return (
    <div className="wine_detail_container">
      <div className="wine_detail_component">
        {wineDetail.length === 0 ? (
          <p>정보가 없는 와인입니다.</p>
        ) : (
          <WineDetailComponent wineDetail={wineDetail} />
        )}
      </div>
      {wineDetail.length == 0 ? null : (
        <WineSellInfoComponent wineDetail={wineDetail} />
      )}
    </div>
  );
}

function WineDetailComponent({ wineDetail }) {
  let navigate = useNavigate();

  const token = localStorage.getItem("token") || "";
  let userinfo = null;
  if (token != "") {
    userinfo = jwtDecode(token);
  }

  return (
    <>
      <div className="wine_detail_img">
        <img src={wineDetail.wine_image} alt="" />
      </div>
      <div className="wine_details_info">
        <ul className="wine_detail_list">
          <li>
            <ul className="wine_detail_info">
              <li>{wineDetail.wine_info[0]}</li>
              <li>{wineDetail.wine_info[1]}</li>
              <li style={{ color: "#888" }}>|</li>
              <li>{wineDetail.wine_info[2]}</li>
            </ul>
          </li>
          <li className="wine_detail_name">{wineDetail.wine_name}</li>
          <li className="wine_detail_name_en">{wineDetail.wine_name_en}</li>
          <li className="wine_detail_note">{wineDetail.wine_note}</li>
          <li>
            <div className="wine_info_table">
              {wineDetail.wine_taste.map((taste, idx) => {
                return (
                  <ul className="wine_info_list" key={idx}>
                    <li>{taste[0]}</li>
                    {Array.from({ length: 5 }, (_, i) => {
                      if (taste[1] > i) {
                        return (
                          <li
                            key={i}
                            className={`wine_detail_taste taste_${i + 1}`}
                          ></li>
                        );
                      } else {
                        return <li key={i} className="wine_detail_taste"></li>;
                      }
                    })}
                  </ul>
                );
              })}
            </div>
          </li>
          <li>
            <div className="wine_detail_aroma">아로마</div>
            <ul className="wine_aroma_list">
              {wineDetail.wine_aroma.map((aroma, i) => {
                if (i + 1 === wineDetail.wine_aroma.length) {
                  return <li key={i}>{aroma}</li>;
                } else {
                  return (
                    <React.Fragment key={i}>
                      <li>{aroma}</li>
                      <li style={{ color: "#888" }}>|</li>
                    </React.Fragment>
                  );
                }
              })}
            </ul>
          </li>
          <li>
            <ul className="wine_detail_info_list">
              {Object.entries(wineDetail.wine_detail_info).map((info, i) => {
                return (
                  <li key={i}>
                    <div className="info_title">{info[0]}</div>
                    <div className="info_detail">{info[1]}</div>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            {userinfo != null && userinfo.role == "ROLE_SELLER" ? (
              <div className="wine_detail_btns">
                <button
                  className="sell_btn"
                  onClick={() => {
                    navigate(`/wine/sell/${wineDetail.id}`);
                  }}
                >
                  판매 등록
                </button>
              </div>
            ) : null}
          </li>
        </ul>
      </div>
    </>
  );
}

function WineSellInfoComponent({ wineDetail }) {
  const { kakao } = window;
  let [stores, setStores] = useState([]);

  useEffect(() => {
    AuthApi("/api/seller/info/store", {
      id: wineDetail.id,
    }).then((data) => {
      setStores(data);
    });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=a912192bd381e7addd457d5ba6ddd1b1&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      if(kakao != undefined) {
        kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
  
          const map = new kakao.maps.Map(container, options);
          var geocoder = new kakao.maps.services.Geocoder();
          const zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        });
      }
    });
  }, []);

  return (
    <div className="wine_sell_info">
      <p style={{ fontSize: "20px", fontWeight: "900" }}>와인 판매처</p>
      <p style={{ color: "#888" }}>
        현재 상품이 {stores.length}개의 장소에서 판매중입니다.
      </p>
      <hr />
      <div className="wine_sell_info_container">
        <div className="sell_region_map">
          <div id="map" style={{ width: "450px", height: "450px" }}></div>
        </div>
        <div className="sell_region_info">
          <ul className="sell_store_list">
            {stores.length != 0
              ? stores.map(function (store, i) {
                  return (
                    <div className="store_wine_list" key={i}>
                      <li className="store_region">
                        <div className="store_address">
                          <span>{store.address.substring(0, 5)}</span>
                          <span>{store.address.slice(5)}</span>
                          <span>{store.address.detailAddress}</span>
                          {store.delivery ? (
                            <span>
                              <FontAwesomeIcon
                                icon={faTruckFast}
                                color="#ff5555"
                              />
                            </span>
                          ) : null}
                        </div>
                        <ul className="store_wine_info">
                          <li>{store.nickname}</li>
                          <li>
                            <FontAwesomeIcon
                              className="store_icon"
                              icon={faPhone}
                              size="xs"
                            />
                            {PhoneNumberFormant(store.phone)}
                          </li>
                          <li>
                            <FontAwesomeIcon
                              className="store_icon"
                              icon={faDollarSign}
                            />
                            {store.sellMoney}원
                          </li>
                          <li>
                            <FontAwesomeIcon
                              className="store_icon"
                              icon={faBox}
                            />
                            {store.sellStock}
                          </li>
                        </ul>
                      </li>
                      <li>
                        <hr />
                      </li>
                    </div>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default WineDetailsPage;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/home/WineDetailsPage.css";
import "../../../css/home/WineDetailSellInfo.css";
import AuthApi from "../../../AuthApi";
import { jwtDecode } from "jwt-decode";
import {
  faBox,
  faDollarSign,
  faL,
  faPhone,
  faTruckFast,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PhoneNumberFormant from "../../../function/PhoneNumberFormat";

function WineDetailsPage() {
  const token = localStorage.getItem("token") || "";
  let userinfo = null;
  if (token != "") {
    userinfo = jwtDecode(token);
  }

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
          <WineDetailComponent wineDetail={wineDetail} userinfo={userinfo} />
        )}
      </div>
      {wineDetail.length === 0 || token == "" ? null : (
        <WineSellInfoComponent wineDetail={wineDetail} userinfo={userinfo} />
      )}
    </div>
  );
}

function WineDetailComponent({ wineDetail, userinfo }) {
  let navigate = useNavigate();

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
              <li>
                <FontAwesomeIcon icon={regularStar} size="xl" />
              </li>
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

function WineSellInfoComponent({ wineDetail, userinfo }) {
  let navigate = useNavigate();
  const { kakao } = window;

  let [stores, setStores] = useState([]);
  let [position, setPosition] = useState(null);
  let [currentPosition, setCurrentPosition] = useState([]);
  let [initState, setInitState] = useState();
  let [clickStates, setClickStates] = useState();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(position) {
    setCurrentPosition([position.coords.latitude, position.coords.longitude]);
    console.log(position);
  }

  function error(err) {
    console.log("현재 위치를 가져올 수 없습니다.");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [wineDetail]);

  useEffect(() => {
    AuthApi("/api/seller/info/store", {
      id: wineDetail.id,
    }).then((data) => {
      const initialState = Array.from({ length: data.length }, () => false);
      setStores(data);
      setInitState(initialState);
      setClickStates(initialState);
    });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=a912192bd381e7addd457d5ba6ddd1b1&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(function () {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(currentPosition[0], currentPosition[1]),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        const imageSrc =
          "https://mongchongguriforum.s3.ap-northeast-2.amazonaws.com/maker.png";
        const imageSize = new kakao.maps.Size(64, 80);
        const imageOption = { offset: new kakao.maps.Point(27, 69) };

        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        if (position != null) {
          const geocoder = new kakao.maps.services.Geocoder();

          geocoder.addressSearch(position, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              let marker = new kakao.maps.Marker({
                image: markerImage,
                position: coords,
              });

              map.setCenter(coords);
              marker.setMap(map);
            }
          });
        }
      });
    };
  }, [position, currentPosition]);

  function mapPosition(address, i) {
    setPosition(address);
    let copy = [...initState];
    copy[i] = true;
    setClickStates(copy);
  }

  function cartFunction(store) {
    AuthApi("/api/mypage/cart/buyWine", {
      mongoId: store.itemId,
      username: userinfo.nickname,
      useremail: userinfo.username,
      sellername: store.nickname,
      selleremail: store.email,
      price: store.sellMoney,
      document: 0,
    }).then((data) => {
      if (data === 1) {
        const cart = window.confirm(
          "장바구니에 담았습니다. 장바구니로 이동하시겠습니까?"
        );
        if (cart) {
          navigate("/mypage/cart");
        }
      } else {
        const cart = window.confirm(
          "이미 장바구니에 있는 항목입니다. 장바구니로 이동하시겠습니까?"
        );
        if (cart) {
          navigate("/mypage/cart");
        }
      }
    });
  }

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
                  console.log(store);
                  return (
                    <div
                      className="store_wine_list"
                      key={i}
                      onClick={() => {
                        mapPosition(store.address.slice(5), i);
                      }}
                    >
                      <li
                        className={
                          clickStates[i]
                            ? "store_region store_region_click"
                            : "store_region"
                        }
                      >
                        <div className="store_address">
                          <span>{store.address.substring(0, 5)}</span>
                          <span>{store.address.slice(5)}</span>
                          <span>{store.address.detailAddress}</span>
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
                        <ul className="store_btn_container">
                          <div>
                            <button
                              onClick={() => {
                                navigate(
                                  `/onsale/chat/room/${store.nickname}/${store.itemId}/0`
                                );
                              }}
                            >
                              채팅하기
                            </button>
                            <button
                              onClick={() => {
                                cartFunction(store);
                              }}
                            >
                              장바구니
                            </button>
                          </div>
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

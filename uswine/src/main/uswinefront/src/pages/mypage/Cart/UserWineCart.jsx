import { jwtDecode } from "jwt-decode";
import "../../../css/mypage/userwinecart.css";
import { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopupPostCode from "../../user/Popup";

function UserWineCart() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("로그인이 필요한 서비스 입니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    return <UserWineCartComponent userinfo={userinfo} />;
  }
}
function UserWineCartComponent({ userinfo }) {
  let [userAddress, setUserAddress] = useState();

  let [postCode, setPostCode] = useState("");
  let [address, setAddress] = useState("");
  let [detailAddress, setDetailAddress] = useState("");

  let [changeAddressBtn, setChangeAddressBtn] = useState(false);

  let [carts, setCarts] = useState([]);
  let [buyCount, setBuyCount] = useState([]);
  let [buyCheck, setBuyCheck] = useState([]);

  let [totalPrice, setTotalPrice] = useState(0);
  let [deleteBtn, setDeleteBtn] = useState(0);

  useEffect(() => {
    AuthApi("/api/mypage/cart/userAddress", {
      email: userinfo.username,
    }).then((data) => {
      setUserAddress(data);
    });
  }, []);

  useEffect(() => {
    AuthApi("/api/mypage/cart/getWine", {
      email: userinfo.username,
    }).then((data) => {
      console.log(data);
      setCarts(data);
      setBuyCount(
        Array.from({ length: data.length }, (_, index) => data[index].stock)
      );
      setBuyCheck(Array.from({ length: data.length }, (_, index) => false));
    });
  }, [deleteBtn]);

  useEffect(() => {
    let total = 0;
    setTotalPrice(0);
    for (let i = 0; i < buyCheck.length; i++) {
      if (buyCheck[i]) {
        total = total + parseInt(carts[i].price, 10) * buyCount[i];
      }
    }
    setTotalPrice(total);
  }, [buyCheck, buyCount]);

  function finalbuy() {
    let finalWine = [];
    for (let i = 0; i < buyCheck.length; i++) {
      if (buyCheck[i]) {
        let wine = {
          wineId: carts[i].wineId,
          wineName: carts[i].wineName,
          price: carts[i].price,
          stock: buyCount[i],
          document: carts[i].document,

          selleremail: carts[i].selleremail,
          sellername: carts[i].sellername,
          useremail: userinfo.username,
          username: userinfo.nickname,
          address: userAddress,
        };
        finalWine.push(wine);
      }
    }
    AuthApi("/api/mypage/cart/buy", {
      wineDTO: finalWine,
    }).then((data) => {
      console.log(data);
      let check = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i] != 1) {
          alert("판매상품 혹은 재고 부족으로 인해 상품 구매에 실패했습니다.");
          break;
        }
        check = check + data[i];
      }

      if (check == data.length) {
        alert("상품을 구매했습니다.");
      }
      setDeleteBtn(deleteBtn + 1);
    });
  }

  function deleteCart(id) {
    AuthApi("/api/mypage/cart/deleteCart", {
      id: id,
      useremail: userinfo.username,
    }).then((data) => {
      if (data != 1) {
        alert("이미 삭제된 항목입니다. 다시 확인해주세요!");
      }
      setDeleteBtn(deleteBtn + 1);
    });
  }
  return (
    <div className="cart_container">
      {changeAddressBtn ? (
        <div className="cart_change_address_container">
          <div className="cart_change_address_box">
            <p>변경할 배송지를 입력해주세요.</p>
            <hr style={{ width: "100%", marginBottom: "30px" }} />
            <div className="sell_info_input">
              <div>
                <input
                  type="text"
                  id="postcode"
                  className="sell_postcode input_read_only"
                  onChange={(e) => {
                    setPostCode(e.target.value);
                  }}
                  readOnly={true}
                />
                <PopupPostCode
                  setPostCode={setPostCode}
                  setAddress={setAddress}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="address"
                  className="sell_address input_read_only"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  readOnly={true}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="sell_detail_address"
                  placeholder="상세주소를 입력해주세요."
                  onChange={(e) => {
                    setDetailAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="cart_address_change_btn">
              <button
                onClick={() => {
                  setUserAddress(postCode + address + " " + detailAddress);
                  setChangeAddressBtn(false);
                  alert("배송지가 변경되었습니다.");
                }}
              >
                변경
              </button>
              <button
                onClick={() => {
                  setChangeAddressBtn(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="cart_component">
        <div className="cart_info_container">
          <p style={{ fontSize: "20px", fontWeight: "900" }}>
            {userinfo.nickname}의 장바구니
          </p>
          <p style={{ color: "#888" }}>
            구매하고싶은 항목을 체크하여 최종 구매를 해주세요.
          </p>
          {userAddress ? (
            <p>
              배송지 : ( {userAddress.substring(0, 5)} ) {userAddress.slice(5)}
              <button
                className="delivery_change_address"
                onClick={() => {
                  setChangeAddressBtn(true);
                }}
              >
                배송지 변경
              </button>
            </p>
          ) : null}
          <hr />
        </div>
        <div className="cart_item_list">
          <ul>
            {carts.length == 0
              ? null
              : carts.map(function (cart, i) {
                  return (
                    <div key={i}>
                      <li className="cart_select_container">
                        <input
                          type="checkbox"
                          className="cart_check_box"
                          onChange={() => {
                            let copy = [...buyCheck];
                            copy[i] = copy[i] ? false : true;
                            setBuyCheck(copy);
                          }}
                          checked={buyCheck[i]}
                        />
                        <button
                          onClick={() => {
                            deleteCart(cart.wineId);
                          }}
                        >
                          <FontAwesomeIcon icon={faXmark} color="#ff8888" />
                        </button>
                      </li>
                      <li>
                        <div className="cart_item">
                          <div>
                            <img
                              src={cart.wineImage}
                              alt="wine"
                              className="cart_item_img"
                            />
                            <div className="cart_item_info">
                              <ul>
                                <li>{cart.wineName}</li>
                                {cart.wineNameEn ? (
                                  <li>{cart.wineNameEn}</li>
                                ) : null}
                                <li>
                                  <hr />
                                </li>
                                <li>{cart.price} 원</li>
                                <li>
                                  <button
                                    onClick={() => {
                                      let copy = [...buyCount];
                                      copy[i] = copy[i] - 1;
                                      if (copy[i] < 0) {
                                        copy[i] = 0;
                                      }
                                      setBuyCount(copy);
                                    }}
                                  >
                                    -
                                  </button>
                                  <span>{buyCount[i]}</span>
                                  <button
                                    onClick={() => {
                                      let copy = [...buyCount];
                                      copy[i] = copy[i] + 1;
                                      if (copy[i] < 0) {
                                        copy[i] = 0;
                                      }
                                      setBuyCount(copy);
                                    }}
                                  >
                                    +
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </li>
                    </div>
                  );
                })}
          </ul>
        </div>
        <div className="cart_total_container">
          <div>
            <span>총 금액 : {totalPrice} 원</span>
            <button
              onClick={() => {
                const buy = window.confirm(
                  `총 ${totalPrice}원 입니다. 정말로 결제하시겠습니까?`
                );
                if (buy) {
                  finalbuy();
                }
              }}
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWineCart;

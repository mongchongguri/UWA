import React, { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import "../../../css/admin/admin_chart/admin_pricechart.css";

const PriceChart = () => {
  let [price, setPrice] = useState(0);
  let [withdraw, setWithdraw] = useState(0);
  let [charge, setCharge] = useState(0);

  useEffect(() => {
    AuthApi("/api/admin/chart/pricechart/priceinfo")
      .then((res) => {
        setPrice(res.AllPrice);
        setWithdraw(res.AllWithdraw);
        setCharge(res.AllCharge);
      })
      .catch((error) => console.error(error));
  });

  return (
    <div id="priceChart">
      <div id="allPrice">
        <span>총 판매금액</span>
        <span
          style={{
            width: "30%",
            whiteSpace: "nowrap",
          }}
        >
          &#8361; {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>
      <div id="allWithdraw">
        <span>총 출금금액</span>
        <span
          style={{
            width: "30%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          &#8361; {withdraw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>
      <div id="allCharge">
        <span>총 수수료</span>
        <span
          style={{
            width: "30%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          &#8361; {charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>
    </div>
  );
};

export default PriceChart;

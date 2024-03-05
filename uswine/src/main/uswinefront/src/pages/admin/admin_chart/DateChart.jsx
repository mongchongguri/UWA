import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import AuthApi from "../../../AuthApi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  PointElement
);

const DateChart = () => {
  const [selectValue, setSelectValue] = useState("year");
  const currentYear = new Date().getFullYear();

  // 연도별 선택 시 기본값 설정
  const [startdate, setStartdate] = useState(new Date(currentYear - 4, 0, 1));
  const [enddate, setEndDate] = useState(new Date(currentYear, 11));

  const [memberCount, setMemberCount] = useState([]);
  const [insertWineCount, setInsertWineCount] = useState([]);
  const [doneSellWineCount, setDoneSellWineCount] = useState([]);
  const [priceCount, setPriceCount] = useState([]);
  const [tradeCount, setTradeCount] = useState([]);
  const [withdrawCount, setWithdrawCount] = useState([]);
  const [revenueCount, setRevenueCount] = useState([]);

  let memberCountData = [];
  let insertWineCountData = [];
  let doneSellWineCountData = [];
  let priceCountData = [];
  let tradeCountData = [];
  let withdrawCountData = [];
  let revenueCountData = [];

  let labels = [];
  if (selectValue === "year") {
    for (let i = startdate.getFullYear(); i <= enddate.getFullYear(); i++) {
      labels.push("" + i + "");
      memberCountData.push(memberCount.hasOwnProperty(i) ? memberCount[i] : 0);
      insertWineCountData.push(insertWineCount[i]);
      doneSellWineCountData.push(doneSellWineCount[i]);
      priceCountData.push(priceCount[i]);
      tradeCountData.push(tradeCount[i]);
      withdrawCountData.push(withdrawCount[i]);
      revenueCountData.push(revenueCount[i]);
    }
  } else if (selectValue === "month") {
    let label = Object.keys(tradeCount);
    for (let i = 0; i < label.length; i++) {
      labels.push(label[i]);
    }

    let memberCountList = Object.values(memberCount);
    let insertWineCountList = Object.values(insertWineCount);
    let doneSellWineCountList = Object.values(doneSellWineCount);
    let tradeCountList = Object.values(tradeCount);
    let priceList = Object.values(priceCount);
    let withdrawList = Object.values(withdrawCount);
    let revenueList = Object.values(revenueCount);

    memberCountList.forEach((value) => memberCountData.push(value));
    insertWineCountList.forEach((value) => insertWineCountData.push(value));
    doneSellWineCountList.forEach((value) => doneSellWineCountData.push(value));
    tradeCountList.forEach((value) => tradeCountData.push(value));
    priceList.forEach((value) => priceCountData.push(value));
    withdrawList.forEach((value) => withdrawCountData.push(value));
    revenueList.forEach((value) => revenueCountData.push(value));
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "회원가입수",
        data: memberCountData,
        borderColor: "#C84361",
        backgroundColor: "#C84361",
      },
      {
        label: "와인등록수",
        data: insertWineCountData,
        borderColor: "#E78775",
        backgroundColor: "#E78775",
      },
      {
        label: "품절와인수",
        data: doneSellWineCountData,
        borderColor: "#ABCDCB",
        backgroundColor: "#ABCDCB",
      },
      {
        label: "거래수량",
        data: tradeCountData,
        borderColor: "#EBE59B",
        backgroundColor: "#EBE59B",
      },
    ],
  };

  const data_price = {
    labels: labels,
    datasets: [
      {
        label: "총 판매금액",
        data: priceCountData,
        borderColor: "#C84361",
        backgroundColor: "#C84361",
      },
      {
        label: "총 출금금액",
        data: withdrawCountData,
        borderColor: "#E78775",
        backgroundColor: "#E78775",
      },
      {
        label: "총 수수료",
        data: revenueCountData,
        borderColor: "#ABCDCB",
        backgroundColor: "#ABCDCB",
      },
    ],
  };

  const options = {
    type: Line,
    responsive: true,
    aspectRatio: 4,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Total Chart",
      },
    },
  };

  const options_price = {
    type: Line,
    responsive: true,
    aspectRatio: 4,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Price Chart",
      },
    },
  };

  useEffect(() => {
    AuthApi("/api/admin/chart/dateChart", {
      startdate: startdate,
      enddate: enddate,
      selectValue: selectValue,
    })
      .then((res) => {
        console.log(res);
        setMemberCount(res.memberCount);
        setInsertWineCount(res.insertWineCount);
        setDoneSellWineCount(res.doneSellWineCount);
        setPriceCount(res.priceCount);
        setTradeCount(res.tradeCount);
        setWithdrawCount(res.withdrawCount);
        setRevenueCount(res.revenueCount);
      })
      .catch((error) => console.error(error));
  }, [startdate, enddate, selectValue]);

  // ============= 구성이 필요한 부분 =============
  // 1. 회원가입수
  // 2. 와인 등록수
  // 3. 품절 와인수
  // 4. 거래수량
  // 5. 총 판매금액

  return (
    <div style={{ margin: "30px 0" }}>
      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <select
            onChange={(e) => setSelectValue(e.target.value)}
            defaultValue={0}
            style={{ height: "40px", textAlign: "center" }}
            id="yearMonthSelect"
          >
            <option value={"year"}>연도별</option>
            <option value={"month"}>월별</option>
          </select>
        </div>
        <div>
          {selectValue == "year" ? (
            <div style={{ display: "flex", gap: "50px" }}>
              <ReactDatePicker
                selected={startdate}
                dateFormat="yyyy" // Change time format
                onChange={(date) => setStartdate(date)}
                showPopperArrow={true} // Change arrow
                style={{ marginRight: "10px", marginLeft: "0" }}
                showYearPicker
              />
              <span>~</span>
              <ReactDatePicker
                selected={enddate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                dateFormat="yyyy" // Change time format
                showPopperArrow={true} // Change arrow
                style={{ marginLeft: "0" }}
                showYearPicker
              />
            </div>
          ) : (
            <div style={{ display: "flex", gap: "50px" }}>
              <ReactDatePicker
                selected={startdate}
                onChange={(date) => {
                  setStartdate(date);
                }}
                dateFormat="yyyy-MM" // Change time format
                showPopperArrow={true} // Change arrow
                style={{ marginRight: "10px", marginLeft: "0" }}
                showMonthYearPicker
              />
              <span>~</span>
              <ReactDatePicker
                selected={enddate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                dateFormat="yyyy-MM" // Change time format
                showPopperArrow={true} // Change arrow
                style={{ marginLeft: "0" }}
                showMonthYearPicker
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <div id="dateChart">
          {memberCount.length == 0 ? (
            <p>데이터를 조회 해주세요</p>
          ) : (
            <div>
              <Line data={data} options={options} style={{ height: "500px" }} />
            </div>
          )}
        </div>
        <div id="dateChart">
          {memberCount.length == 0 ? (
            <p>데이터를 조회 해주세요</p>
          ) : (
            <div>
              <Line
                data={data_price}
                options={options_price}
                style={{ height: "500px", marginTop: "30px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateChart;

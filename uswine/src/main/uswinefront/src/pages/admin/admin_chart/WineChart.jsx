import React, { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const WineChart = () => {
  let [wineCount, setWineCount] = useState([]);
  let [sellingWine, setSellingWine] = useState([]);
  let [doneWine, setDoneWine] = useState([]);
  let [breakWine, setBreakWine] = useState([]);
  let [tradeCount, setTradeCount] = useState([]);

  useEffect(() => {
    AuthApi("/api/admin/chart/winechart/wineinfo")
      .then((res) => {
        setWineCount(res.AllWineCount);
        setSellingWine(res.SellCoount);
        setDoneWine(res.SellDoneWineCount);
        setBreakWine(res.SellBreakWineCount);
        setTradeCount(res.TransferWineCount);
      })
      .catch((error) => console.error(error));
  }, []);

  const wine_labels = ["등록", "판매중", "품절", "판매취소", "거래수량"];

  const data = {
    labels: wine_labels,
    datasets: [
      {
        label: "수량",
        data: [wineCount, sellingWine, doneWine, breakWine, tradeCount],
        backgroundColor: "#aaa",
        borderColor: "black",
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Wine Chart",
      },
      datalabels: {
        color: "black",
        font: {
          weight: "bold",
        },
      },
    },
  };

  return (
    <div id="WineChart" style={{ width: "300px", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WineChart;

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

const MemberCount = () => {
  let [sellerCount, setSellerCount] = useState(0);
  let [adminCount, setAdminCount] = useState(0);
  let [userCount, setUserCount] = useState(0);

  useEffect(() => {
    AuthApi("/api/admin/chart/membernumber/labelsdata")
      .then((res) => {
        setSellerCount(res.seller.length);
        setAdminCount(res.admin.length);
        setUserCount(res.user.length);
      })
      .catch((error) => console.error(error));
  }, []);

  const labels = ["판매자", "관리자", "사용자"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "회원수",
        data: [sellerCount, adminCount, userCount],
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
        text: "Member Chart",
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
    <div id="memberCountChart" style={{ width: "300px", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MemberCount;

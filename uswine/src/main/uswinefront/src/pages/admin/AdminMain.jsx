import React from "react";
import "../../css/admin/admin_chart/admin_chart.css";
import MemberCount from "./admin_chart/MemberCount";
import WineChart from "./admin_chart/WineChart";
import PriceChart from "./admin_chart/PriceChart";
import AllTradeChart from "./admin_chart/AllTradeChart";
import AllWithdrawChart from "./admin_chart/AllWithdrawChart";
import DateChart from "./admin_chart/DateChart";

const AdminMain = () => {
  return (
    <div id="chart_container">
      <div id="chart_content_container">
        <MemberCount />
        <WineChart />
        <PriceChart />
      </div>
      <div>
        <DateChart />
        <AllTradeChart />
        <AllWithdrawChart />
      </div>
    </div>
  );
};

export default AdminMain;

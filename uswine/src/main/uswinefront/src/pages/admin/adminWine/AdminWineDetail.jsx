import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi";

import "../../../css/admin/admin_wine/AdminWineDetail.css"

export default function AdminWineDetail(){
    const token = localStorage.getItem("token") || "";
    if (token === "") {
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <AdminWineDetailComponet userinfo={userinfo} />;
      } else {
        return <></>
      }
      
    }
}

function AdminWineDetailComponet(){
  let { id } = useParams();
  let [wineDetail, setWineDetail] = useState([]);

  useEffect(() => {
    AuthApi("/api/wine/idx", {
      Id: id,
    }).then((data) => {
      setWineDetail(data);
    });
  }, [id]);
  
  return(
    <div id="admin_wine_detail_container">
        <div className="admin_wine_detail_component">
          {wineDetail.length === 0 ? (
            <p>정보가 없는 와인입니다.</p>
          ) : (
            <GetWineDetail wineDetail={wineDetail} id={id} />
          )}
        </div>
    </div>
  )
}
function GetWineDetail({wineDetail,id}){
  function delete_wine(){
    AuthApi("/api/admin/wineDelete",{
      id
    }).then((data)=>{
      console.log(data)
      if(data ===1){
        alert("삭제되었습니다.")
        window.history.back()
      }else{
        alert("삭제에 실패하였습니다.")
      }
    })
  }
  return(
    <>
      <div className="admin_wine_detail_img">
        <img src={wineDetail.wine_image} alt="" />
      </div>
      <div className="admin_wine_details_info">
        <ul className="admin_wine_detail_list">
          <li>
            <ul className="admin_wine_detail_info">
              <li>{wineDetail.wine_info[0]}</li>
              <li>{wineDetail.wine_info[1]}</li>
              <li style={{ color: "#888" }}>|</li>
              <li>{wineDetail.wine_info[2]}</li>
            </ul>
          </li>
          <li className="admin_wine_detail_name">{wineDetail.wine_name}</li>
          <li className="admin_wine_detail_name_en">{wineDetail.wine_name_en}</li>
          <li className="admin_wine_detail_note">{wineDetail.wine_note}</li>
          <li>
            <div className="admin_wine_info_table">
              {wineDetail.wine_taste.map((taste, idx) => {
                return (
                  <ul className="admin_wine_info_list" key={idx}>
                    <li>{taste[0]}</li>
                    {Array.from({ length: 5 }, (_, i) => {
                      if (taste[1] > i) {
                        return (
                          <li
                            className={`admin_wine_detail_taste taste_${i + 1}`}
                          ></li>
                        );
                      } else {
                        return <li className="admin_wine_detail_taste"></li>;
                      }
                    })}
                  </ul>
                );
              })}
            </div>
          </li>
          <li>
            <div className="admin_wine_detail_aroma">아로마</div>
            <ul className="admin_wine_aroma_list">
              {wineDetail.wine_aroma.map((aroma, i) => {
                if (i + 1 === wineDetail.wine_aroma.length) {
                  return <li>{aroma}</li>;
                } else {
                  return (
                    <>
                      <li>{aroma}</li>
                      <li style={{ color: "#888" }}>|</li>
                    </>
                  );
                }
              })}
            </ul>
          </li>
          <li>
            <ul className="admin_wine_detail_info_list">
              {Object.entries(wineDetail.wine_detail_info).map((info, i) => {
                return (
                  <li key={i}>
                    <div className="admin_info_title">{info[0]}</div>
                    <div className="admin_info_detail">{info[1]}</div>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <div className="admin_wine_detail_btns">
              <button className="admin_wine_delete_btn" onClick={delete_wine}>와인 삭제</button>
            </div>
          </li>
          
        </ul>
      </div>
    </>
  )
}
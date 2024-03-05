import React, { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import { useNavigate, useParams } from "react-router-dom";

const AdminSellerWineDetail = () => {
  let { id } = useParams();

  const [mongodata, setMongodata] = useState([]);

  useEffect(() => {
    AuthApi("/api/admin/management/wine/sellerdetail", {
      id: id,
    }).then((data) => {
      setMongodata(data.mongo);
    });
  }, [id]);

  return (
    <div id="admin_wine_detail_container">
      <div className="admin_wine_detail_component">
        {mongodata.length === 0 ? (
          <p>정보가 없는 와인입니다.</p>
        ) : (
          <GetWineDetail mongodata={mongodata} id={id} />
        )}
      </div>
    </div>
  );
};

function GetWineDetail({ mongodata, id }) {
  let navigate = useNavigate();

  function delete_sellerWine() {
    AuthApi("/api/admin/management/wine/sellerwine/delete", {
      id,
    }).then((data) => {
      if (data === 1) {
        alert("삭제되었습니다.");
        navigate("/admin/management/sellerwine");
      } else {
        alert("삭제에 실패하였습니다.");
      }
    });
  }
  return (
    <>
      <div className="admin_wine_detail_img">
        <img src={mongodata.wineImageURL} alt="" />
      </div>
      <div className="admin_wine_details_info">
        <ul className="admin_wine_detail_list">
          <li>
            <ul className="admin_wine_detail_info">
              <li>{mongodata.wineInfo}</li>
              <li>{mongodata.wineInfo}</li>
              <li style={{ color: "#888" }}>|</li>
              <li>{mongodata.wineInfo}</li>
            </ul>
          </li>
          <li className="admin_wine_detail_name">{mongodata.wineName}</li>
          <li className="admin_wine_detail_name_en">{mongodata.wineNameEn}</li>
          {/* <li className="admin_wine_detail_note">{mongodata.wineNote}</li> */}
          <li>
            <div className="admin_wine_info_table">
              {mongodata.wineTaste.map((taste, i) => {
                return (
                  <ul className="admin_wine_info_list" key={i}>
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
              {mongodata.wineAroma.map((aroma, i) => {
                if (i + 1 === mongodata.wineAroma.length) {
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
            {/* <ul className="admin_wine_detail_info_list">
                {Object.entries(mongodata.wine_detail_info).map((info, i) => {
                return (
                    <li key={i}>
                    <div className="admin_info_title">{info[0]}</div>
                    <div className="admin_info_detail">{info[1]}</div>
                    </li>
                );
                })}
            </ul> */}
          </li>
          <li>
            <div className="admin_wine_detail_btns">
              <button
                className="admin_wine_delete_btn"
                onClick={delete_sellerWine}
              >
                와인 삭제
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminSellerWineDetail;

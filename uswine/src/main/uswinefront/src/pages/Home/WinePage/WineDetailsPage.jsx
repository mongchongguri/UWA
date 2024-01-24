import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../css/home/WineDetailsPage.css";
import  AuthApi  from "../../../AuthApi";

function WineDetailsPage() {
  let { id } = useParams();

  let [wineDetail, setWineDetail] = useState([]);

  useEffect(() => {
    AuthApi("/api/wine/idx",{
      Id: id,
    }).then((data) => {
        console.log(data);
        setWineDetail(data);
      })
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
    </div>
  );
}

function WineDetailComponent({ wineDetail }) {
  return (
    <>
      <div className="wine_detail_img">
        <img src={wineDetail.wine_image} alt=""/>
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
                            className={`wine_detail_taste taste_${i + 1}`}
                          ></li>
                        );
                      } else {
                        return <li className="wine_detail_taste"></li>;
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
            <div className="wine_detail_btns">
              <button className="sell_btn">판매 등록</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default WineDetailsPage;

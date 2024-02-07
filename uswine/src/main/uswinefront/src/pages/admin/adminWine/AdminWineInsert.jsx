import { jwtDecode } from "jwt-decode";
import "../../../css/admin/AdminWineInsert.css"
import { useState } from "react";
import AwsUpload from "../../../function/AWSs3"
import AuthApi from "../../../AuthApi";
import { useNavigate } from "react-router-dom";
export default function WineInsert(){
    const token = localStorage.getItem("token") || "";
    if (token === "") {
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <WineInsertComponent userinfo={userinfo} />;
      } else {
        return <></>
      }
      
    }
}

function WineInsertComponent(){
    const navigate = useNavigate();
    const [uploadImgUrtl,setUploadImgUrl] = useState("")
    const [wineType,setWineType] = useState("")
    const [wineOriginCountry,setOriginCountry] = useState("")
    const [wineOriginCity,setOriginCity] = useState("")
    const [wineName,setWineName] = useState("")
    const [wineNameEN,setWineNameEN] = useState("")
    const [wineTasteSugar,setWineTasteSugar] = useState("")
    const [wineTasteAcidity,setWineTasteAcidity] = useState("")
    const [wineTasteBodied,setWineTasteBodied] = useState("")
    const [wineTasteTannin,setWineTasteTannin] = useState("")
    const [wineStyle,setWineStyle] = useState("")
    const [wineBrewing,setWineBrewing] = useState("")
    const [wineMature,setWineMature] = useState("")
    const [wineAlcohol,setWineAlcohol] = useState("")
    const [wineTemperature,setWineTemperature]=useState("")
    const [wineImporter,setWineImporter] = useState("")
    const [wineNote,setWineNote]=useState("")
    const [wineVariety,setWineVariety]=useState("")

    const [firstAroma,setFirstAroma] = useState("")
    const [aromas, setAromas] = useState([]);
    async function handleImg(id){
        const input = document.getElementById(id);
        const file = input.files?.[0];
        console.log(file)
        try {
            const upload = AwsUpload("notice", file);
    
            const IMG_URL = await upload.promise().then((res) => res.Location);
            console.log(IMG_URL);
            setUploadImgUrl(IMG_URL)
            
          } catch (error) {
            console.log(error);
          }
    }
    function wineInsertSubmit(){
        console.log(uploadImgUrtl)
        let wine_citys = wineOriginCity.split(',')
        let wine_country_city = wineOriginCountry
        wine_citys.forEach((city)=>{
            wine_country_city += " > " + city
        })
        let wineCountry = wineOriginCountry.split('(')[0]
        let wineCity = wine_citys.pop().split('(')[0]
        let wineInfo = [wineType,wineCountry,wineCity] 
        let wineTaste = [["당도",wineTasteSugar],["산도",wineTasteAcidity],["바디",wineTasteBodied],["타닌",wineTasteTannin]]
        let insertAromas = [firstAroma,...aromas]

        let manufacturer = wineName.split(',')[0]+"("+wineNameEN.split(',')[0]+")"
        

        AuthApi('/api/admin/wineInsert',{
            wineInfo,
            wineTaste,
            insertAromas,
            wineStyle,
            wineBrewing,
            wineMature,
            wineAlcohol,
            wineTemperature,
            wineImporter,
            wineNote,
            uploadImgUrtl,
            wine_country_city,
            wineName,
            wineNameEN,
            manufacturer,
            wineVariety,

        }).then((data)=>{
            console.log(data)
            if(data === 1){
                alert("등록되었습니다.")
                navigate('/admin/wineList')
            }else{
                alert("등록에 실패하였습니다.")
            }
        })
    }
    const handleAddInput = () => {
        setAromas([...aromas, '']);
    };

    const handleRemoveInput = (index) => {
        const newAromas = [...aromas];
        newAromas.splice(index, 1);
        setAromas(newAromas);
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...aromas];
        newInputs[index] = value;
        setAromas(newInputs);
    };


    return(
        <div id="admin_wine_insert_container">
            <div className="wine_insert_title">
                <h1>와인 등록</h1>
            </div>
            
            <div id="admin_wineImg_insert">
                <span>이미지 등록 : </span>
                <input
                    id="inputImg" 
                    type="file"
                    accept="image/*"
                    onChange={(e)=>handleImg(e.target.id)}
                />
                <img src={uploadImgUrtl} id="admin_wine_insert_img"/>
            </div>
            <div id="admin_wine_info_insert">
                <input type="text" id="admin_wine_info_name" className="admin_wine_info"
                value={wineName} onChange={(e)=>setWineName(e.target.value)} placeholder="와인이름"/>
                <input type="text" id="admin_wine_info_name_en" className="admin_wine_info"
                value={wineNameEN} onChange={(e)=>setWineNameEN(e.target.value)} placeholder="와인이름(영어)"/>

                <input type="text" id="admin_wine_info_type" className="admin_wine_info"
                value={wineType} onChange={(e)=>setWineType(e.target.value)} placeholder="와인종류"/>
                <div id="input_wine_region">
                    <span>
                        -와인 생산지 입력시 한글과 영어로 둘다 입력해주세요
                    </span>
                    <input type="text" id="admin_wine_info_origin_country" className="admin_wine_info" 
                    value={wineOriginCountry} onChange={(e)=>setOriginCountry(e.target.value)} placeholder="와인 생산지(국가)"/>
                    <input type="text" id="admin_wine_info_origin_city" className="admin_wine_info" 
                    value={wineOriginCity} onChange={(e)=>setOriginCity(e.target.value)} placeholder="와인 생산지(생산지역)-구분이 필요하면 ,로 구분"/>
                </div>

                <input type="text" id="admin_wine_info_style" className="admin_wine_info" 
                value={wineStyle} onChange={(e)=>setWineStyle(e.target.value)} placeholder="와인 스타일"/>
                <input type="text" id="admin_wine_info_variety" className="admin_wine_info" 
                value={wineVariety} onChange={(e)=>setWineVariety(e.target.value)} placeholder="주요 품종"/>
                <input type="text" id="admin_wine_info_brewing" className="admin_wine_info" 
                value={wineBrewing} onChange={(e)=>setWineBrewing(e.target.value)} placeholder="와인 양조"/>
                <input type="text" id="admin_wine_info_mature" className="admin_wine_info" 
                value={wineMature} onChange={(e)=>setWineMature(e.target.value)} placeholder="와인 숙성"/>
                <div id="input_wine_degree">
                    <span>%를 뒤에 붙여주세요</span>
                    <input type="text" id="admin_wine_info_alcohol" className="admin_wine_info" 
                    value={wineAlcohol} onChange={(e)=>setWineAlcohol(e.target.value)} placeholder="와인 도수"/>
                    <span>℃를 뒤에 붙여주세요</span>
                    <input type="text" id="admin_wine_info_temperature" className="admin_wine_info" 
                    value={wineTemperature} onChange={(e)=>setWineTemperature(e.target.value)} placeholder="와인 음용 온도"/>
                </div>

                <div id="input_wine_taste">
                    <div id="admin_wine_info_taste">
                        <span>당도  </span>
                        <label htmlFor="admin_wine_info_sugar"  >1</label>
                        <input type="radio" id="admin_wine_info_sugar" name="admin_wine_info_sugar"
                        value={"1"} onChange={(e)=>setWineTasteSugar(e.target.value)}/>
                        <label htmlFor="admin_wine_info_sugar" >2</label>
                        <input type="radio" id="admin_wine_info_sugar" name="admin_wine_info_sugar"
                        value={"2"} onChange={(e)=>setWineTasteSugar(e.target.value)}/>
                        <label htmlFor="admin_wine_info_sugar" >3</label>
                        <input type="radio" id="admin_wine_info_sugar" name="admin_wine_info_sugar"
                        value={"3"} onChange={(e)=>setWineTasteSugar(e.target.value)}/>
                        <label htmlFor="admin_wine_info_sugar" >4</label>
                        <input type="radio" id="admin_wine_info_sugar" name="admin_wine_info_sugar"
                        value={"4"} onChange={(e)=>setWineTasteSugar(e.target.value)}/>
                        <label htmlFor="admin_wine_info_sugar" >5</label>
                        <input type="radio" id="admin_wine_info_sugar" name="admin_wine_info_sugar"
                        value={"5"} onChange={(e)=>setWineTasteSugar(e.target.value)}/>
                    </div>
                    <div id="admin_wine_info_taste">
                        <span>산도  </span>
                        <label htmlFor="admin_wine_info_acidity">1</label>
                        <input type="radio" id="admin_wine_info_acidity" name="admin_wine_info_acidity"
                        value={"1"} onChange={(e)=>setWineTasteAcidity(e.target.value)}/>
                        <label htmlFor="admin_wine_info_acidity">2</label>
                        <input type="radio" id="admin_wine_info_acidity" name="admin_wine_info_acidity"
                        value={"2"} onChange={(e)=>setWineTasteAcidity(e.target.value)}/>
                        <label htmlFor="admin_wine_info_acidity">3</label>
                        <input type="radio" id="admin_wine_info_acidity" name="admin_wine_info_acidity"
                        value={"3"} onChange={(e)=>setWineTasteAcidity(e.target.value)}/>
                        <label htmlFor="admin_wine_info_acidity">4</label>
                        <input type="radio" id="admin_wine_info_acidity" name="admin_wine_info_acidity"
                        value={"4"} onChange={(e)=>setWineTasteAcidity(e.target.value)}/>
                        <label htmlFor="admin_wine_info_acidity">5</label>
                        <input type="radio" id="admin_wine_info_acidity" name="admin_wine_info_acidity"
                        value={"5"} onChange={(e)=>setWineTasteAcidity(e.target.value)}/>
                    </div>
                    <div id="admin_wine_info_taste">
                        <span>바디  </span>
                        <label htmlFor="admin_wine_info_bodied">1</label>
                        <input type="radio" id="admin_wine_info_bodied" name="admin_wine_info_bodied"
                        value={"1"} onChange={(e)=>setWineTasteBodied(e.target.value)}/>
                        <label htmlFor="admin_wine_info_bodied">2</label>
                        <input type="radio" id="admin_wine_info_bodied" name="admin_wine_info_bodied"
                        value={"2"} onChange={(e)=>setWineTasteBodied(e.target.value)}/>
                        <label htmlFor="admin_wine_info_bodied">3</label>
                        <input type="radio" id="admin_wine_info_bodied" name="admin_wine_info_bodied"
                        value={"3"} onChange={(e)=>setWineTasteBodied(e.target.value)}/>
                        <label htmlFor="admin_wine_info_bodied">4</label>
                        <input type="radio" id="admin_wine_info_bodied" name="admin_wine_info_bodied"
                        value={"4"} onChange={(e)=>setWineTasteBodied(e.target.value)}/>
                        <label htmlFor="admin_wine_info_bodied">5</label>
                        <input type="radio" id="admin_wine_info_bodied" name="admin_wine_info_bodied"
                        value={"5"} onChange={(e)=>setWineTasteBodied(e.target.value)}/>
                    </div>
                    <div id="admin_wine_info_taste">
                        <span>타닌  </span>
                        <label htmlFor="admin_wine_info_tannin">1</label>
                        <input type="radio" id="admin_wine_info_tannin" name="admin_wine_info_tannin"
                        value={"1"} onChange={(e)=>setWineTasteTannin(e.target.value)}/>
                        <label htmlFor="admin_wine_info_tannin">2</label>
                        <input type="radio" id="admin_wine_info_tannin" name="admin_wine_info_tannin"
                        value={"2"} onChange={(e)=>setWineTasteTannin(e.target.value)}/>
                        <label htmlFor="admin_wine_info_tannin">3</label>
                        <input type="radio" id="admin_wine_info_tannin" name="admin_wine_info_tannin"
                        value={"3"} onChange={(e)=>setWineTasteTannin(e.target.value)}/>
                        <label htmlFor="admin_wine_info_tannin">4</label>
                        <input type="radio" id="admin_wine_info_tannin" name="admin_wine_info_tannin"
                        value={"4"} onChange={(e)=>setWineTasteTannin(e.target.value)}/>
                        <label htmlFor="admin_wine_info_tannin">5</label>
                        <input type="radio" id="admin_wine_info_tannin" name="admin_wine_info_tannin"
                        value={"5"} onChange={(e)=>setWineTasteTannin(e.target.value)}/>
                    </div>
                </div>

                <input type="text" id="admin_wine_info_importer" className="admin_wine_info" 
                value={wineImporter} onChange={(e)=>setWineImporter(e.target.value)} placeholder="수입사"/>
            </div>
            <div id="admin_wine_aroma_insert">
                <div>
                    <span>아로마 정보</span>
                    <button id="add_aroma_input" onClick={handleAddInput}>+</button>
                </div>
                <input
                    type="text"
                    value={firstAroma}
                    onChange={(e) => setFirstAroma(e.target.value)}
                />
                {aromas.map((aroma, index) => (
                    <div key={index+1}>
                        <input
                            type="text"
                            value={aroma}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        <button id="add_aroma_input" onClick={()=>handleRemoveInput(index)}>-</button>
                    </div>
                ))}
                
            </div>
            <div id="admin_wine_info_insert">
                <input type="text" id="admin_wine_info_note" className="admin_wine_info"
                value={wineNote} onChange={(e)=>setWineNote(e.target.value)} placeholder="와인 설명"/> 
            </div>
            <div id="admin_wine_insert_submit">
                <button 
                    id="wine_insert_submit"
                    onClick={wineInsertSubmit}
                >
                    와인 등록
                </button>
            </div>
        </div>
    )
}
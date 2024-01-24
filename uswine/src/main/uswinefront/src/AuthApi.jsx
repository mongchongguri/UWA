import axios from "axios";
export default async function AuthApi(url, data) {
    return(
        await axios.create({
            headers:{
                'Authorization': localStorage.getItem('token'),
            }
        }).post(url,data)
        .then((response)=>{
            if(response.data === 0){
                alert("권한이 없습니다.")
                window.history.back()
            }
            return response.data;
        }).catch((error) => {
              console.log(error);
        })
    )
}
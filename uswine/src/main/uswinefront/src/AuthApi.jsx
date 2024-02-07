import axios from "axios";
export default async function AuthApi(url, data) {
  return(
    await axios.create({
        headers:{
            'Authorization': localStorage.getItem('token'),
        }
    }).post(url,data)
    .then((response)=>{
        return response.data;
    }).catch((error) => {
          console.log(error);
    })
  )
}

import axios from "axios";

export default function AuthApi(url, data) {
    return(
        axios.create({
            headers:{
                'Authorization': localStorage.getItem('token'),
            }
        }).post(url,data)
    )
}
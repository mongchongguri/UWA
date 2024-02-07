import { Outlet } from "react-router-dom";
import AdminHeader from "../components/command/AdminHeader"
import SideBar from "../components/command/SideBar"
export default function Admin(){
    return(
        <>
        <AdminHeader />
        <SideBar />
        <Outlet></Outlet>
        </>
    )
}
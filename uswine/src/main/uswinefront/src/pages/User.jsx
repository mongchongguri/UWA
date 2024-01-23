import Header from "../components/command/Header";
import Footer from "../components/command/Footer";
import { Outlet } from "react-router-dom";
export default function User(){
    return(
        <>
        <Header />
        <div id="contents">
            <Outlet></Outlet>
        </div>
        <Footer />
        </>
    )
}
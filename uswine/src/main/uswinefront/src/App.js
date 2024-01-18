import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./components/command/Header";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import Footer from "./components/command/Footer";
import "./css/App.css";
import "./css/font.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div id="contents">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

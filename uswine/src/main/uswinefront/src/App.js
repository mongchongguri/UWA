import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./components/command/Header";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/command/Footer";
import JoinPage from "./pages/JoinPage";
import "./css/App.css";

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
      <Footer />
    </div>
  );
}

export default App;

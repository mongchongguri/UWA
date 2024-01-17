import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./components/command/Header";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/command/Footer";
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div id="contents">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

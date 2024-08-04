import "./App.css";
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import NavBar from "./components/NavBar";
import ProductPage from "./pages/ProductPage";

function App() {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop/:offerId" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />

          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

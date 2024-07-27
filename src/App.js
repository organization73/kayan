import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import Example from "./components/NavBar";

function App() {
	React.useEffect(() => {
		const link = document.createElement("link");
		link.href =
			"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
		link.rel = "stylesheet";
		document.head.appendChild(link);
	}, []);

	return (
		<Router>
			<div className="App">
				<Example></Example>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/shop" element={<ShopPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

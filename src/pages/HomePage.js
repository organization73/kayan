import React from "react";
import Example from "../components/NavBar";
import Hero from "../components/MainHero";
import FooterSection from "../components/FooterSection";

const HomePage = () => {
	return (
		<>
			<Hero></Hero>
			<div>
				<h1 className="font-poppins">about Page</h1>
				<p>Browse wfwffffffffff products here.</p>
			</div>
			<FooterSection></FooterSection>
		</>
	);
};

export default HomePage;

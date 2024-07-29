import React from "react";
import Hero from "../components/MainHero";
import FooterSection from "../components/FooterSection";
import Video from "../components/Video";
import HomeSubHeader from "../components/HomeSubHeader";

const HomePage = () => {
	return (
		<>
			<Hero></Hero>
			<HomeSubHeader></HomeSubHeader>
			<Video></Video>

			<div>
				<h1 className="font-poppins">about Page</h1>
				<p>Browse wfwffffffffff products here.</p>
			</div>

			<FooterSection></FooterSection>
		</>
	);
};

export default HomePage;

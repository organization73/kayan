import React from "react";
import Hero from "../components/MainHero";
import FooterSection from "../components/FooterSection";
import Video from "../components/Video";
import HomeSubHeader from "../components/HomeSubHeader";
import Categories from "../components/Categories";
import CategoriesGrid from "../components/CategoriesGrid";

const HomePage = () => {
	return (
		<>
			<Hero></Hero>
			<HomeSubHeader></HomeSubHeader>
			<Categories></Categories>
			<CategoriesGrid></CategoriesGrid>
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

import React from "react";
import Hero from "../components/MainHero";
import FooterSection from "../components/FooterSection";
import Video from "../components/Video";
import HomeSubHeader from "../components/HomeSubHeader";
import Categories from "../components/Categories";
import CategoriesGrid from "../components/CategoriesGrid";
import CollectionSection from "../components/CollectionSection";
import AboutFeaturesCards from "../components/AboutFeaturesCards";
import AboutBanner from "../components/AboutBanner";

const HomePage = () => {
	return (
		<>
			<Hero></Hero>
			<HomeSubHeader></HomeSubHeader>
			<Categories></Categories>
			<CategoriesGrid></CategoriesGrid>
			<Video></Video>
			<CollectionSection></CollectionSection>
			<AboutFeaturesCards></AboutFeaturesCards>
			<AboutBanner
				title="معلومات عنا"
				subtitle="متجر كيان هو متجر للهدايا والديكورات مقره في مصر. تأسس منذ عام 2019. خدمتنا للعملاء دائمًا مستعدة لدعمكم على مدار 24 ساعة طوال أيام الأسبوع."
			/>

			<FooterSection></FooterSection>
		</>
	);
};

export default HomePage;

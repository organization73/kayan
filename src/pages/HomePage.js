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
import ImageCarousel from "../components/Carousel";
import Testimonial from "../components/Testimonial";

const HomePage = () => {
	return (
		<>
			<Hero></Hero>
			<ImageCarousel></ImageCarousel>
			<HomeSubHeader></HomeSubHeader>
			<Categories></Categories>
			<CategoriesGrid></CategoriesGrid>
			<Video></Video>
			<CollectionSection></CollectionSection>
			<Testimonial></Testimonial>
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

import React from "react";
import AboutHeaderText from "../components/AboutHeaderText";
import AboutBanner from "../components/AboutBanner";
import AboutContactCards from "../components/AboutContactCards";
import AboutFeaturesCards from "../components/AboutFeaturesCards";
import FooterSection from "../components/FooterSection";

const AboutPage = () => {
	return (
		<>
			<AboutHeaderText></AboutHeaderText>
			<AboutBanner></AboutBanner>
			<AboutContactCards></AboutContactCards>
			<AboutFeaturesCards></AboutFeaturesCards>
			<FooterSection></FooterSection>
		</>
	);
};

export default AboutPage;

import React from "react";
import AboutHeaderText from "../components/AboutHeaderText";
import AboutBanner from "../components/AboutBanner";
import AboutContactCards from "../components/AboutContactCards";
import AboutFeaturesCards from "../components/AboutFeaturesCards";
import FooterSection from "../components/FooterSection";
import ComplainContact from "../components/ComplainContact";

const AboutPage = () => {
	return (
		<>
			<AboutHeaderText></AboutHeaderText>
			<AboutBanner
				title="معلومات عنا"
				subtitle="متجر كيان هو متجر للهدايا والديكورات مقره في مصر. تأسس منذ عام 2019. خدمتنا للعملاء دائمًا مستعدة لدعمكم على مدار 24 ساعة طوال أيام الأسبوع."
			/>

			<AboutContactCards></AboutContactCards>
			<ComplainContact></ComplainContact>
			<AboutFeaturesCards></AboutFeaturesCards>
			<FooterSection></FooterSection>
		</>
	);
};

export default AboutPage;

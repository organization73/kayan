import React from "react";
import { useLocation } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import FooterSection from "../components/FooterSection";

const ProductPage = () => {
	const location = useLocation();
	const { product } = location.state;

	return (
		<>
			<ProductDetails product={product} />
			<FooterSection />
		</>
	);
};

export default ProductPage;

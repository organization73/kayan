import React from "react";
import ProductDetails from "../components/ProductDetails";
import FooterSection from "../components/FooterSection";
import { useParams } from "react-router-dom";

const ProductPage = () => {
	const { productId } = useParams();


	return (
		<>
			<ProductDetails productId={productId} />
			<FooterSection />
		</>
	);
};

export default ProductPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { url } from "../dummyData/baseUrl";
import LoadingSppiner from "./LoadingSppiner";
import ErrorMessage from "./ErrorMessage";

const fetchProducts = async () => {
	try {
		const response = await axios.get(`${url}/api/client/products`);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
};

export default function CollectionSection() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		fetchProducts()
			.then((response) => {
				setProducts(response.prods || []);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleCardClick = (product) => {
		// navigate("/product", { state: { product } });
		navigate(`/product/${product._id}`)
		console.log(product);
	};

	if (loading) {
		return <LoadingSppiner></LoadingSppiner>;
	}

	if (products.length === 0) {
		return (
			<ErrorMessage
				title="حدث خطا ما"
				subtitle="حدث خطا اثناء عرض بعض المنتجات"
			></ErrorMessage>
		);
	}

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-medium tracking-tight text-gray-900">
					اختار بين اقوى كولكشن
				</h2>

				<div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<div
							key={product._id}
							className="group relative cursor-pointer"
							onClick={() => handleCardClick(product)}
						>
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									alt={product.title}
									src={product.mainImageUrl}
									className="h-full w-full object-cover object-center lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-normal font-medium text-gray-700">
										{product.title}
									</h3>
								</div>
								{product.price > 0 && (
									<p className="text-sm font-medium text-gray-900">
										{product.price} جنيه
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

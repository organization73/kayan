import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../dummyData/baseUrl";
import { useParams } from "react-router-dom";

async function fetchProducts(option, offerId) {
	try {
		console.log("Fetching products...", offerId);
		let requestUrl = "";
		if (offerId) {
			requestUrl = `${url}/api/client/offer/${offerId}`;
		} else {
			requestUrl = `${url}/api/client/products`;
		}
		console.log("requestUrl", requestUrl);
		const response = await axios.get(requestUrl, {
			params: {
				page: 1,
				sortBY: option ? option.value : "recent",
				// search: "bed",
				// category: "bedroom",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

// let products = await fetchProducts();

export default function ProductsGrid({ selectedOption }) {
	const [products, setProducts] = useState([]);
	const { offerId } = useParams();
	useEffect(() => {
		const fetchAndSetProducts = async () => {
			const data = await fetchProducts(selectedOption, offerId);
			setProducts(data.prods || []);
		};

		fetchAndSetProducts();
	}, [selectedOption]);
	useEffect(() => {
		if (!selectedOption) {
			const fetchAndSetProducts = async () => {
				const data = await fetchProducts({ value: "recent" }, offerId);
				setProducts(data.prods || []);
			};

			fetchAndSetProducts();
		}
	}, []);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Products</h2>

				<div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<Link key={product.id} to={product.href} className="group">
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
								<img
									alt={product.title}
									src={product.mainImageUrl}
									className="h-full w-full object-cover object-center group-hover:opacity-75"
								/>
							</div>
							<h3 className="mt-4 text-normal font-medium text-gray-700">
								{product.title}
							</h3>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

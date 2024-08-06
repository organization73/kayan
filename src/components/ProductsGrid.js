import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { url } from "../dummyData/baseUrl";
import { SearchContext } from "../components/SearchContext"; // Import the SearchContext
import Pagination from "./Pagination";
import LoadingSppiner from "./LoadingSppiner";
import ErrorMessage from "./ErrorMessage";

async function fetchProducts(option, category, searchValue, offerId, page) {
	try {
		console.log("fetching date", option, category, searchValue, offerId, page);
		let requestUrl = "";
		if (offerId) {
			requestUrl = `${url}/api/client/offer/${offerId}`;
		} else {
			requestUrl = `${url}/api/client/products`;
		}
		const response = await axios.get(requestUrl, {
			params: {
				page: page || 1, // Include the page parameter
				sortBY: option ? option.value : "recent",
				search: searchValue,
				category: category,
			},
		});
		console.log("response", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return { prods: [], currentPage: 1, lastPage: 1 };
	}
}

// let products = await fetchProducts();

export default function ProductsGrid({ selectedOption }) {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [loading, setLoading] = useState(true); // Add loading state
	const { offerId } = useParams();
	const { searchValue } = useContext(SearchContext);
	const navigate = useNavigate();
	const location = useLocation();

	// Extract category from URL query parameters
	const queryParams = new URLSearchParams(location.search);
	const category = queryParams.get("category");

	useEffect(() => {
		const fetchAndSetProducts = async () => {
			setLoading(true); // Set loading to true before fetching
			let option = selectedOption;
			if (!selectedOption) {
				option = { value: "recent" };
			}
			const data = await fetchProducts(option, category, searchValue, offerId,currentPage);
			setProducts(data.prods || []);
			setCurrentPage(data.currentPage || 1);
			setLastPage(data.lastPage || 1);
			setLoading(false); // Set loading to false after fetching
		};

		fetchAndSetProducts();
	}, [selectedOption, category, searchValue, currentPage, offerId]);

	const handleProductClick = (productId) => {
		navigate(`/product/${productId}`);
	};

	const handlePageChange = (page) => {
		if (page > 0 && page <= lastPage) {
			setCurrentPage(page);
		}
	};

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Products</h2>

				{loading ? (
					<LoadingSppiner></LoadingSppiner>
				) : products.length === 0 ? (
					<ErrorMessage
						title="حدث خطا ما"
						subtitle="حدث خطا اثناء عرض بعض المنتجات"
					></ErrorMessage>
				) : (
					<div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<div
								key={product._id}
								className="group cursor-pointer"
								onClick={() => handleProductClick(product._id)}
							>
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
							</div>
						))}
					</div>
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				lastPage={lastPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

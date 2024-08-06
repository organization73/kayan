import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { url } from "../dummyData/baseUrl";
import { SearchContext } from "../components/SearchContext"; // Import the SearchContext
import Pagination from "./Pagination";

async function fetchProducts(option, category, searchValue, offerId, page) {
  try {
    // console.log("Fetching products...", offerId);
    // console.log("fetching with  category:", category);
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
  const { offerId } = useParams();
  const { searchValue } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract category from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  console.log("category", category);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      console.log("loading products");
      let option = selectedOption;
      if (!selectedOption) {
        option = { value: "recent" };
      }
      console.log("category", category);
      const data = await fetchProducts(option, category, searchValue, offerId);
      console.log("data", data);
      setProducts(data.prods || []);
      setCurrentPage(data.currentPage || 1);
      setLastPage(data.lastPage || 1);
    };

    fetchAndSetProducts();
  }, [selectedOption, category, searchValue, currentPage]);

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
      </div>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

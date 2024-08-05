import React, { useEffect, useState, useContext } from "react"; // Import useContext
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { url } from "../dummyData/baseUrl";
import { SearchContext } from "../components/SearchContext"; // Import the SearchContext

async function fetchProducts(option, category, searchValue, offerId) {
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
        page: 1,
        sortBY: option ? option.value : "recent",
        search: searchValue,
        category: category,
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
  const { searchValue } = useContext(SearchContext); // Use the context
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  const location = useLocation(); // Use useLocation to get the current URL

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
    };

    fetchAndSetProducts();
  }, [selectedOption, category, searchValue]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
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
    </div>
  );
}

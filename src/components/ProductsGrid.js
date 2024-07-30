import { Link } from "react-router-dom";

async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:8080/api/client/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const response = await fetchProducts();
const products = response.prods;
console.log(products);

// const products = [
// 	{
// 		id: 1,
// 		name: "مكتب",
// 		href: "/product",
// 		price: "$48",
// 		imageSrc: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",

// 		imageAlt: "مكتب",
// 	},
// 	{
// 		id: 2,
// 		name: "غرفة صالون",
// 		href: "/product",
// 		price: "$35",
// 		imageSrc: "https://emypost.com/wp-content/uploads/2019/12/11.jpg",

// 		imageAlt: "غرفة نوم",
// 	},
// 	{
// 		id: 3,
// 		name: "صالون",
// 		href: "/product",
// 		price: "$89",
// 		imageSrc:
// 			"https://mostaql.hsoubcdn.com/uploads/thumbnails/585297/628179e339c03/1.jpg",

// 		imageAlt: "صالون",
// 	},
// 	{
// 		id: 4,
// 		name: "صالة",
// 		href: "/product",
// 		price: "$35",
// 		imageSrc:
// 			"https://th.bing.com/th/id/R.14723de297fb42267e1a1b4ca62b9ad7?rik=KAS0OrCUb7Yorg&pid=ImgRaw&r=0",

// 		imageAlt: "صالة",
// 	},
// 	{
// 		id: 1,
// 		name: "مكتب",
// 		href: "/product",
// 		price: "$48",
// 		imageSrc: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",

// 		imageAlt: "مكتب",
// 	},
// 	{
// 		id: 2,
// 		name: "غرفة صالون",
// 		href: "/product",
// 		price: "$35",
// 		imageSrc: "https://emypost.com/wp-content/uploads/2019/12/11.jpg",

// 		imageAlt: "غرفة نوم",
// 	},
// 	// More products...
// ];

export default function ProductsGrid() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Products</h2>

				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<Link key={product.id} to={product.href} className="group">
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
								<img
									alt={product.title}
									src={product.mainImageUrl}
									className="h-full w-full object-cover object-center group-hover:opacity-75"
								/>
							</div>
							<h3 className="mt-4 text-normal font-medium text-gray-700">{product.title}</h3>
							{/* <p className="mt-1 text-lg font-medium text-gray-900">
								{product.price}
							</p> */}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

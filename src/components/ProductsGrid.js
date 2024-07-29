import React from "react";
import { Link } from "react-router-dom";

const products = [
	{
		src: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",
		alt: "مكتب",
		name: "مكتب",
	},
	{
		src: "https://emypost.com/wp-content/uploads/2019/12/11.jpg",
		alt: "غرفة نوم مودرن",
		name: "غرفة نوم مودرن",
	},
	{
		src: "https://mostaql.hsoubcdn.com/uploads/thumbnails/585297/628179e339c03/1.jpg",
		alt: "صالة",
		name: "صالة",
	},
	{
		src: "https://th.bing.com/th/id/R.14723de297fb42267e1a1b4ca62b9ad7?rik=KAS0OrCUb7Yorg&pid=ImgRaw&r=0",
		alt: "صالون",
		name: "صالون",
	},
	{
		src: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",
		alt: "مكتب",
		name: "مكتب",
	},
	{
		src: "https://emypost.com/wp-content/uploads/2019/12/11.jpg",
		alt: "غرفة نوم مودرن",
		name: "غرفة نوم مودرن",
	},
	// Add more products here
];

function Product({ src, alt, name }) {
	return (
		<li>
			<Link to="/shop" className="group block overflow-hidden">
				<img
					src={src}
					alt={alt}
					className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
				/>
				<div className="relative bg-white pt-3">
					<h3 className="text-base text-gray-700 group-hover:underline group-hover:underline-offset-4">
						{name}
					</h3>
				</div>
			</Link>
		</li>
	);
}

function ProductsGrid() {
	return (
		<div className="lg:col-span-3">
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product, index) => (
					<Product
						key={index}
						src={product.src}
						alt={product.alt}
						name={product.name}
					/>
				))}
			</ul>
		</div>
	);
}

export default ProductsGrid;

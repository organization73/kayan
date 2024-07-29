import React from "react";

const products = [
	{
		src: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",
		alt: "مكتب",
		name: "مكتب",
	},
	{
		src: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",
		alt: "مكتب",
		name: "مكتب",
	},
	{
		src: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",
		alt: "مكتب",
		name: "مكتب",
	},
	{
		src: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",
		alt: "مكتب",
		name: "مكتب",
	},
	{
		src: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",
		alt: "مكتب",
		name: "مكتب",
	},
	{
		src: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",
		alt: "مكتب",
		name: "مكتب",
	},

	// Add more products here
];

function Product({ src, alt, name }) {
	return (
		<li>
			<a href="#" className="group block overflow-hidden">
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
			</a>
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

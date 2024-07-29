import React from "react";
import { Link } from "react-router-dom";

const collections = [
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
	// Add more collection items here
];

function CollectionItem({ src, alt, name }) {
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

function CollectionSection() {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
				<header>
					<h2 className="text-xl text-gray-900 sm:text-3xl">
						اختار بين اقوى كولكشن
					</h2>
				</header>

				<ul className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{collections.map((collection, index) => (
						<CollectionItem
							key={index}
							src={collection.src}
							alt={collection.alt}
							name={collection.name}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}

export default CollectionSection;

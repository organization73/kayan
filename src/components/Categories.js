import React from "react";

import { Link } from "react-router-dom";
import subCategories from "../dummyData/SubCategories";

function CategoryCard({ src, alt, name, value }) {
	return (
		<Link to={`/shop?category=${encodeURIComponent(value)}`}>
			<div className="sm:w-1/3 lg:w-auto">
				<div className="flex flex-col items-center">
					<div className="p-2 rounded-full bg-gray-100">
						<img src={src} alt={alt} className="w-28 rounded-full" />
					</div>
					<div className="mt-2">{name}</div>
				</div>
			</div>
		</Link>
	);
}

function Categories() {
	return (
		<div className="container mx-auto py-6">
			<div className="text-center">
				<div className="text-2xl font-medium mb-6">تسوق حسب الفئات</div>
				<div className="flex flex-wrap justify-center gap-6">
					{subCategories.slice(1).map((category, index) => (
						<CategoryCard
							key={index}
							src={category.src}
							alt={category.alt}
							name={category.name}
							value={category.value}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Categories;

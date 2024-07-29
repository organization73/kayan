import React from "react";
import cat1 from "../assets/img/c1.png";
import cat2 from "../assets/img/c2.png";
import cat3 from "../assets/img/c3.png";
import cat4 from "../assets/img/c4.png";
import cat5 from "../assets/img/c5.png";
import cat6 from "../assets/img/c6.png";
import cat7 from "../assets/img/c7.png";
import cat8 from "../assets/img/c8.png";
import { Link } from "react-router-dom";

const categories = [
	{ src: cat1, alt: "مكتب", name: "مكتب" },
	{ src: cat2, alt: "غرف نوم", name: "غرف نوم" },
	{ src: cat3, alt: "غرف سفرة", name: "غرف سفرة" },
	{ src: cat4, alt: "غرف اطفال", name: "غرف اطفال" },
	{ src: cat5, alt: "صالونات", name: "صالونات" },
	{ src: cat6, alt: "نيش", name: "نيش" },
	{ src: cat7, alt: "طاولة", name: "طاولة" },
	{ src: cat8, alt: "ركنات", name: "ركنات" },
];

function CategoryCard({ src, alt, name }) {
	return (
		<Link to="/shop">
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
				<div className="text-3xl mb-6">تسوق حسب الفئات</div>
				<div className="flex flex-wrap justify-center gap-3">
					{categories.map((category, index) => (
						<CategoryCard
							key={index}
							src={category.src}
							alt={category.alt}
							name={category.name}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Categories;

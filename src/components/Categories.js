import React from "react";
import { Link } from "react-router-dom";
import subCategories from "../dummyData/SubCategories";
import { motion } from "framer-motion";

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function CategoryCard({ src, alt, name, value }) {
	return (
		<Link to={`/shop?category=${encodeURIComponent(value)}`}>
			<motion.div
				className="sm:w-1/3 lg:w-auto"
				variants={cardVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.1 }}
			>
				<div className="flex flex-col items-center">
					<div className="p-2 rounded-full bg-gray-100">
						<img src={src} alt={alt} className="w-28 rounded-full" />
					</div>
					<div className="mt-2">{name}</div>
				</div>
			</motion.div>
		</Link>
	);
}

function Categories() {
	return (
		<div className="container mx-auto py-6">
			<div className="text-center">
				<div className="text-2xl font-medium mb-6">تسوق حسب الفئات</div>
				<motion.div
					className="flex flex-wrap justify-center gap-6"
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.1 }}
				>
					{subCategories.slice(1).map((category, index) => (
						<CategoryCard
							key={index}
							src={category.src}
							alt={category.alt}
							name={category.name}
							value={category.value}
						/>
					))}
				</motion.div>
			</div>
		</div>
	);
}

export default Categories;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 50 }, // Changed from x to y for vertical animation
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Adjusted for vertical animation
};

function CategoriesGrid() {
	return (
		<motion.div
			className="grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 mx-3 lg:mx-36"
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.1 }}
		>
			<motion.div
				className="h-52*2 rounded-lg bg-yellow-200 lg:col-span-2 lg:row-span-2"
				variants={itemVariants}
			>
				<div className="relative h-full">
					<img
						src="https://elsharabasy.blob.core.windows.net/kayan-metadata/saloon.jpg"
						className="absolute inset-0 w-full h-full object-cover"
						alt="Placeholder"
					/>
					<div className="absolute bottom-0 left-0 p-3 flex flex-col gap-2 bg-opacity-50 bg-black text-white">
						<h3 className="font-bold">غرفة صالون</h3>
						<Link
							to="/shop?category=salon"
							className="inline-flex items-center gap-2 text-white"
						>
							تسوق الآن ←
						</Link>
					</div>
				</div>
			</motion.div>
			<motion.div
				className="h-52 rounded-lg bg-blue-200"
				variants={itemVariants}
			>
				<div className="relative h-full">
					<img
						src="https://elsharabasy.blob.core.windows.net/kayan-metadata/bedroom.jpg"
						className="absolute inset-0 w-full h-full object-cover"
						alt="Placeholder"
					/>
					<div className="absolute bottom-0 left-0 p-3 flex flex-col gap-2 bg-opacity-50 bg-black text-white">
						<h3 className="font-bold">غرفة نوم</h3>
						<Link
							to="/shop?category=bedroom"
							className="inline-flex items-center gap-2 text-white"
						>
							تسوق الآن ←
						</Link>
					</div>
				</div>
			</motion.div>
			<motion.div
				className="h-52 rounded-lg bg-red-200"
				variants={itemVariants}
			>
				<div className="relative h-full">
					<img
						src="https://elsharabasy.blob.core.windows.net/kayan-metadata/sofra.jpg"
						className="absolute inset-0 w-full h-full object-cover"
						alt="Placeholder"
					/>
					<div className="absolute bottom-0 left-0 p-3 flex flex-col gap-2 bg-opacity-50 bg-black text-white">
						<h3 className="font-bold">غرفة سفرة</h3>
						<Link
							to="/shop?category=dining-room"
							className="inline-flex items-center gap-2 text-white"
						>
							تسوق الآن ←
						</Link>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default CategoriesGrid;

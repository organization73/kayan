import React from "react";
import { motion } from "framer-motion";

function HomeSubHeader() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mx-3 gap-4 lg:mx-36 my-2">
			<motion.div
				className="flex items-center lg:col-span-2 text-neutral-900 text-4xl lg:text-5xl lg:font-normal font-semibold leading-tight"
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				فريدة من نوعها
				<br />
				ببساطة أفضل
			</motion.div>
			<motion.div
				className="flex items-center justify-end lg:col-span-2 font-semibold text-neutral-700 text-sm lg:text-lg ml-10 lg:ml-0"
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				كيان مودرن هو واحد من افضل الاماكن الموجودة لتوفير جميع احتياجات الاثاث
			</motion.div>
		</div>
	);
}

export default HomeSubHeader;

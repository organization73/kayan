import React from "react";
import { Link } from "react-router-dom";

function CategoriesGrid() {
	return (
		<div className="grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:mx-8 mx-3">
			<div className="h-52*2 rounded-lg bg-yellow-200 lg:col-span-2 lg:row-span-2">
				<div className="relative h-full">
					<img
						src="https://via.placeholder.com/548x319"
						className="absolute inset-0 w-full h-full object-cover"
						alt="Placeholder Image"
					/>
					<div className="absolute bottom-0 left-0 p-3 flex flex-col gap-2 bg-opacity-50 bg-black text-white">
						<h3 className="font-bold">غرفة صالون</h3>
						<Link
							to="/shop"
							className="inline-flex items-center gap-2 text-white"
						>
							تسوق الآن ←
						</Link>
					</div>
				</div>
			</div>
			<div className="h-52 rounded-lg bg-blue-200">
				<div className="relative h-full">
					<img
						src="https://via.placeholder.com/548x319"
						className="absolute inset-0 w-full h-full object-cover"
						alt="Placeholder Image"
					/>
					<div className="absolute bottom-0 left-0 p-3 flex flex-col gap-2 bg-opacity-50 bg-black text-white">
						<h3 className="font-bold">غرفة نوم</h3>
						<Link
							to="/shop"
							className="inline-flex items-center gap-2 text-white"
						>
							تسوق الآن ←
						</Link>
					</div>
				</div>
			</div>
			<div className="h-52 rounded-lg bg-red-200">
				<div className="relative h-full">
					<img
						src="https://via.placeholder.com/548x319"
						className="absolute inset-0 w-full h-full object-cover"
						alt="Placeholder Image"
					/>
					<div className="absolute bottom-0 left-0 p-3 flex flex-col gap-2 bg-opacity-50 bg-black text-white">
						<h3 className="font-bold">غرفة سفرة</h3>
						<Link
							to="/shop"
							className="inline-flex items-center gap-2 text-white"
						>
							تسوق الآن ←
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CategoriesGrid;

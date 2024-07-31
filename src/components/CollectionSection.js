import React from "react";
import { useNavigate } from "react-router-dom";

import products from "../dummyData/productsData";

export default function CollectionSection() {
	const navigate = useNavigate();

	const handleCardClick = (product) => {
		navigate("/product", { state: { product } });
	};

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-medium tracking-tight text-gray-900">
					اختار بين اقوى كولكشن
				</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<div
							key={product.id}
							className="group relative cursor-pointer"
							onClick={() => handleCardClick(product)}
						>
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									alt={product.images[0].alt}
									src={product.images[0].src}
									className="h-full w-full object-cover object-center lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-normal font-medium text-gray-700">
										{product.name}
									</h3>
								</div>
								<p className="text-sm font-medium text-gray-900">
									{product.price} جنيه
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

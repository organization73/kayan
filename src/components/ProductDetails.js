"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import ImageGallery from "../components/ImageGallery";


function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ProductDetails({ product }) {
	const [show2, setShow2] = useState(false);

	return (
		<div className="bg-white">
			<div className="pt-6">
				<nav aria-label="Breadcrumb">
					<ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						{product.breadcrumbs.map((breadcrumb) => (
							<li key={breadcrumb.id}>
								<div className="flex items-center">
									<a
										href={breadcrumb.href}
										className="mr-2 text-sm font-medium text-gray-900"
									>
										{breadcrumb.name}
									</a>
									<svg
										fill="currentColor"
										width={16}
										height={20}
										viewBox="0 0 16 20"
										aria-hidden="true"
										className="h-5 w-4 text-gray-300"
									>
										<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
									</svg>
								</div>
							</li>
						))}
						<li className="text-sm">
							<p
								aria-current="page"
								className="font-medium text-gray-500 hover:text-gray-600"
							>
								{product.name}
							</p>
						</li>
					</ol>
				</nav>

				{/* Image gallery */}
				<ImageGallery images={product.images}></ImageGallery>

				{/* Product info */}
				<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{product.name}
						</h1>
					</div>

					{/* Options */}
					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<h2 className="sr-only">Product information</h2>
						<p className="text-3xl tracking-tight text-gray-900">
							{product.price} جنيه
						</p>

						{/* Reviews */}
						<div className="mt-6">
							<h3 className="sr-only">Reviews</h3>
							<div className="flex items-center">
								<div className="flex items-center">
									{[0, 1, 2, 3, 4].map((rating) => (
										<StarIcon
											key={rating}
											aria-hidden="true"
											className={classNames(
												product.reviews.average > rating
													? "text-gray-900"
													: "text-gray-200",
												"h-5 w-5 flex-shrink-0"
											)}
										/>
									))}
								</div>
								<p className="sr-only">
									{product.reviews.average} out of 5 stars
								</p>
								<p className="mr-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
									{product.reviews.totalCount} مراجعة
								</p>
							</div>
						</div>
					</div>

					<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
						{/* Description and details */}
						<div>
							<h3 className="sr-only">Description</h3>

							<div className="space-y-6">
								<p className="text-base text-gray-900">{product.description}</p>
							</div>
						</div>

						<div className="mt-10">
							<h3 className="text-sm font-medium text-gray-900">المميزات</h3>

							<div className="mt-4">
								<ul className="list-disc space-y-2 pr-4 text-sm">
									{product.highlights.map((highlight) => (
										<li key={highlight} className="text-gray-400">
											<span className="text-gray-600">{highlight}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-10">
							{/* new open sections */}

							<div>
								<div className="border-b py-4 border-gray-200">
									<div
										onClick={() => setShow2(!show2)}
										className="flex justify-between items-center cursor-pointer"
									>
										<p className="text-base leading-4 text-gray-800">مراجعات</p>
										<button
											className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
											aria-label="show or hide"
										>
											<svg
												className={
													"transform " + (show2 ? "rotate-180" : "rotate-0")
												}
												width="10"
												height="6"
												viewBox="0 0 10 6"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M9 1L5 5L1 1"
													stroke="#4B5563"
													strokeWidth="1.25"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</div>
									<div
										className={
											"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
											(show2 ? "block" : "hidden")
										}
										id="sect"
									>
										If you have any questions on how to return your item to us,
										contact us.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

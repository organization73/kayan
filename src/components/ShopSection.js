import React from "react";
import CategoriesSideMenu from "./CategoriesSideMenu";
import ProductsGrid from "./ProductsGrid";
import Pagination from "./Pagination";

function ShopSection() {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 sm:px-6 sm:pt-2 pb-8 lg:px-8">
				{/* filter section */}
				<div className="mt-8 sm:flex sm:items-center sm:justify-between">
					<div className="block sm:hidden">
						<button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
							<span className="text-sm font-medium"> الترتيب و التصفية </span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="size-4 rtl:rotate-180"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</button>
					</div>

					<div className="hidden sm:flex sm:gap-4">
						<div className="relative">
							<details className="group [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
									<span className="text-sm font-medium"> المتاح </span>

									<span className="transition group-open:-rotate-180">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="h-4 w-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 8.25l-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</span>
								</summary>

								<div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
									<div className="w-96 rounded border border-gray-200 bg-white">
										<header className="flex items-center justify-between p-4">
											<span className="text-sm text-gray-700">
												{" "}
												0 Selected{" "}
											</span>

											<button
												type="button"
												className="text-sm text-gray-900 underline underline-offset-4"
											>
												Reset
											</button>
										</header>

										<ul className="space-y-1 border-t border-gray-200 p-4">
											<li>
												<label
													htmlFor="FilterInStock"
													className="inline-flex items-center gap-2"
												>
													<input
														type="checkbox"
														id="FilterInStock"
														className="size-5 rounded border-gray-300"
													/>

													<span className="text-sm font-medium text-gray-700">
														{" "}
														In Stock (5+){" "}
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor="FilterPreOrder"
													className="inline-flex items-center gap-2"
												>
													<input
														type="checkbox"
														id="FilterPreOrder"
														className="size-5 rounded border-gray-300"
													/>

													<span className="text-sm font-medium text-gray-700">
														{" "}
														Pre Order (3+){" "}
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor="FilterOutOfStock"
													className="inline-flex items-center gap-2"
												>
													<input
														type="checkbox"
														id="FilterOutOfStock"
														className="size-5 rounded border-gray-300"
													/>

													<span className="text-sm font-medium text-gray-700">
														{" "}
														Out of Stock (10+){" "}
													</span>
												</label>
											</li>
										</ul>
									</div>
								</div>
							</details>
						</div>

						<div className="relative">
							<details className="group [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
									<span className="text-sm font-medium"> السعر </span>

									<span className="transition group-open:-rotate-180">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="h-4 w-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 8.25l-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</span>
								</summary>

								<div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
									<div className="w-96 rounded border border-gray-200 bg-white">
										<header className="flex items-center justify-between p-4">
											<span className="text-sm text-gray-700">
												{" "}
												The highest price is $600{" "}
											</span>

											<button
												type="button"
												className="text-sm text-gray-900 underline underline-offset-4"
											>
												Reset
											</button>
										</header>

										<div className="border-t border-gray-200 p-4">
											<div className="flex justify-between gap-4">
												<label
													htmlFor="FilterPriceFrom"
													className="flex items-center gap-2"
												>
													<span className="text-sm text-gray-600">$</span>

													<input
														type="number"
														id="FilterPriceFrom"
														placeholder="From"
														className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
													/>
												</label>

												<label
													htmlFor="FilterPriceTo"
													className="flex items-center gap-2"
												>
													<span className="text-sm text-gray-600">$</span>

													<input
														type="number"
														id="FilterPriceTo"
														placeholder="To"
														className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
													/>
												</label>
											</div>
										</div>
									</div>
								</div>
							</details>
						</div>
					</div>

					<div className="hidden sm:block">
						<label htmlFor="تصنيف علي حسب" className="sr-only">
							تصنيف علي حسب
						</label>

						<select
							id="SortBy"
							className="h-10 rounded border-gray-300 text-sm"
						>
							<option>تصنيف علي حسب</option>
							<option value="الاحدث">الاحدث</option>
							<option value="الشهرة">الشهرة</option>
							<option value="معدل التقييم">معدل التقييم</option>
						</select>
					</div>
				</div>

				<div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
					<CategoriesSideMenu></CategoriesSideMenu>
					<ProductsGrid></ProductsGrid>
				</div>
				<Pagination></Pagination>
			</div>
		</section>
	);
}

export default ShopSection;

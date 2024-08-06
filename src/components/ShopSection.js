"use client";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import ProductsGrid from "./ProductsGrid";
import subCategories from "../dummyData/SubCategories";

const sortOptions = [
	{ name: "الاكثر شعبية", value: "popular" },
	{ name: "الاجدد", value: "recent" },
	{
		name: "السعر : من الاقل الي الاعلي",
		value: "price-asc",
	},
	{
		name: "السعر : من الاعلي الي الاقل",
		value: "price-dsc",
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ShopSection({ offer }) {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	// Extract the category from the URL query parameters
	const queryParams = new URLSearchParams(location.search);
	const currentCategory = queryParams.get("category");

	// Initialize the selected category to the first item in subCategories if no category is selected
	const [selectedCategory, setSelectedCategory] = useState(
		currentCategory || subCategories[0].value
	);
	const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

	const handleMenuItemClick = (option) => {
		setSelectedOption(option);
	};

	const handleCategoryClick = (categoryValue, event) => {
		event.preventDefault();
		setSelectedCategory(categoryValue); // Update selected category
		navigate(`/shop?category=${categoryValue}`);
		setMobileFiltersOpen(false); // Close the form when a category is selected
	};

	// Effect to update the selected category when the URL changes
	useEffect(() => {
		if (currentCategory) {
			setSelectedCategory(currentCategory);
		}
	}, [currentCategory]);

	return (
		<div>
			<div>
				{/* Mobile filter dialog */}
				<Dialog
					open={mobileFiltersOpen}
					onClose={setMobileFiltersOpen}
					className="relative z-40 lg:hidden"
				>
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
					/>

					<div className="fixed inset-0 z-40 flex">
						<DialogPanel
							transition
							className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
						>
							<div className="flex items-center justify-between px-4">
								<h2 className="text-lg font-medium text-gray-900">التصنيفات</h2>
								<button
									type="button"
									onClick={() => setMobileFiltersOpen(false)}
									className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
								>
									<span className="sr-only">Close menu</span>
									<XMarkIcon aria-hidden="true" className="h-6 w-6" />
								</button>
							</div>
							{/* Filters */}
							<form className="mt-4 border-t border-gray-200">
								<h3 className="sr-only">Categories</h3>
								<ul className="space-y-1 m-4 font-small text-gray-900">
									{subCategories
										.filter((category) => {
											if (!offer || !offer.categories) return true;
											return offer.categories.includes(category.value);
										})
										.map((category) => (
											<li key={category.name}>
												<button
													onClick={(e) => {
														handleCategoryClick(category.value, e);
														setMobileFiltersOpen(false); // Close the form when a category is selected
													}}
													className={`cursor-pointer p-2 rounded-md ${
														selectedCategory === category.value
															? "text-black bg-gray-200"
															: ""
													} w-full text-right`}
												>
													{category.name}
												</button>
											</li>
										))}
								</ul>
							</form>
						</DialogPanel>
					</div>
				</Dialog>

				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-1">
						<h1 className="text-xl lg:text-2xl tracking-tight text-gray-900">
							جميع المنتجات
						</h1>

						<div className="flex items-center">
							<Menu as="div" className="relative inline-block text-right">
								<div>
									<MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
										{selectedOption ? selectedOption.name : "تصنيف"}
										<ChevronDownIcon
											aria-hidden="true"
											className=" h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
										/>
									</MenuButton>
								</div>

								<MenuItems
									transition
									className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
								>
									<div className="py-1">
										{sortOptions.map((option) => {
											if (
												offer &&
												(option.value === "price-asc" ||
													option.value === "price-dsc")
											) {
												return null;
											}
											return (
												<MenuItem key={option.name}>
													<button
														onClick={() => handleMenuItemClick(option)}
														className={classNames(
															selectedOption.value === option.value
																? "font-medium text-gray-900"
																: "text-gray-500",
															"block px-4 py-2 text-sm data-[focus]:bg-gray-100 text-right w-full"
														)}
													>
														{option.name}
													</button>
												</MenuItem>
											);
										})}
									</div>
								</MenuItems>
							</Menu>

							<button
								type="button"
								onClick={() => setMobileFiltersOpen(true)}
								className="-m-2 mr-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon aria-hidden="true" className="h-5 w-5" />
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className="pb-12 pt-6">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
							{/* Filters */}
							<form className="hidden lg:block">
								<h3 className="sr-only">Categories</h3>
								<ul className="space-y-1 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
									{subCategories
										.filter((category) => {
											if (!offer || !offer.categories) return true;
											return offer.categories.includes(category.value);
										})
										.map((category) => (
											<li key={category.name} >
												<button
													onClick={(e) =>
														handleCategoryClick(category.value, e)
													}
													className={`cursor-pointer p-2 rounded-md ${
														selectedCategory === category.value
															? "text-black bg-gray-200"
															: ""
													}  w-full text-right`}
												>
													{category.name}
												</button>
											</li>
										))}
								</ul>
							</form>

							{/* Product grid */}
							<div className="lg:col-span-3">
								<ProductsGrid selectedOption={selectedOption} />
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}

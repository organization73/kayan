import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
	{ name: "الصفحة الرئيسية", href: "/" },
	{ name: "المتجر", href: "/shop" },
	{ name: "تواصل معنا", href: "/about" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export { navigation, classNames };

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation(); // Use useLocation to get the current URL

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const renderNavLink = (item) => {
		const isActive = location.pathname === item.href; // Check if the link is the current page
		return (
			<Link
				key={item.name}
				className={classNames(
					isActive ? "text-black" : "text-gray-400 hover:text-gray-700",
					"rounded-md px-3 py-2 text-sm font-medium"
				)}
				to={item.href}
			>
				{item.name}
			</Link>
		);
	};

	const renderSearchInput = () => (
		<div className="relative">
			<label htmlFor="Search" className="sr-only">
				Search
			</label>
			<input
				type="text"
				id="Search"
				placeholder="البحث"
				className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
			/>
			<span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
				<button type="button" className="text-gray-600 hover:text-gray-700">
					<span className="sr-only">Search</span>
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
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</button>
			</span>
		</div>
	);

	return (
		<>
			<nav className="relative px-4 flex justify-between items-center">
				<a className="text-lg leading-none" href="/">
					<h3>كيان</h3>
				</a>
				<div className="lg:hidden">
					<button
						className="navbar-burger flex items-center p-3"
						title="hamburger menu"
						onClick={toggleMenu}
					>
						<svg
							className="block h-4 w-4 fill-current"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Mobile menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>
				</div>
				<ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto space-x-4 lg:space-x-6">
					<div className="flex space-x-4">{navigation.map(renderNavLink)}</div>
				</ul>
				<div className="relative hidden lg:inline-block py-2 px-6 text-sm">
					{renderSearchInput()}
				</div>
			</nav>
			<div
				className={`navbar-menu relative z-50 ${isMenuOpen ? "" : "hidden"}`}
			>
				<div
					className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
					onClick={toggleMenu}
				/>
				<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
					<div className="flex items-center mb-8">
						<button
							className="navbar-close"
							title="close nav"
							onClick={toggleMenu}
						>
							<svg
								className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div>
						<div className="flex flex-col space-x-4">
							{navigation.map(renderNavLink)}
						</div>
					</div>
					<div className="mt-auto">{renderSearchInput()}</div>
				</nav>
			</div>
		</>
	);
}

import React from "react";

const categories = [
	"مكاتب",
	"غرف نوم",
	"غرف سفرة",
	"غرف اطفال",
	"صالونات",
	"نيش",
	"طاولة",
	"ركنات",
];

function CategoryLink({ href, children, isActive }) {
	return (
		<li>
			<a
				href={href}
				className={`block rounded-lg px-4 py-2 text-sm font-medium ${
					isActive
						? "bg-gray-100 text-gray-700"
						: "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
				}`}
			>
				{children}
			</a>
		</li>
	);
}

function CategoriesSideMenu() {
	return (
		<div className="flow-root pb-4">
			<ul className="-my-2 divide-y divide-gray-100">
				<li className="py-2">
					<ul className="space-y-1">
						{categories.map((category, index) => (
							<CategoryLink key={index} href="#" isActive={index === 0}>
								{category}
							</CategoryLink>
						))}
					</ul>
				</li>
			</ul>
		</div>
	);
}

export default CategoriesSideMenu;

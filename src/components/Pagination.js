import React from "react";

const pages = [
	{ type: "prev", content: <PrevIcon /> },
	{ type: "current", number: 1 },
	{ type: "page", number: 2 },
	{ type: "page", number: 3 },
	{ type: "page", number: 4 },
	{ type: "next", content: <NextIcon /> },
];

function PrevIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-3 w-3"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fillRule="evenodd"
				d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function NextIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-3 w-3"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fillRule="evenodd"
				d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function PaginationItem({ type, number, content }) {
	let className =
		"block size-8 rounded border border-gray-100 text-center leading-8";
	if (type === "current") {
		className =
			"block size-8 rounded border-black bg-black text-center leading-8 text-white";
	}
	if (type === "prev" || type === "next") {
		className =
			"inline-flex size-8 items-center justify-center rounded border border-gray-100";
	}
	return (
		<li>
			<a href="#" className={className}>
				{type === "page" || type === "current" ? number : content}
			</a>
		</li>
	);
}

function Pagination() {
	return (
		<ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
			{pages.map((page, index) => (
				<PaginationItem
					key={index}
					type={page.type}
					number={page.number}
					content={page.content}
				/>
			))}
		</ol>
	);
}

export default Pagination;

import React from "react";
import ReviewsCards from "./ReviewsCards";

function ReviewsSection({ product }) {
	return (
		<section>
			<div className="mx-auto max-w-screen-2xl ">
				<div className="md:flex md:items-center md:justify-between">
					<div className="max-w-xl">
						<h2 className="text-lg font-normal text-gray-900 ">
							مراجعات المستخدمين
						</h2>
					</div>

					<a
						href="#"
						className="lg:mt-0 mt-4 inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-900 px-2 py-2 text-gray-900 transition hover:bg-gray-900 hover:text-white"
					>
						<span className="font-xs"> كتابة مراجعة </span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="size-4 rtl:rotate-180"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</a>
				</div>
				<ReviewsCards product={product}></ReviewsCards>
			</div>
		</section>
	);
}

export default ReviewsSection;

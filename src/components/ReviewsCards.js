import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../dummyData/baseUrl';


import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const TestimonialCard = ({ review, name, text }) => (
	<blockquote className="rounded-md bg-gray-50 p-4 shadow-sm sm:p-3">
		<div className="flex items-center gap-3">
			<div>
				<div className="flex items-center my-2 ">
					{[0, 1, 2, 3, 4].map((rating) => (
						<StarIcon
							key={rating}
							aria-hidden="true"
							className={classNames(
								review > rating ? "text-gray-900" : "text-gray-200",
								"h-4 w-4 flex-shrink-0"
							)}
						/>
					))}
				</div>
				<p className="mt-0.5 font-medium text-gray-900">{name}</p>
			</div>
		</div>
		<p className="mt-2 text-gray-700">{text}</p>
	</blockquote>
);


const fetchReviews = async (productId) => {
  try {
    const response = await axios.get(`${url}/api/client/product-reviews/` + productId);
		console.log("reviews", response.data.reviews);
    return response.data.reviews;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ReviewsCards = ({ product }) => {
	const productId = product._id;
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const getReviews = async () => {
			try {
				const fetchedReviews = await fetchReviews(productId);
				console.log("data reach here:",fetchedReviews[0])
				setReviews(fetchedReviews);
			} catch (error) {
				console.error('Error fetching reviews:', error);
			}
		};

		getReviews();
	}, [productId]);

	return (
		<section>
			<div className="mx-auto max-w-screen-xl">
				<div className="mt-8 grid grid-cols-1 gap-3 md:gap-4">
					{reviews && reviews.length > 0 ? (
						reviews.map((testimonial, index) => (
							<TestimonialCard
								key={index}
								review={testimonial.rating}
								name={testimonial.creator.name}
								text={testimonial.review}
							/>
						))
					) : (
						<p className="text-center text-gray-700">لا مراجعات حتي الان</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default ReviewsCards;

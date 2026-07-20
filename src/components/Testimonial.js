import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../dummyData/baseUrl";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const fetchGalaryReviews = async () => {
	const response = await axios.get(`${url}/api/client/galary-review`);
	const data = response.data;
	const reviews = data.reviews;
	return reviews;
};

export default function Testimonial() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const reviewsData = await fetchGalaryReviews();
				console.log(reviewsData);
				setReviews(reviewsData);
			} catch (error) {
				console.error("Error fetching reviews:", error);
			}
		};

		fetchReviews();
	}, []);
	return (
		<>
			<div className="mx-auto  px-3 py-12 lg:px-36">
				<h2 className="text-right text-2xl font-medium tracking-tight text-gray-900">
					اقرأ مراجعات موثوقة من عملائنا
				</h2>
				<Swiper
					style={{
						"--swiper-pagination-color": "#000",
					}}
					dir="rtl"
					slidesPerView={2}
					spaceBetween={5}
					pagination={{
						clickable: true,
					}}
					breakpoints={{
						300: {
							slidesPerView: 1,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 2,
							spaceBetween: 10,
						},
					}}
					modules={[Pagination]}
					className="mySwiper h-28 lg:h-40 w-full"
				>
					{reviews.map((review, index) => (
						<SwiperSlide>
							<img
								className="block w-full h-full object-contain"
								loading="lazy"
								alt="Testimonial"
								src={review.image}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
}

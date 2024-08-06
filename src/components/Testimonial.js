import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import r1 from "../assets/img/r(1).png";
import r2 from "../assets/img/r(2).png";
import r3 from "../assets/img/r(3).png";

export default function Testimonial() {
	return (
		<>
			<div className="mx-auto max-w-screen-xl px-3 py-12">
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
					<SwiperSlide>
						<img
							className="block w-full h-full object-contain"
							loading="lazy"
							alt="Testimonial"
							src={r1}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							className="block w-full h-full object-contain"
							loading="lazy"
							alt="Testimonial"
							src={r2}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							className="block w-full h-full object-contain"
							loading="lazy"
							alt="Testimonial"
							src={r3}
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</>
	);
}

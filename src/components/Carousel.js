import banner1 from "../assets/img/b1.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function ImageCarousel() {
	return (
		<>
			<Swiper
				style={{
					"--swiper-navigation-color": "#fff",
					"--swiper-pagination-color": "#fff",
				}}
				dir="rtl"
				spaceBetween={10}
				slidesPerView={1}
				loop={true}
				pagination={{
					clickable: true,
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				navigation={true}
				modules={[Pagination, Navigation, Autoplay]}
				className="mySwiper w-full max-w-[1120px] h-fullrounded-[30px] my-8"
			>
				<SwiperSlide className="bg-center bg-cover">
					<img
						className="block w-full"
						src={banner1}
						loading="lazy"
						alt="banner"
					/>
					<div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
				</SwiperSlide>
				<SwiperSlide className="bg-center bg-cover">
					<img
						className="block w-full"
						src={banner1}
						loading="lazy"
						alt="banner"
					/>
					<div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
				</SwiperSlide>
			</Swiper>
		</>
	);
}

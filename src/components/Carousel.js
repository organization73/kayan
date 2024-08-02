import banner1 from "../assets/img/b1.png";
import axios from "axios";
import { url } from "../dummyData/baseUrl";
import React, { useState, useEffect } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

async function fetchOffers() {
  try {
    const response = await axios.get(`${url}/api/client/offers`);
    console.log("Products fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function ImageCarousel() {
  const [offersImages, setOffersImages] = useState([]);

  useEffect(() => {
    fetchOffers()
      .then((response) => {
        const offers = response.offers || [];
        const images = offers.map((offer) => offer.Image);
        setOffersImages(images);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, []);

  if (offersImages.length === 0) {
    return <div>Loading...</div>; // Show a loading indicator while fetching images
  }

  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      dir="rtl"
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 3000 }}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {offersImages.map((image, index) => (
        // <SwiperSlide key={index}>
        //   <img src={image} alt={`Offer ${index}`} />
        // </SwiperSlide>
				<SwiperSlide className="bg-center bg-cover">
				<img
					className="block w-full"
					src={image}
					loading="lazy"
					alt="banner"
				/>
				<div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
			</SwiperSlide>
      ))}
    </Swiper>
  );
}
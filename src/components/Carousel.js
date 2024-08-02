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

const fetchOffers = async () => {
  try {
    const response = await axios.get(`${url}/api/client/offers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default function ImageCarousel() {
  const [offersList, setOffersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers()
      .then((response) => {
        const offers = response.offers || [];
        const offersList = offers.map((offer) => ({
          id: offer._id,
          src: offer.Image,
        }));
        setOffersList(offersList);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (offersList.length === 0) {
    return <div>No offers available.</div>;
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
      {offersList.map((offer) => (
        <SwiperSlide key={offer.id} className="bg-center bg-cover">
          <img
            className="block w-full"
            src={offer.src}
            loading="lazy"
            alt="banner"
            srcSet={`${offer.src} 300w, ${offer.src} 768w, ${offer.src} 1024w`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
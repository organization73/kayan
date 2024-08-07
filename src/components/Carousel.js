import axios from "axios";
import { url } from "../dummyData/baseUrl";
import React, { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import NoOffersBanner from "./NoOffersBanner";
import LoadingSppiner from "./LoadingSppiner";

// Import Framer Motion
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

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
    return <LoadingSppiner></LoadingSppiner>;
  }

  if (offersList.length === 0) {
    return <NoOffersBanner></NoOffersBanner>;
  }

  return (
    <motion.div
      className="my-8 mx-3 lg:mx-36"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          "--swiper-navigation-size": "25px",
        }}
        dir="rtl"
        className="rounded-[30px] h-full"
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 80000 }}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {offersList.map((offer) => (
          <SwiperSlide
            key={offer.id}
            className="bg-center bg-contain"
            onClick={() => navigate(`/offer/${offer.id}`)}
          >
            <img
              className="w-full h-full"
              src={offer.src}
              loading="lazy"
              alt="banner"
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

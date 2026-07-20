import React, { useEffect, useState } from "react";
import FooterSection from "../components/FooterSection";
import ShopHeader from "../components/ShopHeader";
import ShopSection from "../components/ShopSection";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../dummyData/baseUrl";

async function fetchOfferDetails(offerId) {
  try {
    const response = await axios.get(
      `${url}/api/client/offer-details/${offerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ShopPage = () => {
  const { offerId } = useParams();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    if (offerId) {
      fetchOfferDetails(offerId)
        .then((data) => {
					console.log("fetching offer in shop page", data.offer);
          setOffer(data.offer);
        })
        .catch((error) => {
          console.error("Error fetching offer details:", error);
        });
    }else {
      setOffer(null);
    }
  }, [offerId]);

  return (
    <>
      <ShopHeader offer={offer} />
      <ShopSection offer={offer} />
      <FooterSection />
    </>
  );
}; 

export default ShopPage;
"use client";

import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import ImageGallery from "../components/ImageGallery";
import ReviewsSection from "./ReviewsSection";
import { Link } from "react-router-dom";
//new code
import axios from "axios";
import { url } from "../dummyData/baseUrl";
import LoadingSppiner from "./LoadingSppiner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${url}/api/client/product/` + productId);
		const product = response.data.product;
		product.images.unshift(product.mainImageUrl);
    return product;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default function ProductDetails({ product }) {
  const [show2, setShow2] = useState(false);
  const breadcrumbs = [{ id: 1, name: "المتجر", href: "/shop" }];
  //new code
  const [productDetails, setProduct] = useState(null);

  const highlights = [
    "نضمن لك منتج اصلي مصنوع من الاخشاب الطبيعية",
    "إمكانية تنفيذ اي تصميم من اختياركم والمقاسات الخاصة بكم.",
    "أقوي العروض والخصومات.fetchData",
    "متاح تغير القماش والمقاسات و الألوان حسب الطلب",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const productDataRes = await fetchProductDetails(product._id);
      setProduct(productDataRes);
    };
    fetchData();
  }, [product._id]);

  if (!productDetails) {
    return <LoadingSppiner></LoadingSppiner>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link
                    to={breadcrumb.href}
                    className="mx-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </Link>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <p
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productDetails.title}
              </p>
            </li>
          </ol>
        </nav>

        {/* Image gallery and product info */}
        <div className="lg:flex lg:max-w-7xl lg:mx-auto lg:px-8 lg:gap-x-8">
          <div className="lg:w-1/2">
					<ImageGallery images={productDetails.images}></ImageGallery>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:flex lg:flex-col lg:justify-between lg:px-8 lg:pb-24 lg:w-1/2">
            <div className="lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {productDetails.title}
              </h1>
            </div>

            {/* Options */}
            <div className="pt-4 lg:px-6 lg:border-r lg:border-gray-200">
              <h2 className="sr-only">Product information</h2>
              {productDetails.price !== 0 && (
                <p className="text-3xl tracking-tight text-gray-900">
                  {productDetails.price} جنيه
                </p>
              )}

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          productDetails.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{productDetails.rating} out of 5 stars</p>
                  <p className="mr-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {productDetails.rating} مراجعة
                  </p>
                </div>
              </div>
            </div>

            <div className="py-10 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {productDetails.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">المميزات</h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pr-4 text-sm">
                    {productDetails.highlightsList?.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                {/* new open sections */}

                <div>
                  <div className="border-b py-4 border-gray-200">
                    <div
                      onClick={() => setShow2(!show2)}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <p className="text-base leading-4 text-gray-800">
                        مراجعات
                      </p>
                      <button
                        className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                        aria-label="show or hide"
                      >
                        <svg
                          className={
                            "transform " + (show2 ? "rotate-180" : "rotate-0")
                          }
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 1L5 5L1 1"
                            stroke="#4B5563"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      className={
                        "pt-4  text-gray-600 " + (show2 ? "block" : "hidden")
                      }
                      id="sect"
                    >
                      <ReviewsSection product={product}></ReviewsSection>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

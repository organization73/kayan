"use client";

import { useState } from "react";
import axios from "axios";
import { url } from "../dummyData/baseUrl";

const formFieldClasses =
  "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
const labelClasses = "block text-sm font-semibold leading-6 text-gray-900";
const containerClasses = "mx-auto max-w-2xl text-center";
const gradientClasses =
  "relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]";

export default function ComplainContact() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.firstName) newErrors.firstName = "الاسم الاول مطلوب";
    if (!formValues.lastName) newErrors.lastName = "الاسم الاخير مطلوب";
    if (!formValues.email) {
      newErrors.email = "الايميل مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "الايميل فير صالح";
    }
    if (!formValues.phoneNumber) newErrors.phoneNumber = "رقم الهاتف مطلوب";
    if (!formValues.message) newErrors.message = "محتوي الشكوي مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log("Form submitted", formValues);
      // TODO: post function
      formValues.name = `${formValues.firstName} ${formValues.lastName}`;
      axios
        .post(`${url}/api/complain`, formValues)
        .then(
					(response) => {
						console.log(response);
						alert("تم ارسال الشكوي بنجاح");
						setFormValues({
							firstName: "",
							lastName: "",
							email: "",
							phoneNumber: "",
							message: "",
						});
					})
        .catch((error) => {
          console.log(error);
					alert("حدث خطأ اثناء ارسال الشكوي");
        });
    }
  };

  return (
    <div className="mx-4 my-8 sm:my-10 lg:mx-8 relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className={gradientClasses}
        />
      </div>
      <div className={containerClasses}>
        <h2 className="text-l font-medium tracking-tight text-gray-900 sm:text-xl">
          في حالة وجود شكوي
        </h2>
        <p className="mt-2 text-md leading-8 text-gray-600">
          يرجي التواصل معنا لحل المشكلة في اسرع وقت
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-xl sm:mt-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              الاسم الاول
            </label>
            <div className="mt-2.5">
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={formValues.firstName}
                onChange={handleChange}
                className={`${formFieldClasses} ${
                  errors.firstName ? "ring-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              الاسم الاخير
            </label>
            <div className="mt-2.5">
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={formValues.lastName}
                onChange={handleChange}
                className={`${formFieldClasses} ${
                  errors.lastName ? "ring-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className={labelClasses}>
              الايميل
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
                className={`${formFieldClasses} ${
                  errors.email ? "ring-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phoneNumber" className={labelClasses}>
              رقم الهاتف
            </label>
            <div className="relative mt-2.5">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                value={formValues.phoneNumber}
                onChange={handleChange}
                dir="rtl"
                className={`${formFieldClasses} ${
                  errors.phoneNumber ? "ring-red-500" : ""
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className={labelClasses}>
              الشكوي
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formValues.message}
                onChange={handleChange}
                className={`${formFieldClasses} ${
                  errors.message ? "ring-red-500" : ""
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1">{errors.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-gray-100 px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
}

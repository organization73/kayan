// ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<button
			onClick={scrollToTop}
			className={`fixed z-20 bottom-4 right-4 bg-gray-400 text-black w-12 h-12 rounded-full shadow-lg hover:bg-gray-700 hover:text-white transition flex items-center justify-center ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			style={{ transition: "opacity 0.3s" }}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4.5 18.75l7.5-7.5 7.5 7.5"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4.5 12.75l7.5-7.5 7.5 7.5"
				/>
			</svg>
		</button>
	);
};

export default ScrollToTopButton;

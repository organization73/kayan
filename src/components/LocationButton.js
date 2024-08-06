import React from "react";

const LocationButton = () => {
	return (
		<div>
			<a
				href="https://maps.app.goo.gl/Ka9sUQCVTMDLZi2x5"
				target="_blank"
				rel="noreferrer"
				className="bg-gray-300 text-black p-4 rounded-full shadow-md transition hover:bg-gray-500 hover:text-white flex items-center justify-center"
				aria-label="Open Google Maps"
			>
				{/* <WhatsAppIcon className="h-8 w-8 text-white" /> */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
					/>
				</svg>
			</a>
		</div>
	);
};

export default LocationButton;

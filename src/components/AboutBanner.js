import React from "react";
import adImage from "../assets/img/ad.png";

function AboutBanner(props) {
	return (
		<div className="flex justify-center items-start w-full">
			<div className="flex flex-col md:flex-row items-stretch w-full mx-auto bg-gray-100">
				<div className="w-full md:w-1/2">
					<img src={adImage} alt="ad" className="w-full h-auto" />
				</div>
				<div className="bg-gray-100 p-6 md:p-10 flex flex-col justify-center items-end space-y-6 w-full md:w-1/2 h-full md:h-auto">
					<div className="space-y-4 text-right">
						<h2 className="text-neutral-900 text-2xl md:text-3xl font-medium leading-tight">
							{props.title}
						</h2>
						<p className="text-neutral-900 text-base md:text-l font-normal leading-relaxed">
							{props.subtitle}
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<span className="border-b border-neutral-900" />
						<button className="text-right text-neutral-900 font-medium">
							تسوق الآن ←
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutBanner;

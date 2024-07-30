import React from "react";
import adImage from "../assets/img/header_img.png";
import { Link } from "react-router-dom";

export default function Hero() {
	return (
		<div className=" w-full bg-gray-100 ">
			<div className="flex flex-wrap items-center">
				<div className="w-full lg:w-1/2 text-center">
					<div className="image">
						<img src={adImage} alt="Main Hero" className="mx-auto w-full" />
					</div>
				</div>
				<div className="w-full lg:w-1/2 text-right lg:text-right pb-4 ">
					<div className="content p-4">
						<h1 className="text-4xl lg:text-5xl mb-4 font-semibold">
							كيان في الاثاث
						</h1>
						<p className="mb-4 ">
							في موبيليات كيان، نقدم تشكيلة رائعة من الأثاث الدمياطي عالي الجودة
							التي يمكن أن تحول منزلك إلى ملاذ مريح وممتع على الدوام.
						</p>
						<Link
							to="/shop"
							className="btn bg-white text-black py-2 px-4 rounded text-base"
						>
							التسوق الآن
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

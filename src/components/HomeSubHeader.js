import React from "react";

function HomeSubHeader() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mx-3 gap-4 lg:mx-8 my-2">
			<div className="flex items-center lg:col-span-2 text-neutral-900 text-4xl lg:text-5xl lg:font-normal font-semibold leading-tight ">
				فريدة من نوعها
				<br />
				ببساطة أفضل
			</div>
			<div className="flex items-center justify-end lg:col-span-2 font-semibold text-neutral-700 text-sm lg:text-lg">
				كيان هو واحد من افضل الاماكن الموجودة لتوفير جميع احتياجات الاثاث
			</div>
		</div>
	);
}

export default HomeSubHeader;

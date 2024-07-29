import React from "react";
import cat1 from "../assets/img/c1.png";
import cat2 from "../assets/img/c2.png";
import cat3 from "../assets/img/c3.png";
import cat4 from "../assets/img/c4.png";
import cat5 from "../assets/img/c5.png";
import cat6 from "../assets/img/c6.png";
import cat7 from "../assets/img/c7.png";
import cat8 from "../assets/img/c7.png";

function Categories() {
	return (
		<div className="container mx-auto py-6">
			<div className="text-center">
				<div className="text-3xl mb-4">تسوق حسب الفئات</div>
				<div className="flex flex-wrap justify-center gap-3">
					{/* Category Card 1 */}
					<div className="w-1/2 sm:w-1/3 lg:w-auto">
						<div className="category-card flex flex-col items-center">
							<div className="img-container bg-custom p-3 rounded-full bg-gray-100">
								<img src={cat1} alt="مكتب" className="w-full rounded-full" />
							</div>
							<div className="category-text mt-2">مكتب</div>
						</div>
					</div>
					{/* Category Card 2 */}
					<div className="w-1/2 sm:w-1/3 lg:w-auto">
						<div className="category-card flex flex-col items-center">
							<div className="img-container bg-custom p-3 rounded-full bg-gray-100">
								<img src={cat2} alt="غرف نوم" className="w-full rounded-full" />
							</div>
							<div className="category-text mt-2">غرف نوم</div>
						</div>
					</div>
					{/* Category Card 3 */}
					<div className="w-1/2 sm:w-1/3 lg:w-auto">
						<div className="category-card flex flex-col items-center">
							<div className="img-container bg-custom p-3 rounded-full bg-gray-100">
								<img
									src={cat3}
									alt="غرف سفرة"
									className="w-full rounded-full"
								/>
							</div>
							<div className="category-text mt-2">غرف سفرة</div>
						</div>
					</div>
					{/* Category Card 4 */}
					<div className="w-1/2 sm:w-1/3 lg:w-auto">
						<div className="category-card flex flex-col items-center">
							<div className="img-container bg-custom p-3 rounded-full bg-gray-100">
								<img
									src={cat4}
									alt="غرف اطفال"
									className="w-full rounded-full"
								/>
							</div>
							<div className="category-text mt-2">غرف اطفال</div>
						</div>
					</div>
					{/* Category Card 5 */}
					<div className="w-1/2 sm:w-1/3 lg:w-auto">
						<div className="category-card flex flex-col items-center">
							<div className="img-container bg-custom p-3 rounded-full bg-gray-100">
								<img src={cat5} alt="صالونات" className="w-full rounded-full" />
							</div>
							<div className="category-text mt-2">صالونات</div>
						</div>
					</div>
					{/* Category Card 6 */}
					<div className="w-1/2 sm:w-1/3 lg:w-auto">
						<div className="category-card flex flex-col items-center">
							<div className="img-container bg-custom p-3 rounded-full bg-gray-100">
								<img src={cat6} alt="نيش" className="w-full rounded-full" />
							</div>
							<div className="category-text mt-2">نيش</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Categories;

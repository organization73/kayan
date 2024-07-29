import React from "react";

function AboutFeaturesCards() {
	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 px-4 md:px-8 lg:px-16 bg-gray-100">
			<div className="h-40 lg:h-60 rounded-lg bg-gray-100">
				<div className="px-8 flex-col justify-center items-center gap-4">
					<div className="w-8 h-8 relative" />
					<div className="flex-col justify-start items-center gap-2 flex">
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
								d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
							/>
						</svg>
						<div className="text-base font-bold uppercase leading-none">
							خدمة العملاء الممتازة
						</div>
						<div className="text-center text-sm text-gray-600">
							نحن نولي أهمية كبيرة لتجربة عملائنا. فريقنا المتخصص يسعى جاهدًا
							لتلبية احتياجاتك والرد على استفساراتك بسرعة واحترافية.
						</div>
					</div>
				</div>
			</div>
			<div className="h-40 lg:h-60 rounded-lg bg-gray-100">
				<div className="px-8 flex-col justify-center items-center gap-4">
					<div className="w-8 h-8 relative" />
					<div className="flex-col justify-start items-center gap-2 flex">
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
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
						<div className="text-base font-bold uppercase leading-none">
							جودة مضمونة
						</div>
						<div className="text-center text-sm text-gray-600">
							نحن نقدم أثاثًا مصنوعًا من أفضل المواد وبجودة استثنائية. نحرص على
							تقديم قطع تدوم طويلًا وتتحمل الاستخدام اليومي.
						</div>
					</div>
				</div>
			</div>
			<div className="h-40 lg:h-60 rounded-lg bg-gray-100">
				<div className="px-8 flex-col justify-center items-center gap-4">
					<div className="w-8 h-8 relative" />
					<div className="flex-col justify-start items-center gap-2 flex">
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
								d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
							/>
						</svg>
						<div className="text-base font-bold uppercase leading-none">
							تنوع المنتجات
						</div>
						<div className="text-center text-sm text-gray-600">
							نحن نقدم تشكيلة واسعة من الأثاث لتلبية احتياجاتك المتنوعة. سواء
							كنت تبحث عن اوض نوم او سفرة او غيرها فاننا نوفرها.
						</div>
					</div>
				</div>
			</div>
			<div className="h-40 lg:h-60 rounded-lg bg-gray-100">
				<div className="px-8 flex-col justify-center items-center gap-4">
					<div className="w-8 h-8 relative" />
					<div className="flex-col justify-start items-center gap-2 flex">
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
								d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
							/>
						</svg>
						<div className="text-base font-bold uppercase leading-none">
							تصميمات مبتكرة
						</div>
						<div className="text-center text-sm text-gray-600">
							نحن نفخر بتقديم تصميمات فريدة ومبتكرة تضيف لمسة جمالية لأي مساحة.
							ستجد لدينا تشكيلة واسعة من الأنماط والألوان التي سوف تعجبك.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutFeaturesCards;

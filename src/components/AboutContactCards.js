import React from "react";

function AboutContactCards() {
	return (
		<>
			<div className="flex-col flex justify-center items-start w-full my-8">
				<div className="self-stretch text-center text-neutral-900 text-2xl font-medium leading-10">
					تواصل معنا
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 px-4 md:px-8 lg:px-16 mb-8">
				<div className="h-36 rounded-lg bg-gray-100">
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
									d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
								/>
							</svg>

							<div className="text-zinc-500 text-base font-bold uppercase leading-none">
								العنوان
							</div>
							<div className="w-72 text-center text-neutral-900 text-base font-semibold leading-relaxed">
								مصر
							</div>
						</div>
					</div>
				</div>
				<div className="h-36 rounded-lg bg-gray-100">
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

							<div className="text-zinc-500 text-base font-bold uppercase leading-none">
								تواصل معنا
							</div>
							<div className="w-72 text-center text-neutral-900 text-base font-semibold leading-relaxed">
							 <span>1150568885</span> <span>20+</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AboutContactCards;

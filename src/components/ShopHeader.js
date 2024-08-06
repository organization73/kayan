import React from "react";
import getDisplayName from "../utils/GetDisplayName";

function ShopHeader({ offer }) {
	

	return (
		<>
			<section className="relative bg-[url(assets/img/shop_banner.png)] bg-center bg-no-repeat bg-cover px-4 md:px-8 lg:px-16 mb-8">
				<div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
					<div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right mx-auto">
						<h1 className="text-4xl sm:text-5xl font-bold">
							{offer ? `مرحبًا في عرض ${offer.title}` : "صفحة المتجر"}
						</h1>
						<p className="mt-4 max-w-lg sm:text-xl/relaxed text-center">
							دعنا نصمم المكان الذي لطالما تخيلته.
						</p>
					</div>
				</div>
			</section>

			{offer ? (
				<section className="my-8 dark:bg-dark">
					<div className="mx-4 lg:mx-8 sm:container">
						<div className="border-r-[5px] border-primary pr-5">
							<h2 className="mb-4 text-xl lg:text-2xl tracking-tight">
								يشمل هذا العرض
							</h2>
							<ul className="flex flex-col lg:flex-row">
								{offer?.categories?.map((category) => (
									<li
										className="flex text-base text-body-color ml-4"
										key={category}
									>
										<span className="mt-0.5 text-primary">
											<svg
												className="ml-2"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_980_24852)">
													<path
														d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
														fill="currentColor"
													/>
													<path
														d="M12.6875 7.09375L8.96875 10.7188L7.28125 9.0625C7 8.78125 6.5625 8.8125 6.28125 9.0625C6 9.34375 6.03125 9.78125 6.28125 10.0625L8.28125 12C8.46875 12.1875 8.71875 12.2813 8.96875 12.2813C9.21875 12.2813 9.46875 12.1875 9.65625 12L13.6875 8.125C13.9688 7.84375 13.9688 7.40625 13.6875 7.125C13.4063 6.84375 12.9688 6.84375 12.6875 7.09375Z"
														fill="currentColor"
													/>
												</g>
												<defs>
													<clipPath id="clip0_980_24852">
														<rect width={20} height={20} fill="white" />
													</clipPath>
												</defs>
											</svg>
										</span>
										{getDisplayName(category)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			) : null}
		</>
	);
}

export default ShopHeader;

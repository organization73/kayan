import React from "react";

function ShopHeader({ offer }) {
	return (
		<section className="relative bg-[url(assets/img/shop_banner.png)] bg-center bg-no-repeat px-4 md:px-8 lg:px-16 mb-8">
			<div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
				<div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right mx-auto">
				<h1 className="text-5xl sm:text-5xl font-bold">
            {offer ? `مرحبًا في عرض: ${offer.title}` : "صفحة المتجر"}
          </h1>
          <ul className="mt-8 space-y-4">
            {offer?.categories?.map((category) => (
              <li key={category} className="text-xl font-medium">
                {category}
              </li>
            ))}
          </ul>
					<p className="mt-4 max-w-lg sm:text-xl/relaxed">
						دعنا نصمم المكان الذي لطالما تخيلته.
					</p>
				</div>
			</div>
		</section>
	);
}

export default ShopHeader;

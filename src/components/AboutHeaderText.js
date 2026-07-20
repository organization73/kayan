import React from "react";

function AboutHeaderText() {
	return (
		<div className="flex-col flex justify-center items-start w-full lg:my-10 my-8">
			<div className="flex flex-col md:flex-column items-stretch w-full mx-auto px-4 md:px-8 lg:px-16">
				<div className="flex text-neutral-900 text-4xl font-medium my-8">
					نحن نؤمن بالديكور المستدام. نحن شغوفون بالحياة المنزلية.
				</div>
				<div className="flex text-neutral-900 text-base font-normal leading-relaxed">
					تتميز منتجاتنا بأثاث خالد، مصنوع من الأقمشة الطبيعية، وخطوط منحنية،
					والكثير من المرايا والتصميم الكلاسيكي، مما يمكن دمجه في أي مشروع
					ديكور. تفتن القطع بتصميمها الرصين، المصمم ليصمد لأجيال، محافظة على
					أشكال كل فترة، مع لمسة من الحاضر.
				</div>
			</div>
		</div>
	);
}

export default AboutHeaderText;

import React from "react";

const TestimonialCard = ({ src, name, text }) => (
	<blockquote className="rounded-lg bg-gray-100 p-6 shadow-sm sm:p-8">
		<div className="flex items-center gap-4">
			<img alt="" src={src} className="size-14 rounded-full object-cover" />
			<div>
				<div className="flex justify-center gap-0.5 text-yellow-400">
					{Array(5)
						.fill(0)
						.map((_, index) => (
							<svg
								key={index}
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						))}
				</div>
				<p className="mt-0.5 text-lg font-medium text-gray-900">{name}</p>
			</div>
		</div>
		<p className="mt-4 text-gray-700">{text}</p>
	</blockquote>
);

const Testimonial = () => {
	const testimonials = [
		{
			src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
			name: "أحمد",
			text: "منتج ممتاز جدا",
		},
		{
			src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
			name: "ابراهيم",
			text: "منتج ممتاز جدا",
		},
		{
			src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
			name: "خالد",
			text: "منتج ممتاز جدا",
		},
	];

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
				<h2 className="text-right text-2xl font-medium tracking-tight text-gray-900">
					اقرأ مراجعات موثوقة من عملائنا
				</h2>
				<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
					{testimonials.map((testimonial, index) => (
						<TestimonialCard
							key={index}
							src={testimonial.src}
							name={testimonial.name}
							text={testimonial.text}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonial;

import { Link } from "react-router-dom";

const products = [
	{
		id: 1,
		name: "مكتب",
		href: "/product",
		price: "$48",
		imageSrc: "https://ro2yahome.com/wp-content/uploads/2019/10/15.jpg",

		imageAlt: "مكتب",
	},
	{
		id: 2,
		name: "غرفة صالون",
		href: "/product",
		price: "$35",
		imageSrc: "https://emypost.com/wp-content/uploads/2019/12/11.jpg",

		imageAlt: "غرفة نوم",
	},
	{
		id: 3,
		name: "صالون",
		href: "/product",
		price: "$89",
		imageSrc:
			"https://mostaql.hsoubcdn.com/uploads/thumbnails/585297/628179e339c03/1.jpg",

		imageAlt: "صالون",
	},
	{
		id: 4,
		name: "صالة",
		href: "/product",
		price: "$35",
		imageSrc:
			"https://th.bing.com/th/id/R.14723de297fb42267e1a1b4ca62b9ad7?rik=KAS0OrCUb7Yorg&pid=ImgRaw&r=0",

		imageAlt: "صالة",
	},
	// More products...
];

export default function CollectionSection() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-medium tracking-tight text-gray-900">
					اختار بين اقوى كولكشن
				</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<div key={product.id} className="group relative">
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									alt={product.imageAlt}
									src={product.imageSrc}
									className="h-full w-full object-cover object-center lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-normal font-medium text-gray-700">
										<Link to={product.href}>
											<span aria-hidden="true" className="absolute inset-0" />
											{product.name}
										</Link>
									</h3>
								</div>
								{/* <p className="text-sm font-medium text-gray-900">
									{product.price}
								</p> */}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

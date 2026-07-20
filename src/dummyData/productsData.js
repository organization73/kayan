// productsData.js

const products = [
	{
		id: 1,
		name: "صالون",
		price: "12000",
		breadcrumbs: [
			{ id: 1, name: "المتجر", href: "/shop" },
			{ id: 2, name: "غرف صالون", href: "/shop" },
		],
		images: [
			{
				src: "https://mostaql.hsoubcdn.com/uploads/thumbnails/585297/628179e339c03/1.jpg",
				alt: "صالون",
			},
			{
				src: "https://th.bing.com/th/id/R.14723de297fb42267e1a1b4ca62b9ad7?rik=KAS0OrCUb7Yorg&pid=ImgRaw&r=0",
				alt: "صالون",
			},
			{
				src: "https://th.bing.com/th/id/R.f3e2e8a78fb185c97dc149bf4638b317?rik=kCQ5PIoMch54OQ&riu=http%3a%2f%2fworldexpofair.com%2fwp-content%2fuploads%2fmobil-1-1200x720.jpg&ehk=RvQbJBXRThPHAQMIw%2fc9uL%2fmHFqj%2fhJeRh0WpYk3LGQ%3d&risl=&pid=ImgRaw&r=0",
				alt: "صالون",
			},
			{
				src: "https://maharajafurniture.com/wp-content/uploads/2021/04/sofa-set4.jpg",
				alt: "صالون",
			},
		],
		description: "اوضة صالون عصري حديث ذات لون رمادي",
		highlights: [
			"نضمن لك منتج اصلي مصنوع من الاخشاب الطبيعية",
			"إمكانية تنفيذ اي تصميم من اختياركم والمقاسات الخاصة بكم.",
			"أقوي العروض والخصومات.",
			"متاح تغير القماش والمقاسات و الألوان حسب الطلب",
		],
		reviews: { average: 4, totalCount: 117 },
	},
	{
		id: 2,
		name: "مكتب",
		price: "800",
		breadcrumbs: [
			{ id: 1, name: "المتجر", href: "/shop" },
			{ id: 2, name: "مكتب", href: "/shop" },
		],
		images: [
			{
				src: "https://th.bing.com/th/id/OIP.UTn5JVC9v6JCYIjFoLknJAHaHa?rs=1&pid=ImgDetMain",
				alt: "مكتب",
			},
			{
				src: "https://th.bing.com/th/id/OIP.3DuMfCJl97L_ucu9LsLlkwHaHa?rs=1&pid=ImgDetMain",
				alt: "مكتب",
			},
			{
				src: "https://5.imimg.com/data5/NO/HV/MY-51450958/md-chairman-desk-table-1-500x500-500x500.jpg",
				alt: "مكتب",
			},
		],
		description: "مكتب خشب ممتاز",
		highlights: [
			"نضمن لك منتج اصلي مصنوع من الاخشاب الطبيعية",
			"إمكانية تنفيذ اي تصميم من اختياركم والمقاسات الخاصة بكم.",
			"أقوي العروض والخصومات.",
			"متاح تغير القماش والمقاسات و الألوان حسب الطلب",
		],
		reviews: { average: 3, totalCount: 5 },
	},
	{
		id: 3,
		name: "غرفة نوم",
		price: "26000",
		breadcrumbs: [
			{ id: 1, name: "المتجر", href: "/shop" },
			{ id: 2, name: "غرفة نوم", href: "/shop" },
		],
		images: [
			{
				src: "https://th.bing.com/th/id/R.fbaf95b86b9c3e0b6903e79ab4240436?rik=9l3KuJMjfk34Ng&riu=http%3a%2f%2femypost.com%2fwp-content%2fuploads%2f2019%2f12%2f11.jpg&ehk=vGdDltlflZgfxsPWcdESP6ty2L%2bhJEBEaS7ZXvSwBX8%3d&risl=&pid=ImgRaw&r=0",
				alt: "غرفة نوم",
			},
			{
				src: "https://www.lake.com.tr/wp-content/uploads/2022/02/urun-bella-yatak-odasi-2.jpg",
				alt: "غرفة نوم",
			},
			{
				src: "https://cdn.shopify.com/s/files/1/0030/7029/6133/products/atmacha-home-and-living-bed-king-kyoto-bed-with-storage-30956510380188_1536x1002.jpg?v=1628222597",
				alt: "غرفة نوم",
			},
		],
		description: "غرفة نوم خشب ممتاز",
		highlights: [
			"نضمن لك منتج اصلي مصنوع من الاخشاب الطبيعية",
			"إمكانية تنفيذ اي تصميم من اختياركم والمقاسات الخاصة بكم.",
			"أقوي العروض والخصومات.",
			"متاح تغير القماش والمقاسات و الألوان حسب الطلب",
		],
		reviews: { average: 5, totalCount: 20 },
	},
	// More products...
];

export default products;

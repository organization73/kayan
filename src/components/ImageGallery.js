import React, { useState } from "react";

function ImageGallery({ images }) {
	const [mainImageSrc, setMainImageSrc] = useState(images[0].src);

	const changeImage = (src) => {
		setMainImageSrc(src);
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="flex flex-wrap -mx-4">
				{/* Product Images */}
				<div className="w-full px-4 ">
					<img
						src={mainImageSrc}
						alt="Product"
						className="w-full h-64 lg:h-auto rounded-lg shadow-md mb-4"
					/>
					<div className="flex gap-4 py-4 justify-center overflow-x-auto">
						{images.map((image, index) => (
							<img
								key={index}
								src={image.src}
								alt={image.alt}
								className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
								onClick={() => changeImage(image.src)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImageGallery;

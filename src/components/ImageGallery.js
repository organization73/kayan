import React, { useState } from "react";

function ImageGallery({ images }) {
	const [mainImageSrc, setMainImageSrc] = useState(images[0]);
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);

	const changeImage = (src) => {
		setMainImageSrc(src);
	};

	const toggleOverlay = () => {
		setIsOverlayVisible(!isOverlayVisible);
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="relative flex flex-wrap -mx-4">
				{/* Product Images */}
				<div className="w-full px-4 justify-center items-center">
					<div className="relative">
						<img
							src={mainImageSrc}
							alt="Product"
							className="w-full h-80 lg:h-auto rounded-lg shadow-md mb-4"
						/>
						<button
							className="absolute top-2 right-2 bg-gray-50 opacity-70 p-2 rounded-full shadow-md hover:bg-gray-200 hover:opacity-80"
							onClick={toggleOverlay}
						>
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
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						</button>
					</div>
					<div className="flex gap-4 py-4 justify-start overflow-x-auto">
						{images.map((image, index) => (
							<img
								key={index}
								src={image}
								alt="product"
								className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
								onClick={() => changeImage(image)}
							/>
						))}
					</div>
				</div>

				{/* Full Screen Overlay */}
				{isOverlayVisible && (
					<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
						<div className="relative">
							<img
								src={mainImageSrc}
								alt="Full Size"
								className="max-w-full max-h-screen"
							/>
							<button
								className="absolute top-4 right-4 text-white text-2xl bg-gray-600 p-2 rounded-full opacity-70 hover:bg-gray-700 hover:opacity-80"
								onClick={toggleOverlay}
							>
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
										d="M6 18 18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ImageGallery;

import { React, useState } from "react";
import ReviewsCards from "./ReviewsCards";
import ReviewModal from "../components/ReviewModal"; // Import the ReviewModal component

function ReviewsSection({ productId }) {
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

	const handleReviewSubmit = (review) => {
		console.log("Review submitted:", review);
		// You can handle the submitted review here, e.g., send it to a server
	};
	return (
		<section>
			<div className="mx-auto max-w-screen-2xl ">
				<div className="md:flex md:items-center md:justify-between">
					<div className="max-w-xl">
						<h2 className="text-lg font-normal text-gray-900 ">
							مراجعات المستخدمين
						</h2>
					</div>

					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-gray-100 text-gray-900 px-4 py-2  rounded-md shadow-sm hover:bg-gray-900 hover:text-white"
					>
						كتابة مراجعة
					</button>
				</div>
				<ReviewsCards productId={productId}></ReviewsCards>
				{/* Review Modal */}
				<ReviewModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleReviewSubmit}
					productId={productId}
				/>
			</div>
		</section>
	);
}

export default ReviewsSection;

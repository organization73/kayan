import { React, useState } from "react";
import ReviewsCards from "./ReviewsCards";
import ReviewModal from "../components/ReviewModal"; // Import the ReviewModal component
import axios from "axios";
import { url } from "../dummyData/baseUrl";
function ReviewsSection({ productId }) {
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

	const handleReviewSubmit = (review) => {
		console.log("Review submitted:", review);
		review.review = review.opinion.trim();
		review.creator = {
			name: review.name.trim(),
			email: review.email.trim(),
		};
		// You can handle the submitted review here, e.g., send it to a server
		axios
			.post(`${url}/api/add-review`, review)
			.then((response) => {
				console.log(response);
				alert("تم ارسال المراجعة بنجاح");
				setIsModalOpen(false);
			})
			.catch((error) => {
				console.log(error);
				alert("حدث خطأ اثناء ارسال المراجعة");
			});
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

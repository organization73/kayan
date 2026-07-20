import { useState } from "react";

export default function ReviewModal({ isOpen, onClose, onSubmit, productId }) {
	const [rating, setRating] = useState(0);
	const [opinion, setOpinion] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ productId, rating, opinion, name, email });
		onClose(); // Close the modal after submission
	};

	if (!isOpen) return null; // Do not render the modal if it's not open

	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">كتابة مراجعة</h2>
					<button
						onClick={onClose}
						className="text-gray-600 hover:text-gray-800 focus:outline-none"
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
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							التقيم (من 5)
						</label>
						<input
							type="number"
							min="0"
							max="5"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							رأيك
						</label>
						<textarea
							value={opinion}
							onChange={(e) => setOpinion(e.target.value)}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						></textarea>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							الاسم
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							الايميل
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md shadow-sm  hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
						>
							تم
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

import React from "react";

function NoOffersBanner() {
	return (
		<div className="flex  flex-col bg-white">
			<img
				src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
				alt="no offers banner"
				className="h-64 w-full object-cover"
			/>

			<div className="flex items-center justify-center">
				<div className="mx-auto max-w-xl px-4 py-8 text-center">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
						انتظرونا في العروض القادمه
					</h1>

					<p className="mt-4 text-gray-500">
						تقديم العروض هو اهم ما يميزنا في كيان. انتظرونا قريبا
					</p>
				</div>
			</div>
		</div>
	);
}

export default NoOffersBanner;

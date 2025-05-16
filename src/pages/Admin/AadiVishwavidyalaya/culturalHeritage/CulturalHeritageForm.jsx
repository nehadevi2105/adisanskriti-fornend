import React, { useState } from "react";
import axios from "axios";

const CulturalHeritageForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [details, setDetails] = useState([
		{ title: "", content: "", uploadImage: null }
	]);

	// Handle input changes for details dynamically
	const handleDetailChange = (index, field, value) => {
		const newDetails = [...details];
		newDetails[index][field] = value;
		setDetails(newDetails);
	};

	// Add new detail row
	const addDetail = () => {
		setDetails([...details, { title: "", content: "", uploadImage: null }]);
	};

	// Submit handler
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("Title", title);
		formData.append("Description", description);

		details.forEach((detail, index) => {
			formData.append(`CulturalHeritageDetails[${index}].Title`, detail.title);
			formData.append(`CulturalHeritageDetails[${index}].Content`, detail.content);
			if (detail.uploadImage) {
				formData.append(`CulturalHeritageDetails[${index}].uploadImage`, detail.uploadImage);
			}
		});

		try {
			const response = await axios.post(
				"https://localhost:5281/api/CulturalHeritage/InsertCulturalHeritage",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			alert(response.data.message);
		} catch (error) {
			console.error("Error saving cultural heritage:", error);
			alert("Failed to save data.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 white:bg-gray-900">
			<div className="py-3 px-4 shadow-md">
				  <div className="bg-blue-600 text-white py-3 px-4 text-center">
          <h4 className="text-lg font-semibold">Add Cultural Heritage</h4>
        </div>

				<div className="p-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<form onSubmit={handleSubmit}>
							
							<input
								type="text"
								placeholder="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
							<br />
							<textarea
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<br />

							<h3>Details</h3>
							{details.map((detail, index) => (
								<div key={index}>
									<input
										type="text"
										placeholder="Detail Title"
										value={detail.title}
										onChange={(e) => handleDetailChange(index, "title", e.target.value)}
										required
									/>
									<br />
									<textarea
										placeholder="Content"
										value={detail.content}
										onChange={(e) => handleDetailChange(index, "content", e.target.value)}
									/>
									<br />
									<input
										type="file"
										onChange={(e) =>
											handleDetailChange(index, "uploadImage", e.target.files[0])
										}
									/>
									<br />
								</div>
							))}

							<button type="button" onClick={addDetail}>Add Detail</button>
							<br />
							<button type="submit">Submit</button>
						</form>

					</div>
				</div>
			</div>
		</div>
	);
};

export default CulturalHeritageForm;

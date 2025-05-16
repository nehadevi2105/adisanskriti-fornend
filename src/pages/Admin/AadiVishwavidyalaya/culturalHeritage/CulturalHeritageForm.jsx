import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Button } from "@mui/material";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import "./CulturalHeritageForm.css";

// Options for cultural category dropdown
const culturalOptions = [
	"Tribal Dance",
	"Tribal Painting",
	"Tribal Cuisine",
	"Tribal Music & Instruments",
	"Tribal Artefacts",
];

// Jodit Editor Configuration
const editorConfig = {
	readonly: false,
	toolbar: true,
	spellcheck: true,
	language: "en",
	toolbarButtonSize: "medium",
	showCharsCounter: true,
	showWordsCounter: true,
	buttons: [
		"bold",
		"italic",
		"underline",
		"|",
		"ul",
		"ol",
		"|",
		"image",
		"link",
		"|",
		"source",
	],
	uploader: { insertImageAsBase64URI: true },
	width: 800,
	height: 400,
};

const CulturalHeritageForm = () => {
	// Form state variables
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [detailsList, setDetailsList] = useState([]);
	const [detailTitle, setDetailTitle] = useState("");
	const [detailContent, setDetailContent] = useState("");
	const [detailImage, setDetailImage] = useState(null);
	const [file, setFile] = useState(null);
	const [filePath, setFilePath] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	// Reference to the Jodit editor instance
	const editor = useRef(null);

	// Add a detail to the list
	const handleAddDetail = () => {
		if (!detailTitle || !detailContent || !detailImage) {
			alert("Please fill all detail fields before adding.");
			return;
		}

		const newDetail = {
			id: Date.now(),
			title: detailTitle,
			content: detailContent,
			image: URL.createObjectURL(detailImage),
		};

		setDetailsList([...detailsList, newDetail]);

		// Clear inputs
		setDetailTitle("");
		setDetailContent("");
		setDetailImage(null);
	};

	// Handle image upload and optionally insert into editor
	const handleUploadImage = async (event) => {
		const imageFile = event.target.files[0];

		// Validate the file is an image
		if (imageFile && imageFile.type.startsWith("image/")) {
			setFile(imageFile);
			setLoading(true);
			const formDataToSend = new FormData();
			formDataToSend.append("file", imageFile);

			try {
				const response = await APIClient.post(
					apis.postCulturalHeritage,
					formDataToSend,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					},
				);

				const filePath = response.data.filepath;
				setFilePath(filePath);

				// If using JoditEditor, insert the image into editor content
				if (editor.current) {
					editor.current.selection.insertHTML(
						`<img src="${filePath}" alt="Uploaded Image" style="max-width:100%; height:auto;" />`,
					);
				}
			} catch (error) {
				console.error("Error uploading image:", error);
				setErrors({ file: "Error uploading image. Please try again." });
			} finally {
				setLoading(false);
			}
		} else {
			setErrors({
				file: "Invalid file type. Only image files are allowed.",
			});
		}
	};

	// Delete a specific detail entry
	const handleDeleteDetail = (id) => {
		setDetailsList(detailsList.filter((detail) => detail.id !== id));
	};

	// Submit the entire form
	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	if (detailsList.length === 0) {
	// 		alert("You must add at least one cultural detail before submitting.");
	// 		return;
	// 	}

	// 	// Prepare the form data
	// 	const formData = {
	// 		title,
	// 		description,
	// 		details: detailsList,
	// 	};

	// 	console.log("Submitting form data:", formData);
	// 	alert("Form submitted successfully!");

	// 	// Clear form
	// 	setTitle("");
	// 	setDescription("");
	// 	setDetailsList([]);
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (detailsList.length === 0) {
			alert("You must add at least one cultural detail before submitting.");
			return;
		}

		// Prepare the form data
		const formData = {
			title,
			description,
			details: detailsList,
		};

		try {
			setLoading(true);
			const response = await APIClient.post(
				apis.postCulturalHeritage,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);

			alert("Form submitted successfully!");
			console.log("Submitted:", response.data);

			// Clear form
			setTitle("");
			setDescription("");
			setDetailsList([]);
			setErrors({});
		} catch (error) {
			console.error(
				"Submission error:",
				error.response ? error.response.data : error.message,
			);
			alert("There was an error submitting the form.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<h2 className="form-title">Cultural Heritage Form</h2>

			{/* Title Field */}
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					placeholder="Enter title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			{/* Description Field */}
			<div className="form-group">
				<label htmlFor="description">Description</label>
				<textarea
					id="description"
					rows={3}
					placeholder="Enter description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				></textarea>
			</div>

			{/* Cultural Category Dropdown */}
			<div className="form-group">
				<label htmlFor="detailTitle">Category</label>
				<select
					id="detailTitle"
					value={detailTitle}
					onChange={(e) => setDetailTitle(e.target.value)}
				>
					<option value="">Select</option>
					{culturalOptions.map((opt, index) => (
						<option key={index} value={opt}>
							{opt}
						</option>
					))}
				</select>
			</div>

			{/* Content Editor */}
			<div className="form-group">
				<label htmlFor="detailContent">Content</label>
				<JoditEditor
					ref={editor}
					value={detailContent}
					onChange={(newContent) => setDetailContent(newContent)}
					config={editorConfig}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label text-dark">Choose Image</label>
				<input
					className="form-control"
					type="file"
					name="image"
					accept="image/*"
					onChange={(e) => setDetailImage(e.target.files[0])}
					disabled={loading}
				/>
				{errors.file && <div className="text-danger">{errors.file}</div>}

				{/* Optional: Preview selected image */}
				{detailImage && (
					<div className="mt-2">
						<img
							src={URL.createObjectURL(detailImage)}
							alt="Selected"
							style={{ width: "150px", height: "auto", borderRadius: 4 }}
						/>
					</div>
				)}
			</div>

			{/* Image Upload */}
			<div className="form-group">
				<label htmlFor="detailImage">Upload Image</label>
				<input
					type="file"
					id="detailImage"
					accept="image/*"
					onChange={(e) => setDetailImage(e.target.files[0])}
				/>
			</div>

			{/* Add Detail Button */}
			<div className="form-button-row">
				<Button variant="contained" color="success" onClick={handleAddDetail}>
					Add Detail
				</Button>
			</div>

			{/* Display List of Added Details */}
			<div className="details-table-container">
				<h4>Added Cultural Heritage Details</h4>
				<table className="details-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Category</th>
							<th>Content</th>
							<th>Image</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{detailsList.length === 0 ? (
							<tr>
								<td colSpan="5" className="no-data">
									No details added.
								</td>
							</tr>
						) : (
							detailsList.map((detail, index) => (
								<tr key={detail.id}>
									<td>{index + 1}</td>
									<td>{detail.title}</td>
									<td>
										<div
											dangerouslySetInnerHTML={{ __html: detail.content }}
										></div>
									</td>
									<td>
										<img
											src={detail.image}
											alt=""
											width={100}
											height={100}
											style={{ objectFit: "cover", borderRadius: 4 }}
										/>
									</td>
									<td>
										<Button
											variant="outlined"
											color="error"
											onClick={() => handleDeleteDetail(detail.id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Submit Form */}
			<div className="form-button-row">
				<Button type="submit" variant="contained" color="primary">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default CulturalHeritageForm;

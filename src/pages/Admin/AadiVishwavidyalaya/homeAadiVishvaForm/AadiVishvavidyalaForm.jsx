import { useState } from "react";
import { Button } from "@mui/material";
import "./AadiVishvavidyalaForm.css";

const artFormOptions = [
	"Tribal Painting",
	"Tribal Dance",
	"Tribal Clothing and Textile",
	"Tribal Artifacts",
	"Tribal Livelihood",
];

const AadiVishvavidyalaForm = () => {
	const [description, setDescription] = useState("");
	const [artFormName, setArtFormName] = useState("");
	const [imageFiles, setImageFiles] = useState([]);
	const [detailsList, setDetailsList] = useState([]);

	const handleAddDetail = () => {
		if (!artFormName || imageFiles.length === 0) {
			alert("Please select an art form and at least one image.");
			return;
		}

		const newDetail = {
			id: Date.now(),
			artFormName: artFormName,
			imageFiles: Array.from(imageFiles).map((file) =>
				URL.createObjectURL(file),
			),
		};

		setDetailsList([...detailsList, newDetail]);
		setArtFormName("");
		setImageFiles([]);
	};

	const handleDeleteDetail = (id) => {
		setDetailsList(detailsList.filter((detail) => detail.id !== id));
	};

	const handleImageChange = (event) => {
		setImageFiles(event.target.files);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (detailsList.length === 0) {
			alert("Please add at least one art form detail.");
			return;
		}

		const formData = {
			description: description,
			details: detailsList.map((detail) => ({
				artFormName: detail.artFormName,
				imageFiles: detail.imageFiles, // In a real scenario, you might need to handle file uploads differently
			})),
		};

		console.log("Form Data:", formData);
		alert("Form submitted successfully! (Data logged to console)");

		// Clear the form
		setDescription("");
		setDetailsList([]);
	};

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<h2 className="form-title">Aadi Vishvavidyala Form</h2>

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

			<div className="form-group">
				<label htmlFor="artFormName">Art Form</label>
				<select
					id="artFormName"
					value={artFormName}
					onChange={(e) => setArtFormName(e.target.value)}
				>
					<option value="">Select Art Form</option>
					{artFormOptions.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label htmlFor="imageFile">Image(s)</label>
				<input
					type="file"
					id="imageFile"
					multiple
					accept="image/*"
					onChange={handleImageChange}
				/>
				{imageFiles && imageFiles.length > 0 && (
					<div className="image-preview-container">
						{Array.from(imageFiles).map((file, index) => (
							<img
								key={index}
								src={URL.createObjectURL(file)}
								alt={file.name}
								className="image-preview"
							/>
						))}
					</div>
				)}
			</div>

			<div className="button-container">
				<Button variant="contained" color="success" onClick={handleAddDetail}>
					Add Details
				</Button>
			</div>

			<div className="details-table-container">
				<h4>Added Art Form Details</h4>
				<table className="details-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Art Form</th>
							<th>Images</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{detailsList.length === 0 ? (
							<tr>
								<td colSpan="4" className="no-data">
									No details added.
								</td>
							</tr>
						) : (
							detailsList.map((detail, index) => (
								<tr key={detail.id}>
									<td>{index + 1}</td>
									<td>{detail.artFormName}</td>
									<td>
										<div className="image-list-preview">
											{detail.imageFiles.map((image, imgIndex) => (
												<img
													key={imgIndex}
													src={image}
													alt={`preview-${imgIndex}`}
													className="list-image-preview"
												/>
											))}
										</div>
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

			<div className="button-container">
				<Button type="submit" variant="contained" color="primary">
					Submit Form
				</Button>
			</div>
		</form>
	);
};

export default AadiVishvavidyalaForm;

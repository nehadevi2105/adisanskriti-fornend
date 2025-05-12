import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx"; // Adjust path as needed
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
const CoreValueForm = () => {
	const editor = useRef(null);
	const [HtmlContent, setHtmlContent] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [formData, setFormData] = useState(null);

	const config = {
		readonly: false,
		height: 300,
	};

	const handleFormSubmit = (data) => {
		if (!HtmlContent) {
			setSnackbarMessage("Content is required.");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			return;
		}

		setFormData({ ...data, HtmlContent: HtmlContent });
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);

		const formDataToSend = new FormData();
		formDataToSend.append("Description", formData.Description);
		formDataToSend.append("HtmlContent", formData.HtmlContent);
		formDataToSend.append("Type", formData.Type);
		formDataToSend.append("Image", formData.Image[0]);

		try {
			const response = await APIClient.post(
				apis.AddCoreValueForm,
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					//method: "POST",
				},
			);

			if (response.status === 200) {
				setSnackbarMessage("Core Value submitted successfully!");
				setSnackbarSeverity("success");
				reset();
				setHtmlContent("");
			} else {
				throw new Error("Submission failed");
			}
		} catch (err) {
			setSnackbarMessage("Submission failed.");
			setSnackbarSeverity("error");
		} finally {
			setOpenSnackbar(true);
		}
	};

	return (
		<div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
			<h2 className="text-2xl font-bold mb-6 text-center">Add Core Value</h2>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				encType="multipart/form-data"
			>
				{/* Description */}
				<div className="mb-4">
					<label htmlFor="description" className="mb-1 font-medium text-black">
						Description
					</label>
					<input
						type="text"
						id="description"
						{...register("Description", {
							required: "Description is required",
						})}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.Description && (
						<p className="text-red-500 text-sm mt-1">
							{errors.Description.message}
						</p>
					)}
				</div>

				{/* Type */}
				<div className="mb-4">
					<label htmlFor="type" className="mb-1 font-medium text-black">
						Our Core Value
					</label>
					<select
						id="type"
						{...register("Type", { required: "Please select a type" })}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select</option>
						<option value="vision">Vision</option>
						<option value="mission">Mission</option>
						<option value="planning">Planning</option>
					</select>
					{errors.Type && (
						<p className="text-red-500 text-sm mt-1">{errors.Type.message}</p>
					)}
				</div>

				{/* Image */}
				<div className="mb-4">
					<label htmlFor="image" className="mb-1 font-medium text-black">
						Image Upload
					</label>
					<input
						type="file"
						id="image"
						accept="image/*"
						{...register("Image", {
							required: "Please upload an image",
							validate: (files) =>
								(files && files.length > 0) || "File is required",
						})}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.Image && (
						<p className="text-red-500 text-sm mt-1">{errors.Image.message}</p>
					)}
				</div>

				{/* Content */}
				<div className="mb-4">
					<label className="mb-1 font-medium text-black">Content</label>
					<JoditEditor
						ref={editor}
						value={HtmlContent}
						config={config}
						onChange={(newContent) => setHtmlContent(newContent)}
					/>
				</div>

				<Button variant="contained" color="primary" type="submit">
					Submit
				</Button>
			</form>

			{/* Snackbar for feedback */}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={() => setOpenSnackbar(false)}
			>
				<Alert
					onClose={() => setOpenSnackbar(false)}
					severity={snackbarSeverity}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>

			{/* Confirm Dialog */}
			<ConfirmDialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				onConfirm={handleConfirmSubmit}
			/>
		</div>
	);
};

export default CoreValueForm;

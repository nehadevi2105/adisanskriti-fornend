import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";

const EditCoreValues = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const editor = useRef(null);
	const [HtmlContent, setHtmlContent] = useState("");
	const [existingImage, setExistingImage] = useState(null);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();

	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [formData, setFormData] = useState(null);

	const config = { readonly: false,toolbar: true,
	spellcheck: true,
	language: "en",
	toolbarButtonSize: "medium",
	showCharsCounter: true,
	showWordsCounter: true,
	height: 300,
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
		"source",],
		 };

	// Fetch existing data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await APIClient.get(`${apis.GetCoreValuesById}${id}`);
				const data = response.data;
				setValue("Description", data.description);
				setValue("Type", data.type);
				setHtmlContent(data.html_content || "");
				setExistingImage(data.image_path); // assuming image path is returned
			} catch (err) {
				setSnackbarMessage("Failed to load core value.");
				setSnackbarSeverity("error");
				setOpenSnackbar(true);
			}
		};
		fetchData();
	}, [id, setValue]);

	const handleFormSubmit = (data) => {
		if (!HtmlContent) {
			setSnackbarMessage("Content is required.");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			return;
		}
		setFormData({ ...data, HtmlContent });
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);

		const formDataToSend = new FormData();
		formDataToSend.append("Id", id);
		formDataToSend.append("Description", formData.Description);
		formDataToSend.append("HtmlContent", formData.HtmlContent);
		formDataToSend.append("Type", formData.Type);

		if (formData.Image && formData.Image.length > 0) {
			// If a new image is selected, send it
			formDataToSend.append("Image", formData.Image[0]);
		} else if (existingImage) {
			// If no new image, just send the existing image name (not full path)
			const imageNameOnly = existingImage.split("/").pop(); // Extract file name
			formDataToSend.append("ImageName", imageNameOnly);
		}

		try {
			const response = await APIClient.post(
				apis.UpdateCoreValueForm + id,
				formDataToSend,
				{
					headers: { "Content-Type": "multipart/form-data" },
				},
			);

			if (response.status === 200) {
				setSnackbarMessage("Core Value updated successfully!");
				setSnackbarSeverity("success");
				navigate("/CoreValuesList");
			} else {
				throw new Error("Update failed");
			}
		} catch (err) {
			setSnackbarMessage("Update failed.");
			setSnackbarSeverity("error");
		} finally {
			setOpenSnackbar(true);
		}
	};

	return (
		<div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
			<h2 className="text-2xl font-bold mb-6 text-center">Edit Core Value</h2>
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

				{/* Image Upload */}
				<div className="mb-4">
					<label htmlFor="image" className="mb-1 font-medium text-black">
						Change Image
					</label>
					<input
						type="file"
						id="image"
						accept="image/*"
						{...register("Image")}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{existingImage && (
						<div className="mt-2">
							<p className="text-sm text-gray-500">Current Image:</p>
							<img
								/*src={existingImage}*/
								src={`${APIClient.defaults.baseURL}/${existingImage}`}
								alt="Current"
								className="h-20 mt-1 rounded"
							/>
						</div>
					)}
				</div>

				{/* Content Editor */}
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
					Update
				</Button>
			</form>

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

			<ConfirmDialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				onConfirm={handleConfirmSubmit}
			/>
		</div>
	);
};

export default EditCoreValues;

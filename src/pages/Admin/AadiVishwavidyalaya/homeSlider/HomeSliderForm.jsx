import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";

const HomeSliderForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm();

	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [formData, setFormData] = useState(null);

	const selectedFile = watch("file");

	const handleFormSubmit = (data) => {
		setFormData(data);
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);
		const formDataToSend = new FormData();
		formDataToSend.append("file", formData.file[0]);

		try {
			const response = await APIClient.post(apis.HomeSlider, formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200) {
				setSnackbarMessage("File uploaded successfully!");
				setSnackbarSeverity("success");
				reset();
			} else {
				throw new Error("Upload failed");
			}
		} catch (err) {
			console.error("Upload failed", err);
			setSnackbarMessage("Upload failed.");
			setSnackbarSeverity("error");
		} finally {
			setOpenSnackbar(true);
		}
	};

	return (
		<div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
			<h2 className="text-2xl font-bold mb-6 text-center">Add Home Slider</h2>

			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				encType="multipart/form-data"
			>
				{/* File Upload */}
				<div className="mb-4">
					<label htmlFor="file" className="mb-1 font-medium text-black block">
						Upload Image/Video
					</label>
					<input
						type="file"
						id="file"
						accept="image/*,video/*"
						{...register("file", {
							required: "Please upload an image or video",
							validate: (files) => files?.length > 0 || "File is required",
						})}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{selectedFile?.length > 0 && (
						<p className="text-gray-600 mt-1">
							Selected: {selectedFile[0]?.name}
						</p>
					)}
					{errors.file && (
						<p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
					)}
				</div>

				<Button variant="contained" color="primary" type="submit">
					Submit
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
				title="Confirm Upload"
				content="Are you sure you want to upload this image/video?"
			/>
		</div>
	);
};

export default HomeSliderForm;

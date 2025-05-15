import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./HomeSliderForm.module.css"; // Import the CSS module

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
		<div className={styles.container}>
			<h2 className={styles.heading}>Add Home Slider</h2>

			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				encType="multipart/form-data"
				className={styles.form}
			>
				{/* File Upload */}
				<div className={styles.formGroup}>
					<label htmlFor="file" className={styles.label}>
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
						className={styles.fileInput}
					/>
					{selectedFile?.length > 0 && (
						<p className={styles.fileName}>Selected: {selectedFile[0]?.name}</p>
					)}
					{errors.file && <p className={styles.error}>{errors.file.message}</p>}
				</div>

				<Button
					variant="contained"
					color="primary"
					type="submit"
					className={styles.submitButton}
				>
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

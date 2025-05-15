import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx"; // Adjust path as needed
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./CoreValueForm.module.css";
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
		<div className={styles.container}>
			<h2 className={styles.heading}>Add Core Value</h2>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				encType="multipart/form-data"
			>
				{/* Description */}
				<div className={styles.formGroup}>
					<label htmlFor="description" className={styles.label}>
						Description
					</label>
					<input
						type="text"
						id="description"
						{...register("Description", {
							required: "Description is required",
						})}
						className={styles.input}
					/>
					{errors.Description && (
						<p className={styles.error}>{errors.Description.message}</p>
					)}
				</div>

				{/* Type */}
				<div className={styles.formGroup}>
					<label htmlFor="type" className={styles.label}>
						Our Core Value
					</label>
					<select
						id="type"
						{...register("Type", { required: "Please select a type" })}
						className={styles.select}
					>
						<option value="">Select</option>
						<option value="vision">Vision</option>
						<option value="mission">Mission</option>
						<option value="planning">Planning</option>
					</select>
					{errors.Type && <p className={styles.error}>{errors.Type.message}</p>}
				</div>

				{/* Image */}
				<div className={styles.formGroup}>
					<label htmlFor="image" className={styles.label}>
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
						className={styles.input}
					/>
					{errors.Image && (
						<p className={styles.error}>{errors.Image.message}</p>
					)}
				</div>

				{/* Content */}
				<div className={styles.formGroup}>
					<label className={styles.label}>Content</label>
					<div className={styles.joditEditor}>
						<JoditEditor
							ref={editor}
							value={HtmlContent}
							config={config}
							onChange={(newContent) => setHtmlContent(newContent)}
						/>
					</div>
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

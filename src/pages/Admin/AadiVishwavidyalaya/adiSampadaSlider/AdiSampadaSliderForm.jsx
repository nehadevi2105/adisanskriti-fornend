import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./AdiSampadaForm.module.css";

const AdiSampadaForm = () => {
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

	const watchImage = watch("image");
	const watchSliderVideo = watch("slidervideo");

	const handleFormSubmit = (data) => {
		if (!data.image?.length) {
			setSnackbarMessage("Please upload image.");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			return;
		}

		// if (data.image?.length && data.slidervideo?.length) {
		// 	setSnackbarMessage("Please upload only one: image or video, not both.");
		// 	setSnackbarSeverity("error");
		// 	setOpenSnackbar(true);
		// 	return;
		// }

		setFormData(data);
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);

		const formDataToSend = new FormData();
		formDataToSend.append("artform", formData.artform);

		if (formData.image?.length > 0) {
			formDataToSend.append("image", formData.image[0]);
		}
		// else if (formData.slidervideo?.length > 0) {
		// 	formDataToSend.append("slidervideo", formData.slidervideo[0]);
		// }

		try {
			const response = await APIClient.post(
				apis.AddAdiSampadaForm,
				formDataToSend,
				{
					headers: { "Content-Type": "multipart/form-data" },
				},
			);

			if (response.status === 200) {
				setSnackbarMessage("Adi Sampada submitted successfully!");
				setSnackbarSeverity("success");
				reset();
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
			<h2 className={styles.heading}>Adi Sampada Form</h2>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				encType="multipart/form-data"
			>
				{/* Artform Dropdown */}
				<div className={styles.formGroup}>
					<label htmlFor="artform" className={styles.label}>
						Artform
					</label>
					<select
						id="artform"
						{...register("artform", { required: "Please select an artform" })}
						className={styles.select}
					>
						<option value="">Select</option>
						<option value="Tribal Painting">Tribal Painting</option>
						<option value="Tribal dance">Tribal dance</option>
						<option value="Tribal clothing and texttile">
							Tribal clothing and texttile
						</option>
						<option value="Tribal artifacts">Tribal artifacts</option>
						<option value="Tribal livelihood">Tribal livelihood</option>
					</select>
					{errors.artform && (
						<p className={styles.error}>{errors.artform.message}</p>
					)}
				</div>

				{/* Image Upload */}
				<div className={styles.formGroup}>
					<label htmlFor="image" className={styles.label}>
						Image Upload
					</label>
					<input
						type="file"
						id="image"
						accept="image/*"
						{...register("image")}
						className={styles.input}
					/>
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

			{/* Snackbar */}
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

export default AdiSampadaForm;

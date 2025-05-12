import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Button,
	TextField,
	Typography,
	Box,
	InputLabel,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import { Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const AdiSanskritiForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [formData, setFormData] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [fileData, setFileData] = useState({
		Aadivishwavidyalaya_Images: [],
		Aadisampada_Images: [],
		Aadihaat_Images: [],
	});

	const [previews, setPreviews] = useState({
		Aadivishwavidyalaya_Images: [],
		Aadisampada_Images: [],
		Aadihaat_Images: [],
	});

	const handleImageChange = (event, fieldName) => {
		const files = Array.from(event.target.files);

		const validFiles = files.filter((file) => {
			if (!file.type.startsWith("image/")) {
				alert("Only image files are allowed.");
				return false;
			}
			if (file.size > MAX_FILE_SIZE) {
				alert("Each file must be less than 5MB.");
				return false;
			}
			return true;
		});

		const newPreviews = validFiles.map((file) => ({
			name: file.name,
			url: URL.createObjectURL(file),
		}));

		setFileData((prev) => ({
			...prev,
			[fieldName]: [...prev[fieldName], ...validFiles],
		}));

		setPreviews((prev) => ({
			...prev,
			[fieldName]: [...prev[fieldName], ...newPreviews],
		}));

		// Update form value
		setValue(fieldName, [...fileData[fieldName], ...validFiles]);
	};

	const handleRemoveImage = (fieldName, index) => {
		const newFiles = [...fileData[fieldName]];
		const newPreviews = [...previews[fieldName]];

		newFiles.splice(index, 1);
		newPreviews.splice(index, 1);

		setFileData((prev) => ({ ...prev, [fieldName]: newFiles }));
		setPreviews((prev) => ({ ...prev, [fieldName]: newPreviews }));

		setValue(fieldName, newFiles);
	};

	const onSubmit = (data) => {
		// Save plain form data and file data together for confirmation step
		setFormData({ ...data, files: fileData });

		console.log("Confirm dialog should open now");
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);

		if (!formData) {
			setSnackbarMessage("Submission failed due to internal error.");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			return;
		}

		const formDataToSend = new FormData();

		// Append text field
		formDataToSend.append("Description", formData.Description);

		// Append each image group
		const imageFields = [
			"Aadivishwavidyalaya_Images",
			"Aadisampada_Images",
			"Aadihaat_Images",
		];

		for (const field of imageFields) {
			if (formData.files[field]?.length) {
				for (const file of formData.files[field]) {
					formDataToSend.append(field, file);
				}
			}
		}

		try {
			const response = await APIClient.post(
				apis.AddAdiSanskriti,
				formDataToSend,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);
			console.log(response.data);

			if (response.status === 200) {
				setSnackbarMessage("Form submitted successfully!");
				setSnackbarSeverity("success");
				reset();
				setFileData({
					Aadivishwavidyalaya_Images: [],
					Aadisampada_Images: [],
					Aadihaat_Images: [],
				});
				setPreviews({
					Aadivishwavidyalaya_Images: [],
					Aadisampada_Images: [],
					Aadihaat_Images: [],
				});
			} else {
				throw new Error("Submission failed");
			}
		} catch (error) {
			setSnackbarMessage("Submission failed.");
			setSnackbarSeverity("error");
		} finally {
			setOpenSnackbar(true);
		}
	};

	// const onSubmit = (data) => {
	// 	const formDataToSend = new FormData();

	// 	// Append files per field
	// 	for (const key of Object.keys(fileData)) {
	// 		for (const file of fileData[key]) {
	// 			formData.append(key, file);
	// 		}
	// 	}

	// 	setFormData(formDataToSend); // Save data for confirmation step
	// 	console.log("Confirm dialog should open now");

	// 	setConfirmOpen(true); // Open confirmation dialog
	// };

	// const handleConfirmSubmit = async () => {
	// 	setConfirmOpen(false);

	// 	if (!formData) {
	// 		setSnackbarMessage("Submission failed due to internal error.");
	// 		setSnackbarSeverity("error");
	// 		setOpenSnackbar(true);
	// 		return;
	// 	}

	// 	try {
	// 		const response = await APIClient.post(apis.AddAdiSanskriti, formData, {
	// 			headers: { "Content-Type": "multipart/form-data" },
	// 		});

	// 		if (response.status === 200) {
	// 			setSnackbarMessage("Form submitted successfully!");
	// 			setSnackbarSeverity("success");
	// 			reset();
	// 			setFileData({
	// 				Aadivishwavidyalaya_Images: [],
	// 				Aadisampada_Images: [],
	// 				Aadihaat_Images: [],
	// 			});
	// 			setPreviews({
	// 				Aadivishwavidyalaya_Images: [],
	// 				Aadisampada_Images: [],
	// 				Aadihaat_Images: [],
	// 			});
	// 		} else {
	// 			throw new Error("Submission failed");
	// 		}
	// 	} catch (error) {
	// 		setSnackbarMessage("Submission failed.");
	// 		setSnackbarSeverity("error");
	// 	} finally {
	// 		setOpenSnackbar(true);
	// 	}
	// };

	const renderUploadSection = (label, fieldName) => (
		<Box sx={{ mt: 2 }}>
			<InputLabel>{label}</InputLabel>
			<Button variant="contained" component="label" sx={{ mt: 1 }}>
				Upload Images
				<input
					type="file"
					hidden
					multiple
					accept="image/*"
					onChange={(e) => handleImageChange(e, fieldName)}
				/>
			</Button>

			{previews[fieldName]?.length > 0 && (
				<Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
					{previews[fieldName].map((file, idx) => (
						<Box key={idx} sx={{ position: "relative" }}>
							<img
								src={file.url}
								alt={file.name}
								style={{ width: "75px", height: "auto", borderRadius: 4 }}
							/>
							<IconButton
								size="small"
								color="error"
								onClick={() => handleRemoveImage(fieldName, idx)}
								sx={{
									position: "absolute",
									top: -10,
									right: -10,
									backgroundColor: "#fff",
								}}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</Box>
					))}
				</Box>
			)}
		</Box>
	);

	return (
		<div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">
					AdiSanskriti Form
				</h2>

				<TextField
					label="Description"
					variant="outlined"
					{...register("Description", { required: "Description is required" })}
					error={!!errors.Description}
					helperText={errors.Description?.message}
					fullWidth
				/>

				{renderUploadSection(
					"Aadivishwavidyalaya Images",
					"Aadivishwavidyalaya_Images",
				)}
				{renderUploadSection("Aadisampada Images", "Aadisampada_Images")}
				{renderUploadSection("Aadihaat Images", "Aadihaat_Images")}

				<Button variant="contained" color="primary" type="submit">
					Submit
				</Button>
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
			</Box>
		</div>
	);
};

export default AdiSanskritiForm;

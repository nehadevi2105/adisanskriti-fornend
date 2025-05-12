import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Button,
	TextField,
	Typography,
	Box,
	InputLabel,
	IconButton,
	Snackbar,
	Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const EditAdiSanskriti = () => {
	const { id } = useParams();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const [formData, setFormData] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
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

	const [existingPreviews, setExistingPreviews] = useState({
		Aadivishwavidyalaya_Images: [],
		Aadisampada_Images: [],
		Aadihaat_Images: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await APIClient.get(apis.GetAdiSanskritiById + id);
				const data = response.data;

				setValue("description", data.description);
				setValue("id", data.id);

				const toImageArray = (field) =>
					Array.isArray(field)
						? field
						: typeof field === "string" && field !== ""
							? field.split(",")
							: [];

				setExistingPreviews({
					Aadivishwavidyalaya_Images: toImageArray(
						data.aadivishwavidyalaya_imagepath,
					).map((url) => ({
						name: url.split("/").pop(),
						url,
					})),
					Aadisampada_Images: toImageArray(data.aadisampada_imagepath).map(
						(url) => ({
							name: url.split("/").pop(),
							url,
						}),
					),
					Aadihaat_Images: toImageArray(data.aadihaat_imagepath).map((url) => ({
						name: url.split("/").pop(),
						url,
					})),
				});

				// setExistingPreviews({
				// 	Aadivishwavidyalaya_Images:
				// 		data.aadivishwavidyalaya_imagepath?.map((url) => ({
				// 			name: url.split("/").pop(),
				// 			url,
				// 		})) || [],
				// 	Aadisampada_Images:
				// 		data.aadisampada_imagepath?.map((url) => ({
				// 			name: url.split("/").pop(),
				// 			url,
				// 		})) || [],
				// 	Aadihaat_Images:
				// 		data.aadihaat_imagepath?.map((url) => ({
				// 			name: url.split("/").pop(),
				// 			url,
				// 		})) || [],
				// });
			} catch (error) {
				console.error("Failed to fetch data", error);
			}
		};

		fetchData();
	}, [id, setValue]);

	const handleImageChange = (event, fieldName) => {
		const files = Array.from(event.target.files);
		const validFiles = files.filter((file) => {
			if (!file.type.startsWith("image/") || file.size > MAX_FILE_SIZE) {
				alert("Only image files under 5MB are allowed.");
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

	const handleRemoveExistingImage = (fieldName, index) => {
		const newExisting = [...existingPreviews[fieldName]];
		newExisting.splice(index, 1);
		setExistingPreviews((prev) => ({ ...prev, [fieldName]: newExisting }));
	};

	const onSubmit = (data) => {
		setFormData({ ...data, files: fileData });
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);
		if (!formData) return;

		const formDataToSend = new FormData();
		formDataToSend.append("id", id);
		formDataToSend.append("description", formData.description);

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
				apis.UpdateAdiSanskriti,
				formDataToSend,
				{
					headers: { "Content-Type": "multipart/form-data" },
				},
			);
			if (response.status === 200) {
				setSnackbarMessage("Update successful!");
				setSnackbarSeverity("success");
			} else throw new Error();
		} catch (error) {
			console.error("Error submitting form", error);
			setSnackbarMessage("Update failed.");
			setSnackbarSeverity("error");
		} finally {
			setOpenSnackbar(true);
		}
	};

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

			{/* Existing Images */}
			{existingPreviews[fieldName]?.length > 0 && (
				<>
					<Typography variant="subtitle2" sx={{ mt: 2 }}>
						Existing Images
					</Typography>
					<Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
						{existingPreviews[fieldName].map((file, idx) => (
							<Box key={idx} sx={{ position: "relative" }}>
								<img
									src={file.url}
									alt={file.name}
									style={{ width: "75px", height: "auto", borderRadius: 4 }}
								/>
								<IconButton
									size="small"
									color="error"
									onClick={() => handleRemoveExistingImage(fieldName, idx)}
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
				</>
			)}

			{/* New Images */}
			{previews[fieldName]?.length > 0 && (
				<>
					<Typography variant="subtitle2" sx={{ mt: 2 }}>
						New Images
					</Typography>
					<Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
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
				</>
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
					Edit AdiSanskriti
				</h2>

				<TextField
					label="Description"
					variant="outlined"
					{...register("description", { required: "Description is required" })}
					error={!!errors.description}
					helperText={errors.description?.message}
					fullWidth
				/>

				{renderUploadSection(
					"Aadivishwavidyalaya Images",
					"Aadivishwavidyalaya_Images",
				)}
				{renderUploadSection("Aadisampada Images", "Aadisampada_Images")}
				{renderUploadSection("Aadihaat Images", "Aadihaat_Images")}

				<Button variant="contained" color="primary" type="submit">
					Update
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

export default EditAdiSanskriti;

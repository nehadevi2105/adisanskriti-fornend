import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	FormHelperText,
	Button,
	Snackbar,
	Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";

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

const EditRepoContent = () => {
	const { id } = useParams();

	const defaultValues = {
		artForm: "",
		theme: "",
		heading: "",
		state: "",
		tribe: "",
	};

	const {
		handleSubmit,
		control,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues,
	});

	const [htmlContent, setHtmlContent] = useState("");
	const [stateOptions, setStateOptions] = useState([]);
	const [tribeOptions, setTribeOptions] = useState([]);
	const [themeOptions, setThemeOptions] = useState([]);
	const [artFormOptions] = useState([
		"Tribal Painting",
		"Tribal Dance",
		"Tribal Clothing and Textile",
		"Tribal Artifacts",
		"Tribal Livelihood",
	]);

	const [formData, setFormData] = useState(null);
	const [repoData, setRepoData] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const selectedState = watch("state");

	useEffect(() => {
		// Fetching states
		APIClient.get(apis.State)
			.then((res) => {
				const uniqueStates = res.data?.filter(
					(val, idx, self) =>
						idx === self.findIndex((t) => t.state === val.state),
				);
				setStateOptions(uniqueStates);
			})
			.catch((err) => console.error("Failed to fetch states", err));

		// Fetching themes
		APIClient.get(apis.Theme)
			.then((res) => setThemeOptions(res.data || []))
			.catch((err) => console.error("Failed to fetch themes", err));
	}, []);

	// useEffect(() => {
	// 	// Fetching tribes based on selected state
	// 	if (selectedState) {
	// 		APIClient.get(apis.TribebyState + selectedState)
	// 			.then((res) => {
	// 				setTribeOptions(res.data || []);
	// 				setValue("tribe", ""); // reset tribe when state changes
	// 			})
	// 			.catch((err) => console.error("Failed to fetch tribes", err));
	// 	}
	// }, [selectedState, setValue]);
	// useEffect(() => {
	// 	const fetchTribes = async () => {
	// 	  if (!selectedState) return;
	// 	  try {
	// 		const res = await APIClient.get(`/api/Tribes/getbyid/${selectedState}`);
	// 		setTribeOptions(res.data); // Keep full object
	// 		setValue("tribe", ""); // Reset tribe on state change
	// 	  } catch (err) {
	// 		console.error("Failed to fetch tribes", err);
	// 	  }
	// 	};
	// 	fetchTribes();
	//   }, [selectedState, setValue]);
		useEffect(() => {
			const fetchTribes = async () => {
				if (!selectedState) {
					setTribeOptions([]);
					setValue("tribe", "");
					return;
				}
				try {
					const res = await APIClient.get(`/api/Tribes/getbyid/${encodeURIComponent(selectedState)}`);
					const tribes = res.data.map(item => ({
						id: item.id,
						name: item.tribename
					}));

					setTribeOptions(tribes);
	
					if (repoData && tribes.includes(repoData.tribe)) {
						setValue("tribe", repoData.tribe);
					} else if (repoData && selectedState === repoData.state && !tribes.includes(repoData.tribe)) {
						setTribeOptions([...tribes, repoData.tribe]);
						setValue("tribe", repoData.tribe);
					}
				} catch (error) {
					console.error("Failed to fetch tribes:", error);
					setTribeOptions([]);
					setValue("tribe", "");
					setSnackbarMessage("Failed to fetch tribes for the selected state.");
					setSnackbarSeverity("error");
					setOpenSnackbar(true);
				}
			};
			fetchTribes();
		}, [selectedState, setValue, repoData]);
	  

	useEffect(() => {
		// Fetching data by ID for editing
		if (id) {
			APIClient.get(apis.GetByIdRepoContent + id)
				.then((res) => {
					const data = res.data;
					reset({
						artForm: data.artform || "",
						theme: data.theme || "",
						heading: data.heading || "",
						state: data.state || "",
						tribe: data.tribe || "",
					});
					setHtmlContent(data.html_content || "");
				})
				.catch((err) =>
					console.error("Failed to fetch repo content by ID", err),
				);
		}
	}, [id, reset]);

	const handleFormSubmit = (data) => {
		const formPayload = {
			id,
			artForm: data.artForm,
			theme: data.theme,
			heading: data.heading,
			state: data.state,
			tribe: data.tribe,
			htmlContent: htmlContent,
		};
		setFormData(formPayload);
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);

		if (!formData) {
			setSnackbarMessage("Submission failed. Missing form data.");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			return;
		}

		try {
			await APIClient.post(apis.updateRepoContent+id, formData);
			setSnackbarMessage("Repo content updated successfully!");
			setSnackbarSeverity("success");
		} catch (err) {
			console.error("Update failed:", err);
			setSnackbarMessage("Update failed. Try again.");
			setSnackbarSeverity("error");
		} finally {
			setOpenSnackbar(true);
		}
	};

	return (
		<Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 4 }}>
			<Typography variant="h5" gutterBottom>
				Edit Repo Content
			</Typography>

			<form onSubmit={handleSubmit(handleFormSubmit)}>
				{/* Artform Dropdown */}
				<FormControl fullWidth margin="normal" error={!!errors.artForm}>
					<InputLabel>Artform</InputLabel>
					<Controller
						name="artForm"
						control={control}
						rules={{ required: "Artform is required" }}
						render={({ field }) => (
							<Select {...field} label="Artform">
								<MenuItem value="">Select Artform</MenuItem>
								{artFormOptions.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						)}
					/>
					<FormHelperText>{errors.artForm?.message}</FormHelperText>
				</FormControl>

				{/* Theme Dropdown */}
				<FormControl fullWidth margin="normal" error={!!errors.theme}>
					<InputLabel>Theme</InputLabel>
					<Controller
						name="theme"
						control={control}
						rules={{ required: "Theme is required" }}
						render={({ field }) => (
							<Select {...field} label="Theme">
								<MenuItem value="">Select Theme</MenuItem>
								{themeOptions.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.theme}
									</MenuItem>
								))}
							</Select>
						)}
					/>
					<FormHelperText>{errors.theme?.message}</FormHelperText>
				</FormControl>

				{/* Heading Input */}
				<FormControl fullWidth margin="normal" error={!!errors.heading}>
					<InputLabel shrink htmlFor="heading-input">
						Heading
					</InputLabel>
					<Controller
						name="heading"
						control={control}
						rules={{ required: "Heading is required" }}
						render={({ field }) => (
							<input
								{...field}
								id="heading-input"
								placeholder="Enter Heading"
								className="w-full p-2 rounded mt-1"
								style={{
									padding: "10px",
									marginTop: "10px",
									borderRadius: "4px",
									width: "100%",
									border: "1px solid #ccc",
								}}
							/>
						)}
					/>
					<FormHelperText>{errors.heading?.message}</FormHelperText>
				</FormControl>

				{/* State Dropdown */}
				<FormControl fullWidth margin="normal" error={!!errors.state}>
					<InputLabel>State</InputLabel>
					<Controller
						name="state"
						control={control}
						rules={{ required: "State is required" }}
						render={({ field }) => (
							<Select {...field} label="State">
								<MenuItem value="">Select State</MenuItem>
								{stateOptions.map((state) => (
									<MenuItem key={state.id} value={state.state}>
										{state.state}
									</MenuItem>
								))}
							</Select>
						)}
					/>
					<FormHelperText>{errors.state?.message}</FormHelperText>
				</FormControl>

				{/* Tribe Dropdown */}
				<FormControl
					fullWidth
					margin="normal"
					error={!!errors.tribe}
					disabled={!selectedState}
				>
					<InputLabel>Tribe</InputLabel>
					<Controller
						name="tribe"
						control={control}
						rules={{ required: "Tribe is required" }}
						render={({ field }) => (
							<Select {...field} label="Tribe">
								<MenuItem value="">Select Tribe</MenuItem>
								{/* Display tribes based on selected state */}
								{tribeOptions.map((tribe) => (
								<MenuItem key={tribe.id} value={tribe.id}>
									{tribe.name}
								</MenuItem>
								
								))}

							</Select>
						)}
					/>
					<FormHelperText>{errors.tribe?.message}</FormHelperText>
				</FormControl>

				{/* Jodit Editor */}
				<JoditEditor
					value={htmlContent}
					config={editorConfig}
					onChange={(newContent) => setHtmlContent(newContent)}
				/>

				{/* Submit Button */}
				<Button variant="contained" type="submit" sx={{ mt: 2 }}>
					Submit
				</Button>
			</form>

			{/* Snackbar for Notifications */}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
			>
				<Alert
					severity={snackbarSeverity}
					onClose={() => setOpenSnackbar(false)}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>

			{/* Confirm Dialog */}
			<ConfirmDialog
				open={confirmOpen}
				onConfirm={handleConfirmSubmit}
				onClose={() => setConfirmOpen(false)}
				title="Confirm Submission"
				message="Are you sure you want to submit?"
			/>
		</Box>
	);
};

export default EditRepoContent;

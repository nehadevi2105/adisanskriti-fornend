import { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import "jodit";
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	FormHelperText,
	Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";
import styles from "./AddRepoContentForm.module.css";

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

const AddRepoContentForm = () => {
	// Add default values for the form
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

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [htmlContent, setHtmlContent] = useState("");
	const [formData, setFormData] = useState(null);

	const state = watch("state");

	// Simple direct closure for snackbar - matching CoreValueForm approach

	// Function to reset form completely
	const resetFormCompletely = () => {
		reset(defaultValues);
		setHtmlContent("");
	};

	// Fetch and deduplicate states by name
	useEffect(() => {
		APIClient.get(apis.State)
			.then((res) => {
				const allStates = res.data || [];
				const uniqueStates = allStates.filter(
					(value, index, self) =>
						index === self.findIndex((t) => t.state === value.state),
				);
				setStateOptions(uniqueStates);
			})
			.catch((err) => {
				console.error("Failed to fetch states", err);
			});
	}, []);

	// Fetch themes
	useEffect(() => {
		APIClient.get(apis.Theme).then((res) => {
			setThemeOptions(res.data || []);
		});
	}, []);

	// Fetch tribes when state changes
	useEffect(() => {
		if (state) {
			APIClient.get(apis.TribebyState + state)
				.then((res) => {
					setTribeOptions(res.data || []);
					setValue("tribe", ""); // reset tribe when state changes
				})
				.catch((err) => {
					console.error("Failed to fetch tribes", err);
				});
		}
	}, [state, setValue]);

	const handleFormSubmit = (data) => {
		const formPayload = {
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

		// For debugging
		console.log("Form data to submit:", formData);

		if (!formData) {
			console.error("Form data is null");
			setSnackbarMessage("Submission failed. Form data is missing.");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			return;
		}

		try {
			const response = await APIClient.post(apis.RepoContent, formData);
			console.log("API Response:", response);
			setSnackbarMessage("Repo content submitted successfully!");
			setSnackbarSeverity("success");
			resetFormCompletely(); // Use the dedicated reset function
		} catch (error) {
			console.error("API Error:", error);
			setSnackbarMessage("Submission failed. Please try again.");
			setSnackbarSeverity("error");
		} finally {
			// Always set the snackbar to open, whether success or failure
			setOpenSnackbar(true);
		}
	};

	// Debug function to test snackbar visibility
	const testSnackbar = () => {
		console.log("Testing snackbar");
		setSnackbarMessage("Test message");
		setSnackbarSeverity("info");
		// Using this pattern ensures the state is updated before we log it
		setOpenSnackbar(true);
		// Note: The console log here will show the previous state value due to React's state update timing
		// The true value would only be visible in the next render cycle
		console.log("Snackbar requested to open");
	};

	return (
		<Box className={styles.container}>
			<Typography variant="h5" gutterBottom className={styles.heading}>
				Submit Repo Content
			</Typography>

			<form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
				{/* Artform Dropdown */}
				<FormControl
					fullWidth
					margin="normal"
					error={!!errors.artForm}
					className={styles.formControl}
				>
					<InputLabel className={styles.label}>Artform</InputLabel>
					<Controller
						name="artForm"
						control={control}
						rules={{ required: "Artform is required" }}
						render={({ field }) => (
							<Select {...field} label="Artform" className={styles.select}>
								<MenuItem value="">Select Artform</MenuItem>
								{artFormOptions.map((option) => (
									<MenuItem
										key={option}
										value={option}
										className={styles.menuItem}
									>
										{option}
									</MenuItem>
								))}
							</Select>
						)}
					/>
					<FormHelperText className={styles.formHelperText}>
						{errors.artForm?.message}
					</FormHelperText>
				</FormControl>

				{/* Theme Dropdown */}
				<FormControl
					fullWidth
					margin="normal"
					error={!!errors.theme}
					className={styles.formControl}
				>
					<InputLabel className={styles.label}>Theme</InputLabel>
					<Controller
						name="theme"
						control={control}
						rules={{ required: "Theme is required" }}
						render={({ field }) => (
							<Select {...field} label="Theme" className={styles.select}>
								<MenuItem value="">Select Theme</MenuItem>
								{themeOptions.map((option) => (
									<MenuItem
										key={option.id}
										value={option.id}
										className={styles.menuItem}
									>
										{option.theme}
									</MenuItem>
								))}
							</Select>
						)}
					/>
					<FormHelperText className={styles.formHelperText}>
						{errors.theme?.message}
					</FormHelperText>
				</FormControl>

				{/* Heading Input */}
				<FormControl
					fullWidth
					margin="normal"
					error={!!errors.heading}
					className={styles.formControl}
				>
					<InputLabel shrink htmlFor="heading-input" className={styles.label}>
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
								className={styles.input}
								placeholder="Enter Heading"
							/>
						)}
					/>
					<FormHelperText className={styles.formHelperText}>
						{errors.heading?.message}
					</FormHelperText>
				</FormControl>

				{/* State Dropdown */}
				<FormControl
					fullWidth
					margin="normal"
					error={!!errors.state}
					className={styles.formControl}
				>
					<InputLabel id="state-label" className={styles.label}>
						State
					</InputLabel>
					<Controller
						name="state"
						control={control}
						rules={{ required: "State is required" }}
						render={({ field }) => (
							<Select
								{...field}
								labelId="state-label"
								label="State"
								className={styles.select}
							>
								<MenuItem value="">Select State</MenuItem>
								{stateOptions.map((state) => (
									<MenuItem
										key={state.id}
										value={state.state}
										className={styles.menuItem}
									>
										{state.state}
									</MenuItem>
								))}
							</Select>
						)}
					/>
					<FormHelperText className={styles.formHelperText}>
						{errors.state?.message}
					</FormHelperText>
				</FormControl>

				{/* Tribe Dropdown */}
				<FormControl
					fullWidth
					margin="normal"
					error={!!errors.tribe}
					disabled={!tribeOptions.length}
					className={styles.formControl}
				>
					<InputLabel id="tribe-label" className={styles.label}>
						Tribe
					</InputLabel>
					<Controller
						name="tribe"
						control={control}
						rules={{ required: "Tribe is required" }}
						render={({ field }) => (
							<Select
								{...field}
								labelId="tribe-label"
								label="Tribe"
								className={styles.select}
							>
								<MenuItem value="">Select Tribe</MenuItem>
								{tribeOptions.map((tribe) => (
									<MenuItem
										key={tribe.id}
										value={tribe.tribename}
										className={styles.menuItem}
									>
										{tribe.tribename}
									</MenuItem>
								))}
							</Select>
						)}
					/>
					<FormHelperText className={styles.formHelperText}>
						{errors.tribe?.message}
					</FormHelperText>
				</FormControl>

				{/* Repo Details */}
				{/* Jodit Editor */}
				<div className={styles.editorWrapper}>
					<label className={styles.editorLabel}>Repo Details</label>
					<JoditEditor
						value={htmlContent}
						config={editorConfig}
						onChange={(value) => setHtmlContent(value)}
					/>
				</div>

				{/* Submit Button */}
				<Button
					type="submit"
					variant="contained"
					className={styles.submitButton}
				>
					Submit
				</Button>

				{/* Reset Button */}
				<Button
					onClick={resetFormCompletely}
					variant="outlined"
					className={styles.resetButton}
				>
					Reset Form
				</Button>
			</form>

			{/* For testing snackbar visibility */}
			<Button
				onClick={testSnackbar}
				variant="text"
				className={styles.testButton}
			>
				Test Snackbar
			</Button>

			{/* Confirm Dialog */}
			<ConfirmDialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				onConfirm={handleConfirmSubmit}
			/>

			{/* Snackbar - Updated to match CoreValueForm implementation */}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					severity={snackbarSeverity}
					variant="filled"
					onClose={() => setOpenSnackbar(false)}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default AddRepoContentForm;

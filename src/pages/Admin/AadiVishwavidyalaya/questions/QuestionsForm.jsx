import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx"; // Adjust path as needed
import styles from "./QuestionsForm.module.css"; // Import the CSS module

const QuestionsForm = () => {
	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			options: ["", "", "", ""], // Initialize options in defaultValues
		},
	});
	const [courses, setCourses] = useState([]);
	const [modules, setModules] = useState([]);
	const [showOptions, setShowOptions] = useState(false);
	const [options, setOptions] = useState(["", "", "", ""]);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	// Define formData state and setFormData function here
	const [formData, setFormData] = useState(null);

	useEffect(() => {
		APIClient.get("/api/Course").then((res) => setCourses(res.data || []));
		APIClient.get("/api/CourseModule/get").then((res) =>
			setModules(res.data || []),
		);
	}, []);

	const handleOptionChange = (index, value) => {
		const updated = [...options];
		updated[index] = value;
		setOptions(updated);
		setValue(`options[${index}]`, value);
	};

	const handleFormSubmit = (data) => {
		// Prepare formDataToSend here when the form is submitted
		const formDataToSend = new FormData();
		formDataToSend.append("course", data.course);
		formDataToSend.append("coursemodule", data.ModuleName);
		formDataToSend.append("questionText", data.questionText);
		data.options.forEach((option, index) => {
			formDataToSend.append(`options[${index}]`, option);
		});
		formDataToSend.append("correctAnswer", data.correctAnswer);

		// Store formDataToSend instead of the raw data
		setFormData(formDataToSend);
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);

		if (!formData) {
			console.error("formData is null during confirmation.");
			setSnackbarMessage("Submission failed due to internal error.");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			return;
		}

		try {
			const response = await APIClient.post(apis.AddQuestions, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200) {
				setSnackbarMessage("Question submitted successfully!");
				setSnackbarSeverity("success");
				reset();
				setOptions(["", "", "", ""]);
				setShowOptions(false);
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
			{" "}
			{/* Use the container class */}
			<h2 className={styles.heading}>Add Question</h2> {/* Use heading class */}
			<form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
				{" "}
				{/* Use form class */}
				<div className={styles.formGroup}>
					{" "}
					{/* Use formGroup class */}
					<label htmlFor="course" className={styles.label}>
						Course
					</label>
					<Controller
						name="course"
						control={control}
						rules={{ required: "Course is required" }}
						render={({ field }) => (
							<select
								{...field}
								id="course"
								className={styles.select} // Use select class
							>
								<option value="">Select</option>
								{courses.map((course) => (
									<option
										key={course.id}
										value={course.id}
										className={styles.menuItem}
									>
										{course.coursename}
									</option>
								))}
							</select>
						)}
					/>
					{errors.course && (
						<p className={styles.error}>{errors.course.message}</p> // Use error class
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="ModuleName" className={styles.label}>
						Course Module
					</label>
					<Controller
						name="ModuleName"
						control={control}
						rules={{ required: "Course Module is required" }}
						render={({ field }) => (
							<select {...field} id="ModuleName" className={styles.select}>
								<option value="">Select</option>
								{modules.map((mod) => (
									<option
										key={mod.id}
										value={mod.id}
										className={styles.menuItem}
									>
										{mod.modulename}
									</option>
								))}
							</select>
						)}
					/>
					{errors.ModuleName && (
						<p className={styles.error}>{errors.ModuleName.message}</p>
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="questionText" className={styles.label}>
						Question Text
					</label>
					<Controller
						name="questionText"
						control={control}
						rules={{ required: "Question Text is required" }}
						render={({ field }) => (
							<textarea
								{...field}
								id="questionText"
								rows="3"
								className={styles.textarea} // Use textarea class
							/>
						)}
					/>
					{errors.questionText && (
						<p className={styles.error}>{errors.questionText.message}</p>
					)}
				</div>
				<div className={styles.mb4}>
					<Button
						variant="outlined"
						onClick={() => setShowOptions(!showOptions)}
						className={styles.button}
					>
						{showOptions ? "Hide Options" : "Show Options"}
					</Button>
				</div>
				{showOptions &&
					options.map((opt, index) => (
						<div className={styles.formGroup} key={index}>
							<label htmlFor={`option${index + 1}`} className={styles.label}>
								Option {index + 1}
							</label>
							<TextField
								id={`option${index + 1}`}
								value={opt}
								onChange={(e) => handleOptionChange(index, e.target.value)}
								fullWidth
								required={showOptions} // Require options only when visible
								className={styles.input} // Use input class
							/>
						</div>
					))}
				{showOptions && errors.options && (
					<p className={styles.error}>{errors.options.message}</p>
				)}
				{showOptions && (
					<div className={styles.formGroup}>
						<label htmlFor="correctAnswer" className={styles.label}>
							Correct Answer
						</label>
						<Controller
							name="correctAnswer"
							control={control}
							rules={{ required: "Correct Answer is required" }}
							render={({ field }) => (
								<TextField
									{...field}
									id="correctAnswer"
									fullWidth
									required
									className={styles.input}
								/>
							)}
						/>
						{errors.correctAnswer && (
							<p className={styles.error}>{errors.correctAnswer.message}</p>
						)}
					</div>
				)}
				<div>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={styles.submitButton}
					>
						Save
					</Button>
				</div>
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

export default QuestionsForm;

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx"; // Adjust path as needed


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
		<div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
			<h2 className="text-2xl font-bold mb-6 text-center">Add Question</h2>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div className="mb-4">
					<label htmlFor="course" className="mb-1 font-medium text-black block">
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
								className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select</option>
								{courses.map((course) => (
									<option key={course.id} value={course.id}>
										{course.coursename}
									</option>
								))}
							</select>
						)}
					/>
					{errors.course && (
						<p className="text-red-500 text-sm mt-1">{errors.course.message}</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="ModuleName"
						className="mb-1 font-medium text-black block"
					>
						Course Module
					</label>
					<Controller
						name="ModuleName"
						control={control}
						rules={{ required: "Course Module is required" }}
						render={({ field }) => (
							<select
								{...field}
								id="ModuleName"
								className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select</option>
								{modules.map((mod) => (
									<option key={mod.id} value={mod.id}>
										{mod.modulename}
									</option>
								))}
							</select>
						)}
					/>
					{errors.ModuleName && (
						<p className="text-red-500 text-sm mt-1">
							{errors.ModuleName.message}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="questionText"
						className="mb-1 font-medium text-black block"
					>
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
								className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						)}
					/>
					{errors.questionText && (
						<p className="text-red-500 text-sm mt-1">
							{errors.questionText.message}
						</p>
					)}
				</div>

				<div className="mb-4">
					<Button
						variant="outlined"
						onClick={() => setShowOptions(!showOptions)}
					>
						{showOptions ? "Hide Options" : "Show Options"}
					</Button>
				</div>

				{showOptions &&
					options.map((opt, index) => (
						<div className="mb-4" key={index}>
							<label
								htmlFor={`option${index + 1}`}
								className="mb-1 font-medium text-black block"
							>
								Option {index + 1}
							</label>
							<TextField
								id={`option${index + 1}`}
								value={opt}
								onChange={(e) => handleOptionChange(index, e.target.value)}
								fullWidth
								required={showOptions} // Require options only when visible
								className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					))}
				{showOptions && errors.options && (
					<p className="text-red-500 text-sm mt-1">{errors.options.message}</p>
				)}

				{showOptions && (
					<div className="mb-4">
						<label
							htmlFor="correctAnswer"
							className="mb-1 font-medium text-black block"
						>
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
									className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							)}
						/>
						{errors.correctAnswer && (
							<p className="text-red-500 text-sm mt-1">
								{errors.correctAnswer.message}
							</p>
						)}
					</div>
				)}

				<div>
					<Button type="submit" variant="contained" color="primary">
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

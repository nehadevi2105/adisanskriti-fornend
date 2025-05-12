import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import { useParams, useNavigate } from "react-router-dom";
import {
	Button,
	Snackbar,
	Alert,
	FormControl,
	InputLabel,
	Input,
} from "@mui/material"; // Added FormControl and Input
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";

const EditCourse = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			// Corrected: defaultValues should be an object
			coursename: "",
			intro: "",
			coursetype: "",
			introvideo: null,
			coursethumbnail: null,
		},
	});

	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [formData, setFormData] = useState(null); // To hold form data before confirmation
	const [courseData, setCourseData] = useState(null); // To hold fetched course data

	// Fetch course by ID, similar to EditRepoContent
	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const res = await APIClient.get(`${apis.GetCourseById}/${id}`);
				const data = res.data; // Directly use res.data
				setCourseData(data); // Store fetched data
				reset({
					// Use reset instead of setValue
					coursename: data.coursename,
					intro: data.intro,
					coursetype: data.coursetype,
					introvideo: data.introvideo, // Keep these, reset will handle correctly.
					coursethumbnail: data.coursethumbnail,
				});
			} catch (err) {
				console.error("Failed to fetch course", err);
				setSnackbarMessage("Failed to load course data.");
				setSnackbarSeverity("error");
				setOpenSnackbar(true);
			}
		};
		fetchCourse();
	}, [id, reset]);

	const handleFormSubmit = (data) => {
		//  No changes needed here, captures form data.
		setFormData(data);
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

		const formDataToSend = new FormData();
		formDataToSend.append("id", id);
		formDataToSend.append("coursename", formData.coursename);
		formDataToSend.append("intro", formData.intro);
		formDataToSend.append("coursetype", formData.coursetype);

		if (formData.introvideo && formData.introvideo[0]) {
			// Changed to check for file
			formDataToSend.append("introvideo", formData.introvideo[0]);
		} else if (courseData?.introvideo) {
			formDataToSend.append("introvideo", courseData.introvideo);
		}

		if (formData.coursethumbnail && formData.coursethumbnail[0]) {
			// Changed to check for file
			formDataToSend.append("coursethumbnail", formData.coursethumbnail[0]);
		} else if (courseData?.coursethumbnail) {
			formDataToSend.append("coursethumbnail", courseData.coursethumbnail);
		}

		try {
			const response = await APIClient.post(apis.UpdateCourse, formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200) {
				// Check for 200 OK
				setSnackbarMessage("Course updated successfully!");
				setSnackbarSeverity("success");
				navigate("/CourseList");
			} else {
				throw new Error(`Update failed: ${response.status}`); // Include status
			}
		} catch (err) {
			console.error(err);
			setSnackbarMessage(`Update failed: ${err.message || "Unknown error"}`);
			setSnackbarSeverity("error");
		} finally {
			setOpenSnackbar(true);
		}
	};

	return (
		<div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
			<h2 className="text-2xl font-bold mb-6 text-center">Edit Course</h2>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				encType="multipart/form-data"
			>
				{/* Course Name */}
				<FormControl fullWidth margin="normal" error={!!errors.coursename}>
					<InputLabel htmlFor="coursename">Course Name</InputLabel>
					<Input
						id="coursename"
						{...register("coursename", { required: "Course name is required" })}
						className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.coursename && (
						<p className="text-red-500 text-sm mt-1">
							{errors.coursename.message}
						</p>
					)}
				</FormControl>

				{/* Introduction */}
				<FormControl fullWidth margin="normal" error={!!errors.intro}>
					<InputLabel htmlFor="intro">Introduction</InputLabel>
					<Input
						id="intro"
						multiline
						rows={4}
						{...register("intro", { required: "Introduction is required" })}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.intro && (
						<p className="text-red-500 text-sm mt-1">{errors.intro.message}</p>
					)}
				</FormControl>

				{/* Intro Video */}
				<FormControl fullWidth margin="normal">
					<InputLabel htmlFor="introvideo">Change Intro Video</InputLabel>
					<Input
						type="file"
						id="introvideo"
						accept="video/*"
						{...register("introvideo")}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</FormControl>

				{/* Thumbnail */}
				<FormControl fullWidth margin="normal">
					<InputLabel htmlFor="coursethumbnail">
						Change Course Thumbnail
					</InputLabel>
					<Input
						type="file"
						id="coursethumbnail"
						accept="image/*"
						{...register("coursethumbnail")}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</FormControl>

				{/* Course Type */}
				<FormControl fullWidth margin="normal" error={!!errors.coursetype}>
					<InputLabel htmlFor="coursetype">Course Type</InputLabel>
					<select
						id="coursetype"
						{...register("coursetype", {
							required: "Please select a course type",
						})}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select</option>
						<option value="Advanced">Advanced</option>
						<option value="Beginner">Beginner</option>
					</select>
					{errors.coursetype && (
						<p className="text-red-500 text-sm mt-1">
							{errors.coursetype.message}
						</p>
					)}
				</FormControl>

				<Button
					variant="contained"
					color="primary"
					type="submit"
					sx={{ mt: 2 }}
				>
					Update
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
			/>
		</div>
	);
};

export default EditCourse;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Snackbar, Alert } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx"; // Adjust path as needed
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
const AddCourseForm = () => {
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

	const handleFormSubmit = (data) => {
		setFormData(data);
		setConfirmOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setConfirmOpen(false);

		const formDataToSend = new FormData();
		formDataToSend.append("coursename", formData.coursename);
		formDataToSend.append("intro", formData.intro);
		formDataToSend.append("coursetype", formData.coursetype);
		formDataToSend.append("introvideo", formData.introvideo[0]);
		formDataToSend.append("coursethumbnail", formData.coursethumbnail[0]);

		// const response = await APIClient.post(apis.createMenu, formDataToSend, {
		try {
			const response = await APIClient.post(
				apis.AddCourseForm,
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);

			if (response.status === 200) {
				setSnackbarMessage("Course submitted successfully!");
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
		<div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
			<h2 className="text-2xl font-bold mb-6 text-center">Add Course</h2>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				encType="multipart/form-data"
			>
				{/* Course Name */}
				<div className="mb-4">
					<label htmlFor="coursename" className="mb-1 font-medium text-black">
						Course Name
					</label>
					<input
						type="text"
						id="coursename"
						{...register("coursename", {
							required: "Course name is required",
						})}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.coursename && (
						<p className="text-red-500 text-sm mt-1">
							{errors.coursename.message}
						</p>
					)}
				</div>

				{/* Introduction */}
				<div className="mb-4">
					<label htmlFor="intro" className="mb-1 font-medium text-black">
						Introduction
					</label>
					<textarea
						id="intro"
						rows="4"
						{...register("intro", {
							required: "Introduction is required",
						})}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.intro && (
						<p className="text-red-500 text-sm mt-1">{errors.intro.message}</p>
					)}
				</div>

				{/* Introduction Video */}
				<div className="mb-4">
					<label htmlFor="introvideo" className="mb-1 font-medium text-black">
						Introduction Video
					</label>
					<input
						type="file"
						id="introvideo"
						accept="video/*"
						{...register("introvideo", {
							required: "Introduction video is required",
							validate: (files) =>
								(files && files.length > 0) || "Please upload a video file",
						})}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.introvideo && (
						<p className="text-red-500 text-sm mt-1">
							{errors.introvideo.message}
						</p>
					)}
				</div>

				{/* Course Thumbnail */}
				<div className="mb-4">
					<label
						htmlFor="coursethumbnail"
						className="mb-1 font-medium text-black"
					>
						Course Thumbnail
					</label>
					<input
						type="file"
						id="coursethumbnail"
						accept="image/*"
						{...register("coursethumbnail", {
							required: "Course thumbnail is required",
							validate: (files) =>
								(files && files.length > 0) || "Please upload an image",
						})}
						className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.coursethumbnail && (
						<p className="text-red-500 text-sm mt-1">
							{errors.coursethumbnail.message}
						</p>
					)}
				</div>

				{/* Course Type */}
				<div className="mb-4">
					<label htmlFor="coursetype" className="mb-1 font-medium text-black">
						Course Type
					</label>
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
				</div>

				<Button variant="contained" color="primary" type="submit">
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
			/>
		</div>
	);
};

export default AddCourseForm;

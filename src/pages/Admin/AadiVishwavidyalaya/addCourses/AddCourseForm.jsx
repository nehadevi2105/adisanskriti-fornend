import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Snackbar, Alert, FormControl } from "@mui/material";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx"; // Adjust path as needed
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./AddCourseForm.module.css";
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

	// New state
	const [stateOptions, setStateOptions] = useState([]);
	const [tribeOptions, setTribeOptions] = useState([]);
	const [selectedState, setSelectedState] = useState("");

	const [artFormOptions] = useState([
		"Tribal Painting",
		"Tribal Dance",
		"Tribal Clothing and Textile",
		"Tribal Artifacts",
		"Tribal Livelihood",
	]);

	// Fetch states
	useEffect(() => {
		const fetchStates = async () => {
			const res = await APIClient.get("/api/Tribes");
			const data = res.data;
			const uniqueStates = [...new Set(data.map(item => item.state))];
			setStateOptions(uniqueStates);
		};
		fetchStates();
	}, []);

	// Fetch tribes based on selected state
	useEffect(() => {
		const fetchTribes = async () => {
			if (!selectedState) {
				setTribeOptions([]);
				return;
			}
			try {
				const res = await APIClient.get(`/api/Tribes/getbyid/${encodeURIComponent(selectedState)}`);
				const tribes = res.data.map(item => item.tribename); // ✅ Correct field
				setTribeOptions(tribes);
			} catch (err) {
				console.error("Failed to fetch tribes:", err);
				setTribeOptions([]);
			}
		};
		fetchTribes();
	}, [selectedState]);
	

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
		formDataToSend.append("state", formData.state);
		formDataToSend.append("tribe", formData.tribe);
		formDataToSend.append("artform", formData.artform);
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
		 <div className={styles.container}> {/* Use styles.container */}
      <h2 className={styles.heading}>Add Course</h2> {/* Use styles.heading */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
      >
        {/* Course Name */}
        <div className={styles.formGroup}> {/* Use styles.formGroup */}
          <label htmlFor="coursename" className={styles.label}> {/* Use styles.label */}
            Course Name
          </label>
          <input
            type="text"
            id="coursename"
            {...register("coursename", {
              required: "Course name is required",
            })}
            className={styles.input} 
          />
          {errors.coursename && (
            <p className={styles.error}>{errors.coursename.message}</p> 
          )}
        </div>

        {/* Introduction */}
        <div className={styles.formGroup}>
          <label htmlFor="intro" className={styles.label}>
            Introduction
          </label>
          <textarea
            id="intro"
            rows="4"
            {...register("intro", {
              required: "Introduction is required",
            })}
            className={styles.textarea} 
          />
          {errors.intro && (
            <p className={styles.error}>{errors.intro.message}</p>
          )}
        </div>

        {/* Introduction Video */}
        <div className={styles.formGroup}>
          <label htmlFor="introvideo" className={styles.label}>
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
            className={styles.input}
          />
          {errors.introvideo && (
            <p className={styles.error}>{errors.introvideo.message}</p>
          )}
        </div>

        {/* Course Thumbnail */}
        <div className={styles.formGroup}>
          <label
            htmlFor="coursethumbnail"
            className={styles.label}
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
            className={styles.input}
          />
          {errors.coursethumbnail && (
            <p className={styles.error}>{errors.coursethumbnail.message}</p>
          )}
        </div>

        {/* Course Type */}
        <div className={styles.formGroup}>
          <label htmlFor="coursetype" className={styles.label}>
            Course Type
          </label>
          <select
            id="coursetype"
            {...register("coursetype", {
              required: "Please select a course type",
            })}
            className={styles.select} 
          >
            <option value="">Select</option>
            <option value="Advanced">Advanced</option>
            <option value="Beginner">Beginner</option>
          </select>
          {errors.coursetype && (
            <p className={styles.error}>{errors.coursetype.message}</p>
          )}
        </div>

        {/* State Dropdown */}
        <div className={styles.formGroup}>
          <label className={styles.label}>State</label>
          <select
            {...register("state", { required: "Please select a state" })}
            className={styles.select}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {stateOptions.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className={styles.error}>{errors.state.message}</p>}
        </div>

        {/* Tribe Dropdown */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tribe</label>
          <select
            {...register("tribe", { required: "Please select a tribe" })}
            className={styles.select}
          >
            <option value="">Select Tribe</option>
            {tribeOptions.map(tribe => (
              <option key={tribe} value={tribe}>{tribe}</option>
            ))}
          </select>
          {errors.tribe && <p className={styles.error}>{errors.tribe.message}</p>}
        </div>

        {/* Art Form Dropdown */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Art Form</label>
          <select
            {...register("artform", { required: "Please select an art form" })}
            className={styles.select}
          >
            <option value="">Select Art Form</option>
            {artFormOptions.map(form => (
              <option key={form} value={form}>{form}</option>
            ))}
          </select>
          {errors.artform && <p className={styles.error}>{errors.artform.message}</p>}
        </div>

        <Button variant="contained" color="primary" type="submit" className={styles.submitButton}> {/* Use styles.submitButton */}
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

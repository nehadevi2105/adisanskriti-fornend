import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx";

const EditCourse = () => {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useForm();

    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [courseData, setCourseData] = useState(null);
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

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const res = await APIClient.get("/api/Tribes");
                const data = res.data;
                const uniqueStates = [...new Set(data.map(item => item.state))];
                setStateOptions(uniqueStates);
            } catch (error) {
                console.error("Failed to fetch states:", error);
                setSnackbarMessage("Failed to fetch states.");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        };
        fetchStates();
    }, []);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const res = await APIClient.get(apis.GetCourseById + id);
                const data = res.data;
                setCourseData(data);
                setValue("coursename", data.coursename);
                setValue("intro", data.intro);
                setValue("coursetype", data.coursetype);
                setValue("state", data.state);
                setSelectedState(data.state);
                setValue("artform", data.artform);
                setValue("video_path", data.video_path);
                setValue("thumbnail_path", data.thumbnail_path);
                
            } catch (error) {
                console.error("Failed to fetch course data:", error);
                setSnackbarMessage("Failed to fetch course data.");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        };
        if (id) {
            fetchCourseData();
        }
    }, [id, setValue]);

    useEffect(() => {
        const fetchTribes = async () => {
            if (!selectedState) {
                setTribeOptions([]);
                setValue("tribe", "");
                return;
            }
            try {
                const res = await APIClient.get(`/api/Tribes/getbyid/${encodeURIComponent(selectedState)}`);
                const tribes = res.data.map(item => item.tribename);
                setTribeOptions(tribes);

                if (courseData && tribes.includes(courseData.tribe)) {
                    setValue("tribe", courseData.tribe);
                } else if (courseData && selectedState === courseData.state && !tribes.includes(courseData.tribe)) {
                    setTribeOptions([...tribes, courseData.tribe]);
                    setValue("tribe", courseData.tribe);
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
    }, [selectedState, setValue, courseData]);

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setValue("tribe", "");
    };

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

        // Handle intro video
        if (formData.introvideo && formData.introvideo[0]) {
            formDataToSend.append("introvideo", formData.introvideo[0]);
        } else if (courseData?.video_path) {
            const filename = courseData.video_path.split("/").pop();
            formDataToSend.append("introvideo_name", filename);
            console.log("Existing video filename:", filename);
        }

        // Handle course thumbnail
        if (formData.coursethumbnail && formData.coursethumbnail[0]) {
            formDataToSend.append("coursethumbnail", formData.coursethumbnail[0]);
        } else if (courseData?.thumbnail_path) {
            const filename = courseData.thumbnail_path.split("/").pop();
            formDataToSend.append("coursethumbnail_name", filename);
            console.log("Existing thumbnail filename:", filename);
        }

        try {
            const response = await APIClient.post(apis.UpdateCourse + id, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                setSnackbarMessage("Course updated successfully!");
                setSnackbarSeverity("success");
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            console.error("Update error:", error);
            setSnackbarMessage("Failed to update course.");
            setSnackbarSeverity("error");
        } finally {
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        const subscription = watch(({ state }) => {
            if (state) {
                setSelectedState(state);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    if (!courseData) {
        return <div>Loading course data...</div>;
    }

    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Course</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
                {/* Course Name */}
                <div className="mb-4">
                    <label htmlFor="coursename" className="mb-1 font-medium text-black">Course Name</label>
                    <input
                        type="text"
                        id="coursename"
                        {...register("coursename", { required: "Course name is required" })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.coursename && <p className="text-red-500 text-sm">{errors.coursename.message}</p>}
                </div>

                {/* Introduction */}
                <div className="mb-4">
                    <label htmlFor="intro" className="mb-1 font-medium text-black">Introduction</label>
                    <textarea
                        id="intro"
                        rows="4"
                        {...register("intro", { required: "Introduction is required" })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.intro && <p className="text-red-500 text-sm">{errors.intro.message}</p>}
                </div>

                {/* Introduction Video */}
                <div className="mb-4">
                    <label htmlFor="introvideo" className="mb-1 font-medium text-black">Introduction Video</label>
                    {courseData.video_path && (
                        <video
                            src={`${APIClient.defaults.baseURL}/${courseData.video_path}`}
                            controls
                            className="w-full mb-2 rounded"
                            style={{ maxHeight: '200px' }}
                        />
                    )}
                    <input
                        type="file"
                        id="introvideo"
                        accept="video/*"
                        {...register("introvideo")}
                        className="w-full border p-2 rounded"
                    />
                    <p className="text-gray-600 text-sm mt-1">Leave blank to keep the existing video.</p>
                </div>

                {/* Course Thumbnail */}
                <div className="mb-4">
                    <label htmlFor="coursethumbnail" className="mb-1 font-medium text-black">Course Thumbnail</label>
                    {courseData.thumbnail_path && (
                        <img
                            src={`${APIClient.defaults.baseURL}/${courseData.thumbnail_path}`}
                            alt="Course Thumbnail"
                            className="w-full mb-2 rounded"
                            style={{ maxHeight: '150px', objectFit: 'cover' }}
                        />
                    )}
                    <input
                        type="file"
                        id="coursethumbnail"
                        accept="image/*"
                        {...register("coursethumbnail")}
                        className="w-full border p-2 rounded"
                    />
                    <p className="text-gray-600 text-sm mt-1">Leave blank to keep the existing thumbnail.</p>
                </div>

                {/* Course Type */}
                <div className="mb-4">
                    <label htmlFor="coursetype" className="mb-1 font-medium text-black">Course Type</label>
                    <select
                        id="coursetype"
                        {...register("coursetype", { required: "Please select a course type" })}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Beginner">Beginner</option>
                    </select>
                    {errors.coursetype && <p className="text-red-500 text-sm mt-1">{errors.coursetype.message}</p>}
                </div>    

                 {/* State Dropdown */}
                <div className="mb-4">
                    <label className="mb-1 font-medium text-black">State</label>
                    <select
                        {...register("state", { required: "Please select a state" })}
                        className="w-full border border-gray-300 p-2 rounded"
                        onChange={handleStateChange}
                        defaultValue={courseData ? courseData.state : ""} // Set default value from courseData
                    >
                        <option value="">Select State</option>
                        {stateOptions.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>

                {/* Tribe Dropdown */}
                <div className="mb-4">
                    <label className="mb-1 font-medium text-black">Tribe</label>
                    <select
                        {...register("tribe", { required: "Please select a tribe" })}
                        className="w-full border border-gray-300 p-2 rounded"
                        defaultValue={courseData ? courseData.tribe : ""} // Set default value from courseData
                    >
                        <option value="">Select Tribe</option>
                        {tribeOptions.map(tribe => (
                            <option key={tribe} value={tribe}>{tribe}</option>
                        ))}
                    </select>
                    {errors.tribe && <p className="text-red-500 text-sm mt-1">{errors.tribe.message}</p>}
                </div>

                {/* Art Form Dropdown */}
                <div className="mb-4">
                    <label className="mb-1 font-medium text-black">Art Form</label>
                    <select
                        {...register("artform", { required: "Please select an art form" })}
                        className="w-full border border-gray-300 p-2 rounded"
                        defaultValue={courseData ? courseData.artform : ""} // Set default value from courseData
                    >
                        <option value="">Select Art Form</option>
                        {artFormOptions.map(form => (
                            <option key={form} value={form}>{form}</option>
                        ))}
                    </select>
                    {errors.artform && <p className="text-red-500 text-sm mt-1">{errors.artform.message}</p>}
                </div>    

                {/* Confirm Button */}
                <div className="text-center">
                    <Button type="submit" variant="contained" color="primary">Update Course</Button>
                </div>
            </form>

            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirmSubmit}
                message="Are you sure you want to update this course?"
            />

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditCourse;

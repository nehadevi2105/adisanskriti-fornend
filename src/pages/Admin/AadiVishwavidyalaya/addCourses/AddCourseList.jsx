import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./addCourseForm.module.css"; // Import the CSS module

const AddCourseList = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const fetchCourses = useCallback(async () => {
		setLoading(true);
		try {
			const response = await APIClient.get(apis.AddCourseList);

			const formattedData = response.data.map((course, index) => ({
				id1: index + 1,
				id: course.id,
				coursename: course.coursename,
				coursetype: course.coursetype,
				intro: course.intro,
				introvideo: course.introvideo,
			}));

			setCourses(formattedData);
		} catch (err) {
			console.error(err);
			setError("Failed to load courses");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCourses();
	}, [fetchCourses]);

	const handleEdit = useCallback(
		(id) => {
			navigate(`/EditCourse/${id}`);
		},
		[navigate],
	);

	const handleDelete = useCallback(
		async (id) => {
			if (!window.confirm("Are you sure you want to delete this course?"))
				return;
			try {
				await APIClient.post(apis.DeleteCourse + id);
				alert("Course deleted");
				fetchCourses();
			} catch (err) {
				console.error(err);
				alert(`Failed to delete course: ${err.message || ""}`);
			}
		},
		[fetchCourses],
	);

	const renderTableRows = useMemo(() => {
		if (loading) {
			return Array.from({ length: 3 }).map((_, i) => (
				<tr key={`skeleton-${i}`} className={styles.loadingRow}>
					{Array.from({ length: 5 }).map((__, j) => (
						<td key={j} className={styles.loadingCell}>
							<div className={styles.skeleton}></div>
						</td>
					))}
				</tr>
			));
		}

		if (error) {
			return (
				<tr>
					<td colSpan="6" className={styles.errorText}>
						{error}
					</td>
				</tr>
			);
		}

		if (courses.length === 0) {
			return (
				<tr>
					<td colSpan="6" className={styles.noDataText}>
						No courses found.
					</td>
				</tr>
			);
		}

		return courses.map((course) => (
			<tr key={course.id} className={styles.row}>
				<td className={styles.cell}>{course.id1}</td>
				<td className={styles.cell}>{course.coursename}</td>
				<td className={styles.cell}>{course.coursetype}</td>
				<td className={styles.cell}>{course.intro}</td>
				<td className={styles.cell}>{course.introvideo}</td>
				<td className={styles.actionsCell}>
					<div className={styles.actions}>
						<Link to={`/EditCourse/${course.id}`}>
							<button type="button" className={styles.editButton}>
								Edit
							</button>
						</Link>
						<button
							type="button"
							onClick={() => handleDelete(course.id)}
							className={styles.deleteButton}
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		));
	}, [courses, loading, error, handleDelete, handleEdit]);

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Course List</h2>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>ID</th>
							<th className={styles.th}>Course Name</th>
							<th className={styles.th}>Course Type</th>
							<th className={styles.th}>Introduction</th>
							<th className={styles.th}>Introduction Video</th>
							<th className={styles.th}>Actions</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default AddCourseList;

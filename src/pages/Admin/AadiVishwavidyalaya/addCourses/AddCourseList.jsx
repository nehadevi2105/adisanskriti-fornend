import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";

const AddCourseList = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const fetchCourses = useCallback(async () => {
		setLoading(true);
		try {
			// const response = await fetch("https://localhost:7299/api/Course");
			// if (!response.ok) throw new Error("Failed to fetch");
			// const data = await response.json();

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
				fetchCourses(); // Optional: also wrap this in useCallback if used elsewhere
			} catch (err) {
				console.error(err);
				alert(`Failed to delete course: ${err.message || ""}`);
			}
		},
		[fetchCourses],
	);

	const renderTableRows = useMemo(() => {
		if (loading) {
			// Show 3 loading skeleton rows
			return Array.from({ length: 3 }).map((_, i) => (
				<tr key={`skeleton-${i}`} className="animate-pulse border-t">
					{Array.from({ length: 5 }).map((__, j) => (
						<td key={j} className="px-4 py-2 border">
							<div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
						</td>
					))}
				</tr>
			));
		}

		if (error) {
			return (
				<tr>
					<td colSpan="5" className="px-4 py-4 text-center text-red-600">
						{error}
					</td>
				</tr>
			);
		}

		if (courses.length === 0) {
			return (
				<tr>
					<td colSpan="5" className="px-4 py-4 text-center">
						No courses found.
					</td>
				</tr>
			);
		}

		return courses.map((course) => (
			<tr key={course.id} className="border-t hover:bg-gray-50">
				<td className="px-4 py-2 border">{course.id1}</td>
				<td className="px-4 py-2 border">{course.coursename}</td>
				<td className="px-4 py-2 border">{course.coursetype}</td>
				<td className="px-4 py-2 border">{course.intro}</td>
				<td className="px-4 py-2 border">{course.introvideo}</td>
				<td className="px-4 py-2 border text-center">
					<div className="flex gap-2 justify-center">
						<Link to={`/EditCourse/${course.id}`}>
							<button
								type="button"
								className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
							>
								Edit
							</button>
						</Link>
						<button
							type="button"
							onClick={() => handleDelete(course.id)}
							className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		));
	}, [courses, loading, error, handleDelete, handleEdit]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">Course List</h2>
			<div className="overflow-x-auto bg-white rounded-xl shadow-md">
				<table className="min-w-full table-auto text-sm text-left border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 uppercase text-xs">
						<tr>
							<th className="px-4 py-3 border">ID</th>
							<th className="px-4 py-3 border">Course Name</th>
							<th className="px-4 py-3 border">Course Type</th>
							<th className="px-4 py-3 border">Introduction</th>
							<th className="px-4 py-3 border">Introduction Video</th>
							<th className="px-4 py-3 border text-center">Actions</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default AddCourseList;

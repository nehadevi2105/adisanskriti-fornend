import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";

const CoreValuesList = () => {
	const [coreValues, setCoreValues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const fetchCoreValues = useCallback(async () => {
		setLoading(true);
		try {
			//const response = await fetch("https://localhost:7299/api/CoreValues");
			const response = await APIClient.get(apis.GetCoreValuesList);
			console.log("CoreValues API response:", response);
			const data = response.data;

			const formattedData = data.map((item, index) => ({
				id1: index + 1,
				id: item.id,
				Description: item.description,
				Type: item.type,
				//Image: item.image,
			}));

			setCoreValues(formattedData);
		} catch (err) {
			console.error(err);
			setError("Failed to load core values");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCoreValues();
	}, [fetchCoreValues]);

	const handleDelete = useCallback(
		async (id) => {
			if (!window.confirm("Are you sure you want to delete this core value?"))
				return;
			try {
				await APIClient.post(apis.DeleteCoreValue + id);
				alert("Core value deleted");
				fetchCoreValues();
			} catch (err) {
				console.error(err);
				alert(`Failed to delete core value: ${err.message || ""}`);
			}
		},
		[fetchCoreValues],
	);

	const renderTableRows = useMemo(() => {
		if (loading) {
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
					<td colSpan="6" className="px-4 py-4 text-center text-red-600">
						{error}
					</td>
				</tr>
			);
		}

		if (coreValues.length === 0) {
			return (
				<tr>
					<td colSpan="6" className="px-4 py-4 text-center">
						No core values found.
					</td>
				</tr>
			);
		}

		return coreValues.map((val) => (
			<tr key={val.id} className="border-t hover:bg-gray-50">
				<td className="px-4 py-2 border">{val.id1}</td>
				<td className="px-4 py-2 border">{val.Description}</td>
				<td className="px-4 py-2 border">{val.Type}</td>

				{/* <td className="px-4 py-2 border">
					{val.Image ? (
						<a href={val.Image} target="_blank" rel="noopener noreferrer">
							<img
								src={val.Image}
								alt="Core Value"
								className="h-12 w-12 object-cover rounded"
							/>
						</a>
					) : (
						"No Image"
					)}
				</td> */}
				<td className="px-4 py-2 border text-center">
					<div className="flex gap-2 justify-center">
						<Link to={`/EditCoreValues/${val.id}`}>
							<button
								type="button"
								className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
							>
								Edit
							</button>
						</Link>
						<button
							type="button"
							onClick={() => handleDelete(val.id)}
							className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		));
	}, [coreValues, loading, error, handleDelete]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">Core Values List</h2>
			<div className="overflow-x-auto bg-white rounded-xl shadow-md">
				<table className="min-w-full table-auto text-sm text-left border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 uppercase text-xs">
						<tr>
							<th className="px-4 py-3 border">Sr. No.</th>
							<th className="px-4 py-3 border">Description</th>
							<th className="px-4 py-3 border">Type</th>
							{/* <th className="px-4 py-3 border">Image</th> */}
							<th className="px-4 py-3 border text-center">Actions</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default CoreValuesList;

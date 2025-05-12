import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json"; // Ensure /api/AddRepositoryContent and delete API exist here

const RepoContentList = () => {
	const [repoContent, setRepoContent] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const fetchRepoContent = useCallback(async () => {
		setLoading(true);
		try {
			const response = await APIClient.get(apis.GetRepoContentList); // Should match /api/AddRepositoryContent

			const formattedData = response.data.map((item, index) => ({
				id1: index + 1,
				id: item.id,
				artform: item.artform,
				theme: item.theme,
				state: item.state,
				tribe: item.tribe,
				heading: item.heading,
			}));

			setRepoContent(formattedData);
		} catch (err) {
			console.error(err);
			setError("Failed to load repository content");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchRepoContent();
	}, [fetchRepoContent]);

	const handleEdit = useCallback(
		(id) => {
			navigate(`/EditRepoContent/${id}`);
		},
		[navigate],
	);

	const handleDelete = useCallback(
		async (id) => {
			if (!window.confirm("Are you sure you want to delete this content?"))
				return;
			try {
				await APIClient.post(apis.DeleteRepositoryContent + id); // Make sure this is defined in your API.json
				alert("Content deleted");
				fetchRepoContent();
			} catch (err) {
				console.error(err);
				alert(`Failed to delete content: ${err.message || ""}`);
			}
		},
		[fetchRepoContent],
	);

	const renderTableRows = useMemo(() => {
		if (loading) {
			return Array.from({ length: 3 }).map((_, i) => (
				<tr key={`skeleton-${i}`} className="animate-pulse border-t">
					{Array.from({ length: 6 }).map((__, j) => (
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

		if (repoContent.length === 0) {
			return (
				<tr>
					<td colSpan="6" className="px-4 py-4 text-center">
						No repository content found.
					</td>
				</tr>
			);
		}

		return repoContent.map((item) => (
			<tr key={item.id} className="border-t hover:bg-gray-50">
				<td className="px-4 py-2 border">{item.id1}</td>
				<td className="px-4 py-2 border">{item.artform}</td>
				<td className="px-4 py-2 border">{item.theme}</td>
				<td className="px-4 py-2 border">{item.state}</td>
				<td className="px-4 py-2 border">{item.tribe}</td>
				<td className="px-4 py-2 border">{item.heading}</td>
				<td className="px-4 py-2 border text-center">
					<div className="flex gap-2 justify-center">
						<Link to={`/EditRepoContent/${item.id}`}>
							<button
								type="button"
								className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
							>
								Edit
							</button>
						</Link>
						<button
							type="button"
							onClick={() => handleDelete(item.id)}
							className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		));
	}, [repoContent, loading, error, handleDelete, handleEdit]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">Repository Content List</h2>
			<div className="overflow-x-auto bg-white rounded-xl shadow-md">
				<table className="min-w-full table-auto text-sm text-left border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 uppercase text-xs">
						<tr>
							<th className="px-4 py-3 border">ID</th>
							<th className="px-4 py-3 border">Artform</th>
							<th className="px-4 py-3 border">Theme</th>
							<th className="px-4 py-3 border">State</th>
							<th className="px-4 py-3 border">Tribe</th>
							<th className="px-4 py-3 border">Heading</th>
							<th className="px-4 py-3 border text-center">Actions</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default RepoContentList;

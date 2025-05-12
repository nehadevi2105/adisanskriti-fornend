import { useEffect, useMemo, useState, useCallback } from "react";
import APIClient from "../../../../API/APIClient";

const HomeSliderList = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchItems = useCallback(async () => {
		setLoading(true);
		try {
			const response = await APIClient.get("/api/Homeslider");
			if (response.status === 200) {
				const formatted = response.data.map((item, index) => ({
					id1: index + 1,
					id: item.id,
					media: item.filepath,
				}));
				setItems(formatted);
			}
		} catch (err) {
			console.error(err);
			setError("Failed to load Home Slider items");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchItems();
	}, [fetchItems]);

	const handleDelete = useCallback(
		async (id) => {
			if (!window.confirm("Are you sure you want to delete this item?")) return;
			try {
				alert("Delete API not yet implemented.");
				// await APIClient.post(`/api/Homeslider/delete/${id}`);
				// fetchItems();
			} catch (err) {
				console.error(err);
				alert(`Failed to delete item: ${err.message || ""}`);
			}
		},
		[fetchItems],
	);

	const renderTableRows = useMemo(() => {
		if (loading) {
			return Array.from({ length: 3 }).map((_, i) => (
				<tr key={`skeleton-${i}`} className="animate-pulse border-t">
					{Array.from({ length: 3 }).map((__, j) => (
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
					<td colSpan="3" className="px-4 py-4 text-center text-red-600">
						{error}
					</td>
				</tr>
			);
		}

		if (items.length === 0) {
			return (
				<tr>
					<td colSpan="3" className="px-4 py-4 text-center">
						No records found.
					</td>
				</tr>
			);
		}

		return items.map((item) => (
			<tr key={item.id} className="border-t hover:bg-gray-50">
				<td className="px-4 py-2 border">{item.id1}</td>
				<td className="px-4 py-2 border text-center">
					{item.media?.endsWith(".mp4") ? (
						<video
							src={`${APIClient.defaults.baseURL}/${item.media}`}
							controls
							className="w-40 h-24 rounded mx-auto"
						/>
					) : (
						<img
							src={`${APIClient.defaults.baseURL}/${item.media}`}
							alt="Slider"
							className="w-28 h-20 object-cover rounded mx-auto"
						/>
					)}
				</td>
				<td className="px-4 py-2 border text-center">
					<button
						type="button"
						onClick={() => handleDelete(item.id)}
						className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
					>
						Delete
					</button>
				</td>
			</tr>
		));
	}, [items, loading, error, handleDelete]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">Home Slider List</h2>
			<div className="overflow-x-auto bg-white rounded-xl shadow-md">
				<table className="min-w-full table-auto text-sm text-left border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 uppercase text-xs">
						<tr>
							<th className="px-4 py-3 border">S.No</th>
							<th className="px-4 py-3 border text-center">Image / Video</th>
							<th className="px-4 py-3 border text-center">Action</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default HomeSliderList;

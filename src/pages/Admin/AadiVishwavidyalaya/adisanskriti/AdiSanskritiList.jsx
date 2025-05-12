import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";

const AdiSanskritiList = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const fetchItems = useCallback(async () => {
		setLoading(true);
		try {
			const response = await APIClient.get(apis.GetAdiSanskritiList);
			if (response.status === 200) {
				const formatted = response.data.map((item, index) => ({
					id1: index + 1,
					id: item.id,
					description: item.description,
					aadivishwavidyalaya_imagepaths: item.aadivishwavidyalaya_imagepaths,
					aadisampada_imagepaths: item.aadisampada_imagepaths,
					aadihaat_imagepaths: item.aadihaat_imagepaths,
				}));
				setItems(formatted);
			}
		} catch (err) {
			console.error(err);
			setError("Failed to load Adi Sanskriti items");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchItems();
	}, [fetchItems]);

	const handleEdit = useCallback(
		(id) => {
			navigate(`/EditAdiSanskriti/${id}`);
		},
		[navigate],
	);

	// const handleEdit = (id) => {
	// 	navigate(`/EditAdiSanskriti/${id}`);
	// };

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this item?")) {
			try {
				const response = await APIClient.post(apis.DeleteAdiSanskriti + id);
				if (response.status === 200) {
					alert("Item deleted successfully!");
					fetchItems(); // Refresh list
				} else {
					alert("Failed to delete item.");
				}
			} catch (err) {
				console.error(err);
				alert("An error occurred while deleting the item.");
			}
		}
	};

	const renderImageCells = (imagePaths) => {
		if (!imagePaths) return null;
		return imagePaths.split(",").map((path, idx) => {
			const trimmedPath = path.trim();
			if (!trimmedPath) return null;
			return (
				<img
					key={idx}
					src={`${APIClient.defaults.baseURL}${trimmedPath}`}
					alt={`Visual content ${idx + 1}`}
					className="w-20 h-16 object-cover rounded mr-2 mb-2"
				/>
			);
		});
	};

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

		if (items.length === 0) {
			return (
				<tr>
					<td colSpan="6" className="px-4 py-4 text-center">
						No records found.
					</td>
				</tr>
			);
		}

		return items.map((item) => (
			<tr key={item.id} className="border-t hover:bg-gray-50">
				<td className="px-4 py-2 border">{item.id1}</td>
				<td className="px-4 py-2 border">{item.description}</td>
				<td className="px-4 py-2 border">
					<div className="flex flex-wrap">
						{renderImageCells(item.aadivishwavidyalaya_imagepaths)}
					</div>
				</td>
				<td className="px-4 py-2 border">
					<div className="flex flex-wrap">
						{renderImageCells(item.aadisampada_imagepaths)}
					</div>
				</td>
				<td className="px-4 py-2 border">
					<div className="flex flex-wrap">
						{renderImageCells(item.aadihaat_imagepaths)}
					</div>
				</td>
				<td className="px-4 py-2 border text-center">
					<button
						type="button"
						onClick={() => handleEdit(item.id)}
						className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 mr-2"
					>
						Edit
					</button>
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
	}, [items, loading, error]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">Adi Sanskriti List</h2>
			<div className="overflow-x-auto bg-white rounded-xl shadow-md">
				<table className="min-w-full table-auto text-sm text-left border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 uppercase text-xs">
						<tr>
							<th className="px-4 py-3 border">ID</th>
							<th className="px-4 py-3 border">Description</th>
							<th className="px-4 py-3 border">Aadi Vishwavidyalaya Images</th>
							<th className="px-4 py-3 border">Aadi Sampada Images</th>
							<th className="px-4 py-3 border">Aadi Haat Images</th>
							<th className="px-4 py-3 border text-center">Action</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdiSanskritiList;

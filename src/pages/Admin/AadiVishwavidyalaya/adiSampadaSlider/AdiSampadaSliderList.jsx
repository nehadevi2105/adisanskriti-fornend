import { useEffect, useMemo, useState, useCallback } from "react";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
//import baseURL from "../../../../API/APIClient";

import baesURL from "../../../../API/APIClient";
import styles from "./AdiSampadaForm.module.css";

const AdiSampadaSliderList = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchItems = useCallback(async () => {
		setLoading(true);
		try {
			const response = await APIClient.get(apis.GetAdiSampadaList);
			if (response.status === 200) {
				const formatted = response.data.map((item, index) => ({
					id1: index + 1,
					id: item.id,
					artform: item.artform,
					image: item.slidervideo,
					// slidervideo: item.slidervideo,
				}));
				setItems(formatted);
			}
		} catch (err) {
			console.error(err);
			setError("Failed to load Adi Sampada items");
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
				await APIClient.post(apis.DeleteAdiSampada + id);
				alert("Item deleted");
				fetchItems();
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
					{Array.from({ length: 4 }).map((__, j) => (
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

		if (items.length === 0) {
			return (
				<tr>
					<td colSpan="5" className="px-4 py-4 text-center">
						No records found.
					</td>
				</tr>
			);
		}

		return items.map((item) => (
			<tr key={item.id} className="border-t hover:bg-gray-50">
				<td className="px-4 py-2 border">{item.id1}</td>
				<td className="px-4 py-2 border">{item.artform}</td>
				<td className="px-4 py-2 border">
					<img
						src={`${APIClient.defaults.baseURL}/${item.image}`}
						alt="Preview"
						className="w-28 h-20 object-cover rounded"
					/>
				</td>

				{/* <td className="px-4 py-2 border">
					{item.slidervideo ? (
						<video
							src={APIClient.defaults.baseURL + item.slidervideo}
							controls
							className="w-40 h-20 rounded"
						/>
					) : (
						"—"
					)}
				</td> */}
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
		<div className={styles.container}>
			{" "}
			{/* Apply container style if needed */}
			<h2 className={styles.heading}>Adi Sampada Slider List</h2>{" "}
			{/* Apply heading style */}
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>ID</th>
							<th className={styles.th}>Artform</th>
							<th className={styles.th}>Image</th>
							<th className={styles.th}>Action</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdiSampadaSliderList;

import { useEffect, useMemo, useState, useCallback } from "react";
import APIClient from "../../../../API/APIClient";
import styles from "./HomeSliderForm.module.css"; // Import the CSS module

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
				<tr key={`skeleton-${i}`} className={styles.loadingRow}>
					{Array.from({ length: 3 }).map((__, j) => (
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
					<td colSpan="3" className={styles.errorText}>
						{error}
					</td>
				</tr>
			);
		}

		if (items.length === 0) {
			return (
				<tr>
					<td colSpan="3" className={styles.noDataText}>
						No records found.
					</td>
				</tr>
			);
		}

		return items.map((item) => (
			<tr key={item.id} className={styles.row}>
				<td className={styles.cell}>{item.id1}</td>
				<td className={styles.cell}>
					{item.media?.endsWith(".mp4") ? (
						<video
							src={`${APIClient.defaults.baseURL}/${item.media}`}
							controls
							className={styles.mediaPreview}
						/>
					) : (
						<img
							src={`${APIClient.defaults.baseURL}/${item.media}`}
							alt="Slider"
							className={styles.mediaPreview}
						/>
					)}
				</td>
				<td className={styles.actionsCell}>
					<button
						type="button"
						onClick={() => handleDelete(item.id)}
						className={styles.deleteButton}
					>
						Delete
					</button>
				</td>
			</tr>
		));
	}, [items, loading, error, handleDelete]);

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Home Slider List</h2>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>S.No</th>
							<th className={styles.th}>Image / Video</th>
							<th className={styles.th}>Action</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
		</div>
		
	);
};

export default HomeSliderList;

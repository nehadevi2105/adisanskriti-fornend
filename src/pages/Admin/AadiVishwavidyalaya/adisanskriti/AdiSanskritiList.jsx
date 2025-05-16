import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./AdiSanskritiForm.module.css"; // Import the CSS module

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
					className={styles.previewImage}
				/>
			);
		});
	};

	const renderTableRows = useMemo(() => {
		if (loading) {
			return Array.from({ length: 3 }).map((_, i) => (
				<tr key={`skeleton-${i}`} className={styles.loadingRow}>
					{Array.from({ length: 6 }).map((__, j) => (
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

		if (items.length === 0) {
			return (
				<tr>
					<td colSpan="6" className={styles.noDataText}>
						No records found.
					</td>
				</tr>
			);
		}

		return items.map((item) => (
			<tr key={item.id} className={styles.row}>
				<td className={styles.cell}>{item.id1}</td>
				<td className={styles.cell}>{item.description}</td>
				<td className={styles.cell}>
					<div className={styles.previewContainer}>
						{renderImageCells(item.aadivishwavidyalaya_imagepaths)}
					</div>
				</td>
				<td className={styles.cell}>
					<div className={styles.previewContainer}>
						{renderImageCells(item.aadisampada_imagepaths)}
					</div>
				</td>
				<td className={styles.cell}>
					<div className={styles.previewContainer}>
						{renderImageCells(item.aadihaat_imagepaths)}
					</div>
				</td>
				<td className={styles.actionsCell}>
					<button
						type="button"
						onClick={() => handleEdit(item.id)}
						className={styles.editButton}
					>
						Edit
					</button>
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
	}, [items, loading, error, handleEdit, handleDelete]);

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Adi Sanskriti List</h2>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>ID</th>
							<th className={styles.th}>Description</th>
							<th className={styles.th}>Aadi Vishwavidyalaya Images</th>
							<th className={styles.th}>Aadi Sampada Images</th>
							<th className={styles.th}>Aadi Haat Images</th>
							<th className={styles.th}>Action</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdiSanskritiList;

import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./CoreValueForm.module.css"; // Import the CSS module

const CoreValuesList = () => {
	const [coreValues, setCoreValues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const fetchCoreValues = useCallback(async () => {
		setLoading(true);
		try {
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
				<tr key={`skeleton-${i}`} className={styles.loadingRow}>
					{Array.from({ length: 4 }).map((__, j) => (
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
					<td colSpan="4" className={styles.errorText}>
						{error}
					</td>
				</tr>
			);
		}

		if (coreValues.length === 0) {
			return (
				<tr>
					<td colSpan="4" className={styles.noDataText}>
						No core values found.
					</td>
				</tr>
			);
		}

		return coreValues.map((val) => (
			<tr key={val.id} className={styles.row}>
				<td className={styles.cell}>{val.id1}</td>
				<td className={styles.cell}>{val.Description}</td>
				<td className={styles.cell}>{val.Type}</td>
				{/* <td className={styles.cell}>
                    {val.Image ? (
                        <a href={val.Image} target="_blank" rel="noopener noreferrer">
                            <img
                                src={val.Image}
                                alt="Core Value"
                                className={styles.image}
                            />
                        </a>
                    ) : (
                        "No Image"
                    )}
                </td> */}
				<td className={styles.actionsCell}>
					<div className={styles.actions}>
						<Link to={`/EditCoreValues/${val.id}`}>
							<button type="button" className={styles.editButton}>
								Edit
							</button>
						</Link>
						<button
							type="button"
							onClick={() => handleDelete(val.id)}
							className={styles.deleteButton}
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		));
	}, [coreValues, loading, error, handleDelete]);

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Core Values List</h2>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>Sr. No.</th>
							<th className={styles.th}>Description</th>
							<th className={styles.th}>Type</th>
							{/* <th className={styles.th}>Image</th> */}
							<th className={styles.th}>Actions</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default CoreValuesList;

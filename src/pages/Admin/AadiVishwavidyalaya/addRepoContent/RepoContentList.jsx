import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./AddRepoContentForm.module.css"; // Import the CSS module

const RepoContentList = () => {
	const [repoContent, setRepoContent] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const fetchRepoContent = useCallback(async () => {
		setLoading(true);
		try {
			const response = await APIClient.get(apis.GetRepoContentList);

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
				await APIClient.post(apis.DeleteRepositoryContent + id);
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
				<tr key={`skeleton-${i}`} className={styles.loadingRow}>
					{Array.from({ length: 7 }).map((__, j) => (
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
					<td colSpan="7" className={styles.errorText}>
						{error}
					</td>
				</tr>
			);
		}

		if (repoContent.length === 0) {
			return (
				<tr>
					<td colSpan="7" className={styles.noDataText}>
						No repository content found.
					</td>
				</tr>
			);
		}

		return repoContent.map((item) => (
			<tr key={item.id} className={styles.row}>
				<td className={styles.cell}>{item.id1}</td>
				<td className={styles.cell}>{item.artform}</td>
				<td className={styles.cell}>{item.theme}</td>
				<td className={styles.cell}>{item.state}</td>
				<td className={styles.cell}>{item.tribe}</td>
				<td className={styles.cell}>{item.heading}</td>
				<td className={styles.actionsCell}>
					<div className={styles.actions}>
						<Link to={`/EditRepoContent/${item.id}`}>
							<button type="button" className={styles.editButton}>
								Edit
							</button>
						</Link>
						<button
							type="button"
							onClick={() => handleDelete(item.id)}
							className={styles.deleteButton}
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		));
	}, [repoContent, loading, error, handleDelete, handleEdit]);

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Repository Content List</h2>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>ID</th>
							<th className={styles.th}>Artform</th>
							<th className={styles.th}>Theme</th>
							<th className={styles.th}>State</th>
							<th className={styles.th}>Tribe</th>
							<th className={styles.th}>Heading</th>
							<th className={styles.th}>Actions</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default RepoContentList;

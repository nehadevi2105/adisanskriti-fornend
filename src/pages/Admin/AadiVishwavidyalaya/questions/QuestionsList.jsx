import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import styles from "./QuestionsForm.module.css"; // Import the CSS module

const QuestionsList = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const fetchQuestions = useCallback(async () => {
		setLoading(true);
		try {
			const response = await APIClient.get(apis.GetQuestionsList); // Corrected endpoint

			const formattedData = response.data.map((question, index) => ({
				id1: index + 1,
				id: question.id,
				course: question.course, // Access courseName from the response
				coursemodule: question.coursemodule, // Access moduleName
				question_text: question.question_text,
				correct_answer: question.correct_answer,
			}));

			setQuestions(formattedData);
		} catch (err) {
			console.error(err);
			setError("Failed to load questions");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	const handleDelete = useCallback(
		async (id) => {
			if (!window.confirm("Are you sure you want to delete this question?"))
				return;
			try {
				await APIClient.post(`/api/Questions/Delete?id=${id}`); // Corrected delete endpoint
				alert("Question deleted");
				fetchQuestions();
			} catch (err) {
				console.error(err);
				alert(`Failed to delete question: ${err.message || ""}`);
			}
		},
		[fetchQuestions],
	);

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

		if (questions.length === 0) {
			return (
				<tr>
					<td colSpan="6" className={styles.noDataText}>
						No questions found.
					</td>
				</tr>
			);
		}

		return questions.map((question) => (
			<tr key={question.id} className={styles.row}>
				<td className={styles.cell}>{question.id1}</td>
				<td className={styles.cell}>{question.course}</td>
				<td className={styles.cell}>{question.coursemodule}</td>
				<td className={styles.cell}>{question.question_text}</td>
				<td className={styles.cell}>{question.correct_answer}</td>
				<td className={styles.actionsCell}>
					<div className={styles.actions}>
						<button
							type="button"
							onClick={() => handleDelete(question.id)}
							className={styles.deleteButton}
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		));
	}, [questions, loading, error, handleDelete]);

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Questions List</h2>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>ID</th>
							<th className={styles.th}>Course</th>
							<th className={styles.th}>Course Module</th>
							<th className={styles.th}>Question Text</th>
							<th className={styles.th}>Correct Answer</th>
							<th className={styles.th}>Actions</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default QuestionsList;

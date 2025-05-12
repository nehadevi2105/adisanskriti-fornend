import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";

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
			// Show 3 loading skeleton rows
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
					<td colSpan="5" className="px-4 py-4 text-center text-red-600">
						{error}
					</td>
				</tr>
			);
		}

		if (questions.length === 0) {
			return (
				<tr>
					<td colSpan="5" className="px-4 py-4 text-center">
						No questions found.
					</td>
				</tr>
			);
		}

		return questions.map((question) => (
			<tr key={question.id} className="border-t hover:bg-gray-50">
				<td className="px-4 py-2 border">{question.id1}</td>
				<td className="px-4 py-2 border">{question.course}</td>
				<td className="px-4 py-2 border">{question.coursemodule}</td>
				<td className="px-4 py-2 border">{question.question_text}</td>
				<td className="px-4 py-2 border">{question.correct_answer}</td>
				<td className="px-4 py-2 border text-center">
					<div className="flex gap-2 justify-center">
						<button
							type="button"
							onClick={() => handleDelete(question.id)}
							className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		));
	}, [questions, loading, error, handleDelete]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">Questions List</h2>
			<div className="overflow-x-auto bg-white rounded-xl shadow-md">
				<table className="min-w-full table-auto text-sm text-left border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 uppercase text-xs">
						<tr>
							<th className="px-4 py-3 border">ID</th>
							<th className="px-4 py-3 border">Course</th>
							<th className="px-4 py-3 border">Course Module</th>
							<th className="px-4 py-3 border">Question Text</th>
							<th className="px-4 py-3 border">Correct Answer</th>
							<th className="px-4 py-3 border text-center">Actions</th>
						</tr>
					</thead>
					<tbody>{renderTableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default QuestionsList;

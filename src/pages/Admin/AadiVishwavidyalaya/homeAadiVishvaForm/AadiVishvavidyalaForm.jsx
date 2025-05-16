import React, { useState, useEffect } from "react";
import axios from "axios";

const AadiVishvavidyalaForm = () => {
	const [description, setDescription] = useState("");
	const [artForms, setArtForms] = useState([
		{ artformname: "", imagefile: null },
	]);
	const [data, setData] = useState([]);

	// 🔁 Fetch data on load (optional)
	//   useEffect(() => {
	//     fetchData();
	//   }, []);

	const fetchData = async () => {
		const res = await axios.get("/api/AadiVishwavidyalaya");
		setData(res.data);
	};

	const handleChange = (index, field, value) => {
		const newForms = [...artForms];
		newForms[index][field] = value;
		setArtForms(newForms);
	};

	const addFormField = () => {
		setArtForms([...artForms, { artformname: "", imagefile: null }]);
	};

	const removeFormField = (index) => {
		const newForms = [...artForms];
		newForms.splice(index, 1);
		setArtForms(newForms);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("Description", description);

		artForms.forEach((item, index) => {
			formData.append(`ArtFormName`, item.artformname); // repeatable field
			formData.append(`ImageFile`, item.imagefile); // repeatable file
		});

		try {
			debugger;
			const res = await axios.post(
				"https://localhost:5281/api/AadiVishwavidyalaya",
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				},
			);
			setData(res.data);
			alert("Submitted successfully!");
		} catch (error) {
			console.error(error);
			alert("Submission failed.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 white:bg-gray-900">
			<div className="py-3 px-4 shadow-md">
				 <div className="bg-blue-600 text-white py-3 px-4 text-center">
          <h4 className="text-lg font-semibold">Aadi Vishwavidyalaya Form</h4>
        </div>
				<div className="p-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label>Description</label>
					<input
						type="text"
						className="form-control"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>

				<h5>Art Forms</h5>
				{artForms.map((item, index) => (
					<div key={index} className="row mb-2">
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Art Form Name"
								value={item.artformname}
								onChange={(e) =>
									handleChange(index, "artformname", e.target.value)
								}
								required
							/>
						</div>
						<div className="col">
							<input
								type="file"
								className="form-control"
								onChange={(e) =>
									handleChange(index, "imagefile", e.target.files[0])
								}
								required
							/>
						</div>
						<div className="col-auto">
							{index > 0 && (
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => removeFormField(index)}
								>
									Remove
								</button>
							)}
						</div>
					</div>
				))}
				<button
					type="button"
					className="btn btn-secondary mb-3"
					onClick={addFormField}
				>
					Add More
				</button>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
</div>
</div>
			<hr />

			<h3>All Entries</h3>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>ID</th>
						<th>Description</th>
						<th>Art Form</th>
						<th>Image</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, idx) => (
						<tr key={idx}>
							<td>{item.id}</td>
							<td>{item.description}</td>
							<td>{item.artFormName}</td>
							<td>
								{item.imagePath && (
									<img src={item.imagePath} alt="Art" style={{ width: '100px' }} />
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
		</div>
	);
};

export default AadiVishvavidyalaForm;

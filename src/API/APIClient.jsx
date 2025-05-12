import axios from "axios";

const APIClient = axios.create({
	baseURL: "https://localhost:5281",
	//httpsAgent: false, // Disable HTTPS
	headers: {
		"Content-Type": "application/json",
	},
});

APIClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API call failed:", error);
		// Handle specific error cases
		if (error.response.status === 401) {
			// Unauthorized
			alert("You are not authorized. Please log in again.");
		} else if (error.response.status === 404) {
			// Not found
			alert("The requested resource was not found.");
		}
		return Promise.reject(error);
	},
);

//   apiClient.interceptors.request.use(
//     config => {
//       // Add authorization token to every request
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => Promise.reject(error)
//   );

export default APIClient;

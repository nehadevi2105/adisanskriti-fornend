import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./css/root.css";
import "./css/fonts.css";
import "./css/gaatha.css";
import "./css/learn.css";
import "./css/style.css";
import "./css/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

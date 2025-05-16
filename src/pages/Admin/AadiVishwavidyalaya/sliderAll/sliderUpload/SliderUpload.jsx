import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadSlider = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setStatus("");
    setSubmitted(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    setStatus("");

    if (!file) {
      setError("⚠️ Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("imgsrc", file);

    const apiUrl = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

    try {
      await axios.post(`${apiUrl}/api/Slider/InsertSlider`, formData);
      setStatus("✅ Upload successful!");
      setFile(null);

      // Show alert and redirect after short delay
      alert("✅ Upload successful!");
      navigate("/slider-list");

    } catch (error) {
      console.error(error);
      setError("❌ Upload failed. Please try again.");
    }
  };

  return (
    
        <div className="min-h-screen bg-gray-100 white:bg-gray-900">
       <div className="py-3 px-4 shadow-md">
        <div className="bg-blue-600 text-white py-3 px-4 text-center">
          <h4 className="text-lg font-semibold">Slider Upload</h4>
        </div>

     
      <div className="p-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto"></div>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Image/Video <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-md p-4 hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Status Messages */}
            <div className="min-h-6">
              {submitted && error && (
                <p className="text-sm text-red-600 py-2">{error}</p>
              )}
              {status && (
                <p className="text-sm text-green-600 py-2">{status}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="w-40 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default UploadSlider;

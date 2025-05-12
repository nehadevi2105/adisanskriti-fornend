import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiTrash2, FiImage, FiFilm, FiLoader, FiEye } from "react-icons/fi";

const MediaPreview = ({ item }) => {
  const [mediaError, setMediaError] = useState(false);
  const mediaSrc = item.slidervideo;

  if (!mediaSrc || mediaError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <FiImage size={24} />
        <span className="ml-2 text-xs">{mediaError ? "Broken Media" : "No Media"}</span>
      </div>
    );
  }

  if (typeof mediaSrc === "object") {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <FiImage size={24} />
        <span className="ml-2 text-xs">Invalid Media</span>
      </div>
    );
  }

  const src = `https://localhost:5281/${mediaSrc}`;

  if (mediaSrc.toLowerCase().endsWith(".mp4") || mediaSrc.toLowerCase().endsWith(".webm")) {
    return (
      <video
        className="w-full h-full object-cover"
        controls
        onError={() => setMediaError(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (mediaSrc.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/)) {
    return (
      <img
        src={src}
        alt="Slider preview"
        className="w-full h-full object-cover"
        onError={() => setMediaError(true)}
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-gray-400">
      <FiImage size={24} />
      <span className="ml-2 text-xs">Unsupported Format</span>
    </div>
  );
};

const SliderList = () => {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSliderData = async () => {
    try {
      const response = await axios.get("https://localhost:5281/api/Slider/getsliderdata");
      setSliderData(response.data);
    } catch (error) {
      console.error("Error fetching slider data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      try {
        await axios.delete(`https://localhost:5281/api/Slider/deleteSliderdata/${id}`);
        setSliderData((prev) => prev.filter((item) => item.id !== id));
        alert("Slider deleted successfully!");
      } catch (error) {
        console.error("Error deleting slider:", error);
        alert("Failed to delete slider");
      }
    }
  };

  const handleView = (id) => {
    alert(`View slider with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-blue-600 dark:bg-blue-800 py-3 px-4 shadow-md">
        <h4 className="text-white font-semibold text-lg">Slider Management</h4>
      </div>

      <div className="p-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="text-indigo-600 dark:text-indigo-400"
              >
                <FiLoader size={48} />
              </motion.div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Serial No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Media
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {sliderData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-all"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32 h-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                          <MediaPreview item={item} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {/* <button
                            onClick={() => handleView(item.id)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded-md"
                            title="View"
                          >
                            <FiEye size={18} />
                          </button> */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2 rounded-md"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderList;

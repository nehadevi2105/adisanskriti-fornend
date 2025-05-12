import React, { useState, useEffect } from 'react';
import { FiUpload, FiFileText, FiImage } from 'react-icons/fi';
import axios from 'axios';
import ConfirmDialog from "../../../../components/dialogBox/ConfirmDialog.jsx"; // Adjust path as needed
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";

const CourseModuleForm = () => {
  // Static language options
  const languageOptions = [
    { id: 1, name: 'Hindi' },
    { id: 2, name: 'English' }
  ];

  // State for courses from API
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  const [formData, setFormData] = useState({
    languageType: '',
    courseId: '',
    moduleName: '',
    moduleVideo: null,
    videoSrt: null,
    videoThumbnail: null
  });

  const [errors, setErrors] = useState({
    languageType: '',
    courseId: '',
    moduleName: '',
    moduleVideo: '',
    videoSrt: '',
    videoThumbnail: ''
  });

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://localhost:5281/api/Course');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setSubmitStatus({ success: false, message: 'Failed to load courses' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when changing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    let error = '';

    if (file) {
      switch (name) {
        case 'moduleVideo':
          if (!file.type.includes('video/')) {
            error = 'Only video files are allowed (MP4, MOV, etc.)';
          }
          break;
        
        case 'videoSrt':
          if (!file.name.endsWith('.srt')) {
            error = 'Only .srt files are allowed';
          }
          break;
        
        case 'videoThumbnail':
          if (!file.type.includes('image/')) {
            error = 'Only image files are allowed (JPEG, PNG, etc.)';
          }
          break;
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    setFormData(prev => ({
      ...prev,
      [name]: error ? null : file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    // Validate all fields
    if (!formData.languageType) {
      newErrors.languageType = 'Please select a language';
      valid = false;
    }
    if (!formData.courseId) {
      newErrors.courseId = 'Please select a course';
      valid = false;
    }
    if (!formData.moduleName) {
      newErrors.moduleName = 'Module name is required';
      valid = false;
    }
    if (!formData.moduleVideo) {
      newErrors.moduleVideo = 'Video file is required';
      valid = false;
    }
    if (!formData.videoSrt) {
      newErrors.videoSrt = 'SRT file is required';
      valid = false;
    }
    if (!formData.videoThumbnail) {
      newErrors.videoThumbnail = 'Thumbnail is required';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('LanguageType', formData.languageType);
      formDataToSend.append('CourseId', formData.courseId);
      formDataToSend.append('ModuleName', formData.moduleName);
      formDataToSend.append('ModuleVideo', formData.moduleVideo);
      formDataToSend.append('VideoSrt', formData.videoSrt);
      formDataToSend.append('VideoThumbnail', formData.videoThumbnail);

      const response = await axios.post(
        'https://localhost:5281/api/CourseModule/insert',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSubmitStatus({ success: true, message: 'Module created successfully!' });
      
      // Reset form
      setFormData({
        languageType: '',
        courseId: '',
        moduleName: '',
        moduleVideo: null,
        videoSrt: null,
        videoThumbnail: null
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || 'Failed to create module' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Strip */}
      <div className="bg-blue-600 py-2 px-6">
        <h4 className="text-white font-medium text-lg">Course Module Management</h4>
      </div>

      <div className="p-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-center">
            <h3 className="text-base font-semibold text-gray-800">New Module Details</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* First Row - Language and Course */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Language Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Language *</label>
                <select
                  name="languageType"
                  value={formData.languageType}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-xs border ${errors.languageType ? 'border-red-500' : 'border-gray-300'} rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  required
                >
                  <option value="">Select Language</option>
                  {languageOptions.map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.name}
                    </option>
                  ))}
                </select>
                {errors.languageType && (
                  <p className="text-xs text-red-500 mt-1">{errors.languageType}</p>
                )}
              </div>

              {/* Course Selection - Dynamic from API */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Course *</label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-xs border ${errors.courseId ? 'border-red-500' : 'border-gray-300'} rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  required
                  disabled={isLoading}
                >
                  <option value="">{isLoading ? 'Loading courses...' : 'Select Course'}</option>
                  {courses.map((course) => (
  <option key={course.id} value={course.id}>
    {course.coursename}
  </option>
))}
                </select>
                {errors.courseId && (
                  <p className="text-xs text-red-500 mt-1">{errors.courseId}</p>
                )}
              </div>
            </div>

            {/* Second Row - Module Name (full width) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Module Name *</label>
              <input
                type="text"
                name="moduleName"
                value={formData.moduleName}
                onChange={handleChange}
                className={`block w-full px-3 py-2 text-xs border ${errors.moduleName ? 'border-red-500' : 'border-gray-300'} rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter module name"
                required
              />
              {errors.moduleName && (
                <p className="text-xs text-red-500 mt-1">{errors.moduleName}</p>
              )}
            </div>

            {/* Third Row - Video and SRT Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Video Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Module Video *</label>
                <div className={`relative border ${errors.moduleVideo ? 'border-red-500' : 'border-gray-300'} rounded p-2`}>
                  <div className="flex items-center space-x-2">
                    <FiUpload className="text-gray-400 text-sm" />
                    <label className="text-xs text-gray-600 flex-1 truncate">
                      {formData.moduleVideo ? formData.moduleVideo.name : "Choose video file..."}
                    </label>
                    <label className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-100">
                      Browse
                      <input 
                        type="file" 
                        name="moduleVideo"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="video/*"
                        required
                      />
                    </label>
                  </div>
                </div>
                {errors.moduleVideo && (
                  <p className="text-xs text-red-500 mt-1">{errors.moduleVideo}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">MP4, MOV, etc.</p>
              </div>

              {/* SRT Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Video SRT *</label>
                <div className={`relative border ${errors.videoSrt ? 'border-red-500' : 'border-gray-300'} rounded p-2`}>
                  <div className="flex items-center space-x-2">
                    <FiFileText className="text-gray-400 text-sm" />
                    <label className="text-xs text-gray-600 flex-1 truncate">
                      {formData.videoSrt ? formData.videoSrt.name : "Choose SRT file..."}
                    </label>
                    <label className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-100">
                      Browse
                      <input 
                        type="file" 
                        name="videoSrt"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".srt"
                        required
                      />
                    </label>
                  </div>
                </div>
                {errors.videoSrt && (
                  <p className="text-xs text-red-500 mt-1">{errors.videoSrt}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">.srt format only</p>
              </div>
            </div>

            {/* Fourth Row - Thumbnail Upload (full width with preview) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Thumbnail *</label>
              <div className={`relative border ${errors.videoThumbnail ? 'border-red-500' : 'border-gray-300'} rounded p-2`}>
                <div className="flex items-center space-x-2">
                  <FiImage className="text-gray-400 text-sm" />
                  <label className="text-xs text-gray-600 flex-1 truncate">
                    {formData.videoThumbnail ? formData.videoThumbnail.name : "Choose image..."}
                  </label>
                  <label className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-100">
                    Browse
                    <input 
                      type="file" 
                      name="videoThumbnail"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                      required
                    />
                  </label>
                </div>
              </div>
              {errors.videoThumbnail && (
                <p className="text-xs text-red-500 mt-1">{errors.videoThumbnail}</p>
              )}
              {formData.videoThumbnail && formData.videoThumbnail.type.startsWith('image/') && (
                <img 
                  src={URL.createObjectURL(formData.videoThumbnail)} 
                  alt="Thumbnail preview" 
                  className="mt-2 max-h-20 rounded border border-gray-200"
                />
              )}
              <p className="text-xs text-gray-500 mt-1">JPEG, PNG, etc.</p>
            </div>

            {/* Status Message */}
            {submitStatus.message && (
              <div className={`p-2 rounded-md ${
                submitStatus.success 
                  ? 'bg-green-50 text-green-700 border border-green-100' 
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
                <p className="text-xs">{submitStatus.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm transition-colors duration-200"
              >
                Submit Module
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseModuleForm;
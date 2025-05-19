import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import { BASE_URL } from "../../../../API/APIClient";


const CulturalHeritageList = () => {
    const [heritageList, setHeritageList] = useState([]);
    const navigate = useNavigate();

    // Load data from API
    useEffect(() => {
        fetchHeritage();
    }, []);

    const fetchHeritage = async () => {
        try {
            const response = await APIClient.get("/api/CulturalHeritage/GetAllHeritage");
            //const response = await axios.get('https://localhost:5281/api/CulturalHeritage/GetAllHeritage');
            setHeritageList(response.data);
        } catch (error) {
            console.error('Error fetching cultural heritage:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-heritage/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
              await APIClient.get(`/api/CulturalHeritage/Delete/${id}`);
           // await axios.delete(`/api/CulturalHeritage/Delete/${id}`);
            fetchHeritage(); // Refresh list after deletion
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 white:bg-gray-900">
            <div className="py-3 px-4 shadow-md">
                <div className="bg-blue-600 text-white py-3 px-4 text-center">
          <h4 className="text-lg font-semibold">Cultural Heritage List</h4>
        </div>
               <div className="p-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
                   
                    {heritageList.length === 0 ? (
                        <p>No records found.</p>
                    ) : (
                        heritageList.map((heritage) => (
                            <div key={heritage.id} className="card mb-4 shadow">
                                <div className="card-body">
                                    <h4>{heritage.title}</h4>
                                    <p>{heritage.description}</p>

                                    <h5>Details:</h5>
                                    <ul className="list-group mb-3">
                                        {heritage.culturalHeritageDetails.map((detail) => (
                                            <li key={detail.id} className="list-group-item">
                                                <strong>{detail.title}</strong><br />
                                                <p>{detail.content}</p>
                                                {detail.imagePath && (
                                                    <img
                                                        src={ BASE_URL + detail.imagePath}
                                                        alt={detail.title}
                                                        style={{ maxWidth: '200px', marginTop: '10px' }}
                                                    />
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => handleEdit(heritage.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(heritage.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            </div>
            </div>
        
       
    );
};

export default CulturalHeritageList;

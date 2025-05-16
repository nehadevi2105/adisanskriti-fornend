import React, { useEffect, useState } from "react";

const SliderList = () => {
  const [sliderData, setSliderData] = useState([]);
  const baseUrl = "https://localhost:5281/";

  useEffect(() => {
    fetch(`${baseUrl}api/Slider/getsliderdata`) // adjust API endpoint here
      .then((res) => res.json())
      .then((data) => setSliderData(data))
      .catch((err) => console.error("Failed to fetch slider data:", err));
  }, []);

  const renderMedia = (mediaSrc) => {
    const src = mediaSrc.startsWith("Document/")
      ? `${baseUrl}${mediaSrc}`
      : `${baseUrl}Document/SliderImage/${mediaSrc}`;

    const isVideo = mediaSrc.toLowerCase().endsWith(".mp4") || mediaSrc.toLowerCase().endsWith(".webm");

    if (isVideo) {
      return (
        <video
          width="200"
          height="150"
          controls
          style={{ maxWidth: "100%", height: "auto" }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <img
        src={src}
        alt="slider media"
        style={{ maxWidth: "200px", height: "auto" }}
      />
    );
  };

  return (
      <div className="min-h-screen bg-gray-100 white:bg-gray-900">
       <div className="py-3 px-4 shadow-md"></div>
    <div style={{ padding: "20px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Media Preview</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>File Path</th>
          </tr>
        </thead>
        <tbody>
          {sliderData.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {renderMedia(item.slidervideo)}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px", wordBreak: "break-word" }}>
                {item.slidervideo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  
  );
};

export default SliderList;

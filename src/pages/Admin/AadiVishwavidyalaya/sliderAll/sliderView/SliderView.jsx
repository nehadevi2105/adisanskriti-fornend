import React from 'react';

// Temporarily comment out the image imports
// import slider1 from '../../assets/img/sujan.jpeg';
// import slider2 from '../../assets/img/slider2.jpg';
// import slider3 from '../../assets/img/us.webp';

// Replace with null for now to avoid errors
const SliderView = () => {
  return (
    <div className="slider-view dark-mode">
      <div className="slider-container">
        <div className="main-image">
          {/* Use a placeholder or null in place of image imports */}
          <img src={null} alt="Main" />
        </div>
        <div className="thumbnail-images">
          <img src={null} alt="Thumbnail" />
          <img src={null} alt="Thumbnail" />
          {/* <img src={null} alt="Thumbnail" /> */}
        </div>
      </div>
    </div>
  );
}

export default SliderView;

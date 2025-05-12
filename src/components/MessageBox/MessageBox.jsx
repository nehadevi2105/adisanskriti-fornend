C:\Adisanskriti-Frontend\src\components\MessageBox\MessageBox.jsx
//MessageBox.jsx
const UploadSlider = () => {
    const [file, setFile] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('success');
    const [messageText, setMessageText] = useState('');
  
    const handleUpload = async (e) => {
      e.preventDefault();
      
      if (!file) {
        setMessageType('error');
        setMessageText('Please select a file before submitting.');
        setShowMessage(true);
        return;
      }
  
      try {
        // Upload logic...
        setMessageType('success');
        setMessageText('Upload successful!');
        setShowMessage(true);
      } catch (error) {
        setMessageType('error');
        setMessageText('Upload failed. Please try again.');
        setShowMessage(true);
      }
    };
  
    return (
      <div>
        {/* Your form code */}
        
        {showMessage && (
          <MessageBox
            type={messageType}
            message={messageText}
            onClose={() => setShowMessage(false)}
            position="top-right"
          />
        )}
      </div>
    );
  };
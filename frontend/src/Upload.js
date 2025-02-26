import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        const { data } = await axios.post("http://127.0.0.1:5000/upload", formData);
        setResult(data);
    };

    return (
        <div className="p-4">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2">
                Upload
            </button>

            {result && (
                <div className="mt-4 p-4 border rounded">
                    <h3>Extracted Text:</h3>
                    <p>{result.text}</p>
                    <h3>Category:</h3>
                    <p>{result.category}</p>
                </div>
            )}
        </div>
    );
};

export default Upload;

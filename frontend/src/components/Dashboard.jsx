import { useState } from "react";
import FileUpload from "./FileUpload";
import DocumentList from "./DocumentList";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  const handleUpload = (file) => {
    setDocuments([...documents, file]);
  };

  return (
    <div className="dashboard">
      <h2>Document Management System</h2>
      <FileUpload onUpload={handleUpload} />
      <DocumentList documents={documents} />
    </div>
  );
};

export default Dashboard;


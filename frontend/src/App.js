import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import FileUpload from './components/FileUpload';
import DocumentList from './components/DocumentList';

function App() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/documents')
      .then(res => res.json())
      .then(data => setDocuments(data));
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">AI Document Manager</Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <FileUpload onUpload={newDoc => setDocuments([...documents, newDoc])} />
        <DocumentList documents={documents} />
      </Container>
    </>
  );
}

export default App;

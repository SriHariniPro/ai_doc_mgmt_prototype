import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, CssBaseline, CircularProgress } from '@mui/material';
import FileUpload from './components/FileUpload';
import DocumentList from './components/DocumentList';

function App() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/documents')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch documents');
        return res.json();
      })
      .then(data => setDocuments(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
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
        <FileUpload onUpload={newDoc => setDocuments(prevDocs => [...prevDocs, newDoc])} />

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 3 }} />
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center', mt: 3 }}>{error}</Typography>
        ) : (
          <DocumentList documents={documents} />
        )}
      </Container>
    </>
  );
}

export default App;

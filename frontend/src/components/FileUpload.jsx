import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useDropzone } from 'react-dropzone';

export default function FileUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, .pdf',
    onDrop: async files => {
      setUploading(true);
      setError(null);
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        onUpload(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <Box 
      {...getRootProps()}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: 2,
        p: 4,
        mb: 4,
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body1">Drag & drop files here, or click to select</Typography>
      <Button variant="contained" sx={{ mt: 2 }} disabled={uploading}>
        {uploading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}

import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

export default function FileUpload({ onUpload }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, .pdf, .docx',
    onDrop: async files => {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/upload', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      onUpload(result);
    }
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
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body1">
        Drag & drop files here, or click to select
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Upload Document
      </Button>
    </Box>
  );
}

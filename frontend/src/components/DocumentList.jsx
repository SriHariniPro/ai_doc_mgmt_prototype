import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function DocumentList({ documents }) {
  if (!documents || documents.length === 0) {
    return <Typography variant="body1">No documents uploaded yet.</Typography>;
  }

  return (
    <List>
      {documents.map((doc) => (
        <ListItem key={doc.id || doc.name}> 
          <ListItemText 
            primary={
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {doc.name}
              </a>
            } 
          />
        </ListItem>
      ))}
    </List>
  );
}

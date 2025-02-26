import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

export default function DocumentList({ documents }) {
  return (
    <List>
      {documents.map((doc, index) => (
        <ListItem key={index}>
          <ListItemText primary={doc.name} />
        </ListItem>
      ))}
    </List>
  );
}


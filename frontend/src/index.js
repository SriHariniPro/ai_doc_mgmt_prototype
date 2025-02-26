import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2a3eb1' },
    secondary: { main: '#11cb5f' }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

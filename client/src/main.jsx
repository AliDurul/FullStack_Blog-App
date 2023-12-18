import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#090909',
    },
    badgeClr: {
      main: '#ffc1189c'
    },
    commentBtn: {
      main: '#58c7589c'
    }

  },
  typography: {
    fontFamily: [
      'Roboto', 'sans-serif'
    ].join(','),
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
      <CssBaseline />
    </ThemeProvider>
  </BrowserRouter>
)

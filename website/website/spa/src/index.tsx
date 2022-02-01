import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import store from './store';
import { Provider } from 'react-redux';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#e2409e'
        },
        info: {
            main: '#76c880'
        },
    },
});

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

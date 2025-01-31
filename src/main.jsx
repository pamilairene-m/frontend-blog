import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Ensure this path is correct
import './index.css';  // Import global styles
import './App.css';    // Import specific app styles
import { StoryProvider } from './context/StoryContext';  // Import StoryProvider

const root = ReactDOM.createRoot(document.getElementById('root'));  // Make sure 'root' exists in index.html
root.render(
  <React.StrictMode>
    <StoryProvider>  {/* Wrap App with StoryProvider */}
      <App />
    </StoryProvider>
  </React.StrictMode>
);

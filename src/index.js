import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './Context/FirebaseContext';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext>
      <App />
    </FirebaseContext>
  </React.StrictMode>,
  document.getElementById('root')
);

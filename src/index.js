import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import FirebaseContext from './Context/FirebaseContext';
import HelperContext from './Context/HelperContext';


ReactDOM.render(
  <React.StrictMode>
    {/* <FirebaseContext> */}
    <HelperContext>
      <App />
    </HelperContext>
    {/* </FirebaseContext> */}
  </React.StrictMode>,
  document.getElementById('root')
);

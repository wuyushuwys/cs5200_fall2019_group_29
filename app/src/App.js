import React from 'react';
import logo from './logo.svg';
import './App.css';
import PhotoSearchComponent from "./components/PhotoSearchComponent";

function App() {
  return (
      <React.Fragment>
        <h1 className='title' align="center">Photo Share App</h1>
        <PhotoSearchComponent/>
      </React.Fragment>

  );
}
export default App;

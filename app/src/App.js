import React from 'react';
import logo from './logo.svg';
import './App.css';
import PhotoSearchComponent from "./components/PhotoSearchComponent";

function App() {
  let isUser = true
  if(isUser){
    return (
        <div>
          <h1 className='title' align="center">Photo Share App</h1>
          <PhotoSearchComponent/>
        </div>

  );}
  else
    return (
        <div>
          <h1 className='title' align="center">Photo Share App</h1>
        </div>
    );

}

export default App;

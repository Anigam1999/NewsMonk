import './App.css';

import React, { useState } from 'react';
import NavBar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = ()=> {
  // const= 5;
  const apiKey = process.env.REACT_APP_NEWS_API
   
  const [progress, setProgress] = useState(0) 
    return (
      <div>
      <Router>
        <NavBar />
        <LoadingBar 
        color='#f11946'
        progress={progress} 
        height={2}
        /> 
      <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="home" country="in" category="general"/>} />
          <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" country="in" category="general" />} />
          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" country="in" category="business"/>} />
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" country="in" category="sports"/>} />
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" country="in" category="science"/>} />
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" country="in" category="technology"/>} />
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" country="in" category="health"/>} />
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" country="in" category="entertainment"/>} />
      </Routes>
      </Router>
      </div>
    )
}

export default App


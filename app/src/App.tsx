import React from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Authentication from "./pages/Authentication/index";
import './App.css';
import PoseEstimator from  './components/PoseEstimator/PoseEstimator';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/pose-detection" element={<PoseEstimator/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import PoseEstimator from './components/PoseEstimator/PoseEstimator'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Authentication from "./pages/Authentication/index";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
      </Routes>
      <Routes>
        <Route path="/pose-detection" element={<PoseEstimator/>} />
      </Routes>
    </Router>
  );
}

export default App;

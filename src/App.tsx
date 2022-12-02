import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Authentication from "./pages/Authentication/index";
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;

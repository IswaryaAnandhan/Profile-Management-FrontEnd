import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;

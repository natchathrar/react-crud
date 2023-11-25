
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adduser from './Components/Adduser';
import './App.css'
import DataTableComponent from './Components/Datatable';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/form" element={<Adduser />} />
          <Route path="/form/:id" element={<Adduser />} />
          <Route path="/" element={<DataTableComponent />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;

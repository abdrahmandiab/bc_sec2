import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

import AddPatient from './components/pages/AddPatient';
import ViewPatients from './components/pages/ViewPatients';
import AddVisit from './components/pages/AddVisit';
import ViewVisits from './components/pages/ViewVisits';
import About from './components/pages/About';
const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ViewPatients />} />
            <Route exact path='/addpatient' element={<AddPatient />} />
            <Route exact path='/view-visits' element={<ViewVisits />} />
            <Route exact path='/add-visits' element={<AddVisit />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;

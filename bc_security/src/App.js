import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Addpatient from './components/pages/AddPatient';
import ViewVisits from './components/pages/ViewVisits';
import About from './components/pages/About';
const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/addpatient' element={<Addpatient />} />
            <Route exact path='/view-visits' element={<ViewVisits />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>View Patients</Link>
        </li>
        <li>
          <Link to='/addpatient'>Add Patient</Link>
        </li>
        <li>
          <Link to='/view-visits'>View Visits</Link>
        </li>
        <li>
          <Link to='/add-visits'>Add Visit</Link>
        </li>
        <li>
          <Link to='/verify'>Verify</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: 'EHR Portal',
  icon: 'fas fa-globe-europe',
};
export default Navbar;

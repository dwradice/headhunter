import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Where Jobs and Applicants Meet</h1>
          <div className='text-boxes'>
            <div>
              <h4> Looking for work? </h4>
              <p className='lead'>
                Create a professional portfolio and list your skills
              </p>
              <Link to='/register' className='btn btn-primary'>
                Sign Up
              </Link>
            </div>
            <div>
              <h4 className='text-dark'>Looking for workers?</h4>
              <p className='lead text-dark'>
                Search through our list of qualified jobseekers{' '}
              </p>
              <Link to='/profiles' className='btn btn-dark'>
                Search Profiles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);

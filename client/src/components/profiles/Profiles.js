import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './../layout/Spinner';

import ProfilesFilter from './ProfilesFilter';
import ProfileList from './ProfileList';
import { getAllProfiles } from './../../actions/profile';

const Profiles = ({
  profile: { profiles, loading, filtered },
  getAllProfiles,
}) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <Fragment>
      {loading || profiles.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Our Community</h1>
          <p className='lead'>
            <i className='fab fa-connect-develop'></i> Browse and connect with
            talented professionals
          </p>
          <ProfilesFilter />
          <div className='profiles'>
            <ProfileList />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);

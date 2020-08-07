import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterProfiles, clearFilter } from './../../actions/profile';

const ProfilesFilter = ({ filterProfiles, clearFilter }) => {
  const onChange = e => {
    if (e.target.value !== '') {
      filterProfiles(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form className='form my-1'>
      <input
        className='search-bar'
        type='text'
        placeholder='Search Profiles...'
        onChange={onChange}
      />
      <small>Search by Name, Skills, or Occupation</small>
    </form>
  );
};

ProfilesFilter.propTypes = {
  filterProfiles: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(null, { filterProfiles, clearFilter })(ProfilesFilter);

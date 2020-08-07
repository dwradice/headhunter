import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileItem from './../profiles/ProfileItem';
import { connect } from 'react-redux';

const ProfileList = ({ profile: { filtered, profiles, search } }) => {
  let list;

  if (!search) {
    list = (
      <Fragment>
        {profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))}
      </Fragment>
    );
  } else if (search && filtered.length > 0) {
    list = (
      <Fragment>
        {filtered.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))}
      </Fragment>
    );
  } else if (search && filtered.length === 0) {
    list = <h4 className='my-3'>No profiles found matching that search</h4>;
  }

  return <Fragment>{list}</Fragment>;
};

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStatetoProps = state => ({
  profile: state.profile,
});

export default connect(mapStatetoProps)(ProfileList);

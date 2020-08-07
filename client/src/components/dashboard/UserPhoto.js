import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uploadPhoto } from './../../actions/auth';
import { connect } from 'react-redux';

const UserPhoto = ({ uploadPhoto, user: { name, avatar } }) => {
  const [file, setFile] = useState({});
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log(file);
        if (file.type) uploadPhoto(file);
        document.querySelector('.file-upload').value = '';
      }}
      className='form user-photo-form'
    >
      <div className='photo-button'>
        <img src={avatar} alt={name} id='user-photo' className='round-img' />
        <input type='submit' className='btn btn-light' value='Upload Photo' />
      </div>

      <input
        className='file-upload'
        type='file'
        accept='image/*'
        onChange={e => {
          document.getElementById('user-photo').src = URL.createObjectURL(
            e.target.files[0]
          );
          return setFile(e.target.files[0]);
        }}
      />
    </form>
  );
};

UserPhoto.propTypes = {
  uploadPhoto: PropTypes.func.isRequired,
};

export default connect(null, { uploadPhoto })(UserPhoto);

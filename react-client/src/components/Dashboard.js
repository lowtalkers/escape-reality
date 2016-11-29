import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

const fecha = require('fecha');
const vex = require('vex-js');

vex.registerPlugin(require('vex-dialog'));
vex.defaultOptions.className = 'vex-theme-os';

let fileName = '';
let filePath = '';
let picDescrip = '';
let currentImgs = [];

const getAllPhotos = () => {
  console.log('calling')
  $.get({
    url: '/topPics',
    success: (data) => {
      console.log(data, data.length);
    },
    error: (error) => {
      console.error('error in get upload', error);
      $('.error').show();
    },
  });
};

const uploadFile = () => {
  $(function () {
    const imageIsLoaded = e => {
      $('#myImg').attr('src', e.target.result);
      filePath = e.target.result;

      if (!currentImgs.includes(fileName)) {
        currentImgs.push(fileName);
        $.post({
          url: '/upload',
          data: JSON.stringify({
            fileName: fileName,
            filePath: filePath,
            description: picDescrip
          }),
          contentType: 'application/json',
          success: (data) => {
            console.log('Found user\'s uploaded photo from DB', data);
            $('#fileUp').val('');
            vex.dialog.alert('Image uploaded!');
          },
          error: (error) => {
            console.error('error in get upload', error);
            $('.error').show();
          },
        });
      }
    };

    $('#fileUp').change(function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        picDescrip = $('#description').val();
        fileName = this.files[0].name;
        console.log(fileName);
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
};

const signOut = () => {
  $.get({
    url: '/signOut',
    success: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.error('error in get bookmarks', error);
      $('.error').show();
    },
  });
};

export default props => {
  uploadFile();

  return (
    <div>
      <Link to="/bookmarks">
        <button>
          <h1>Bookmarks</h1>
        </button>
      </Link>

      <Link to="/lobby">
        <button>
          <h1>Explore!</h1>
        </button>
      </Link>
      <div>
        <input type='file' id='fileUp' />

        <label htmlFor='description'> A nice description of the photo</label>
        <input type='text' id='description'/>
      </div>

      <Link to="/signin">
        <button onClick={() => { signOut(); }}>
          <div>Sign Out</div>
        </button>
      </Link>

      <div>
        <p>Profile Pic</p>
        <img src={props.profilePic} width="200" height="200" /> 
      </div>
    </div>
  );
};
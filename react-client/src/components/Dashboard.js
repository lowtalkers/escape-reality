import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';
var fecha = require('fecha');
var vex = require('vex-js');
vex.registerPlugin(require('vex-dialog'));
vex.defaultOptions.className = 'vex-theme-os';

var fileName;
var filePath;
var picDescrip;
var date = fecha.format(new Date(), 'mediumDate').replace(/\s+/g, '');
var currentImgs = [];


const getAllPhotos = () => {
  $.get({
    url: '/topPics',
    success: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.error('error in get upload', error);
      $('.error').show();
    },
  });
};

const savePhoto = (data) => {
  var link = 'https://s3.amazonaws.com/' + data.Bucket + '/' + data.Key;
  console.log(link);
  $.post({
    url: '/addPic',
    data: JSON.stringify({title: data.Key, imageLink: link, description: picDescrip}),
    contentType: 'application/json',
    success: (data) => {
      console.log(data);
      getAllPhotos();
    },
    error: (error) => {
      console.error('error in get upload', error);
      $('.error').show();
    },
  });
};

const uploadFile = () => {

  $(function () {
    $("#fileUp").change(function () {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        picDescrip = $("#description").val();
        fileName = date + this.files[0].name;
        console.log(fileName);
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
      }
    });
  });

  function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
    filePath = e.target.result;

    if (!currentImgs.includes(fileName)) {
      currentImgs.push(fileName);
      $.post({
        url: '/upload',
        data: JSON.stringify({fileName: fileName, filePath: filePath}),
        contentType: 'application/json',
        success: (data) => {
          console.log(data);
          $("#fileUp").val('');
          vex.dialog.alert('Image uploaded!');
          savePhoto(data);
        },
        error: (error) => {
          console.error('error in get upload', error);
          $('.error').show();
        },
      });
    }
  };
}

const signOut = () => {
  $.get({
    url: '/signOut',
    success: (data) => {
      console.log(data)
    },
    error: (error) => {
      console.error('error in get bookmarks', error);
      $('.error').show();
    },
  });
}

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
        <button onClick={() => {signOut()}}>
          <div>Sign Out</div>
        </button>
      </Link>
    </div>
  );
};
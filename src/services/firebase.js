import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDwyYfo3Cq9hWpOWzmvabWLkbKYFodTHVQ",
    authDomain: "movie-app-37708.firebaseapp.com",
    databaseURL: "https://movie-app-37708.firebaseio.com",
    projectId: "movie-app-37708",
    storageBucket: "movie-app-37708.appspot.com",
    messagingSenderId: "606735069756",
    appId: "1:606735069756:web:b2f8e76c0960e622e28939"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase
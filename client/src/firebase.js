import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3NFoJJAg9_rFIAUSe91_QXpN4lEaGLg8",
  authDomain: "mern-ecommerce-d3a8e.firebaseapp.com",
  projectId: "mern-ecommerce-d3a8e",
  storageBucket: "mern-ecommerce-d3a8e.appspot.com",
  messagingSenderId: "397954270572",
  appId: "1:397954270572:web:092d6047708fd526281f49",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuth = new firebase.auth.GoogleAuthProvider();

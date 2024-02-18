import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5ddhtPz_V0oA0WN0ZdulP1EcQHvBd_No",
  authDomain: "project-12-f405a.firebaseapp.com",
  projectId: "project-12-f405a",
  storageBucket: "project-12-f405a.appspot.com",
  messagingSenderId: "279816657656",
  appId: "1:279816657656:web:0cbefeeb5032704329b90d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8bzDFb5wEXAg0V6GQC1K8cPT4CkcPfHo",
  authDomain: "byejimmy-d8d48.firebaseapp.com",
  projectId: "byejimmy-d8d48",
  storageBucket: "byejimmy-d8d48.appspot.com",
  messagingSenderId: "1017367235019",
  appId: "1:1017367235019:web:95e8c2dc517c13f86bce4e",
  measurementId: "G-K7H0JN85FT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}
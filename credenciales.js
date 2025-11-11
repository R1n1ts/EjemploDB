import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGPECQL8L3lPs1iJdx0NLd4fqqld8T_WE",
  authDomain: "basedatos-f5ec3.firebaseapp.com",
  projectId: "basedatos-f5ec3",
  storageBucket: "basedatos-f5ec3.appspot.com",
  messagingSenderId: "1024311651624",
  appId: "1:1024311651624:web:b7aa5361de858e4a7cf41d"
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
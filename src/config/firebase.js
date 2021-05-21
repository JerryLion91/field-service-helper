import firebase from 'firebase/app';
// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBaEW-WQg0lRTcz1O7kcKawLHp0wOLRmR4',
  authDomain: 'fieldservicehelper-f8300.firebaseapp.com',
  projectId: 'fieldservicehelper-f8300',
  storageBucket: 'fieldservicehelper-f8300.appspot.com',
  messagingSenderId: '66227276977',
  appId: '1:66227276977:web:d48682d2684b52ecc42690',
  measurementId: 'G-Z25HF6BEWS',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

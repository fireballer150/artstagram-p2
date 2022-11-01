import firebaseApp from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
// import 'firebase/compat/app';
// import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCJUH5kfgWnkuun1ljf3OtF6vKFcIyYKSI',
  authDomain: 'artstagram-p1.firebaseapp.com',
  databaseURL: 'https://artstagram-p1-default-rtdb.firebaseio.com',
  projectId: 'artstagram-p1',
  storageBucket: 'artstagram-p1.appspot.com',
  messagingSenderId: '524896408300',
  appId: '1:524896408300:web:0e002b78e5f319176bcbc9',
  measurementId: 'G-BD9RYTKJQP'
};

firebaseApp.initializeApp(firebaseConfig);
// const firebaseConfig = {
//   apiKey: 'AIzaSyCJUH5kfgWnkuun1ljf3OtF6vKFcIyYKSI',
//   authDomain: 'artstagram-p1.firebaseapp.com',
//   databaseURL: 'https://artstagram-p1-default-rtdb.firebaseio.com',
//   projectId: 'artstagram-p1',
//   storageBucket: 'artstagram-p1.appspot.com',
//   messagingSenderId: '524896408300',
//   appId: '1:524896408300:web:0e002b78e5f319176bcbc9',
//   measurementId: 'G-BD9RYTKJQP'
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;

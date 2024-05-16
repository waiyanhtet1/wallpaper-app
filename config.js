import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfuoEzr5ME7xXuub85RTYkPWbfg0v0Oyw",
  authDomain: "wallpaper-app-6443e.firebaseapp.com",
  projectId: "wallpaper-app-6443e",
  storageBucket: "wallpaper-app-6443e.appspot.com",
  messagingSenderId: "966179361473",
  appId: "1:966179361473:web:9585f20eb347041eba3a40",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

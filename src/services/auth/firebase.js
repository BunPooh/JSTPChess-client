import firebase from "firebase/app";
import "firebase/auth";

import config from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
// // const firebase = app;
export default firebase;

import logo from './logo.svg';
import './App.css';
import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {

  const [ user , setUser] = useState({
    isSignedIn : false,
    name: '',
    email:'',
    // photo: '',
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
      const {displayName,email} = res.user;
      const signedInUser ={
       isSignedIn :true,
       name :displayName,
       email : email, 

      }
  setUser(signedInUser)


      console.log(displayName,email);
    }) 
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  }

 const handleSignOut=()=>{
firebase.auth().signOut()
.then(res =>{

const signedOutUser = {
  isSignedIn:false,
  name:'',
  email:'',
}
setUser(signedOutUser)
})
.catch( err=>{

})
  //  console.log('signOut');
 }


  return (
    <div className = "app">
      {

        user.isSignedIn ?  <button onClick = {handleSignOut}>Sign out</button> :
 <button onClick = {handleSignIn}>Sign in</button>
      }
      {
     
     user.isSignedIn && <div>
      
       <p> Welcome,{user.name}</p>
       <p>your email:{user.email}</p>
       </div>
   }

    </div>
  );
}

export default App;

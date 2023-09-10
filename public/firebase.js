// // Using import (ES modules)
// import firebase from 'firebase/app';

// // Using require (CommonJS)
// // const firebase = require('firebase/app');

const firebaseConfig = {

  apiKey: "AIzaSyCfS35-kOR1-yopqQXSMKAwxZvfD5FOn5Q",

  authDomain: "bk-travels.firebaseapp.com",

  databaseURL: "https://bk-travels-default-rtdb.firebaseio.com",

  projectId: "bk-travels",

  storageBucket: "bk-travels.appspot.com",

  messagingSenderId: "183853278332",

  appId: "1:183853278332:web:9170226f7a59ae4600d5f9",

  measurementId: "G-G0EKGQLKKH"

};

firebase.initializeApp(firebaseConfig);

// reset
reset = () => {
  document.getElementById('uemail').reset();
  document.getElementById('upass').reset();
}
var userLogin=false;
// Login
login = () => {
  var email = document.getElementById('uemail').value;
  var password = document.getElementById('upass').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Login successful, access the user object
      var user = userCredential.user;
      document.getElementById('loginMessage').style.color = "green";
      document.getElementById('loginMessage').innerHTML = "Logged in successful!Go back to Home.";
      // .style.display='none';
      console.log("Logged in user:", user.uid);
      localStorage.setItem("id",user.uid);
      // console.log(user);
      
    })
    .catch(function (error) {
      // Login failed, handle the error
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById('loginMessage').style.color = "red";
      document.getElementById('loginMessage').innerHTML = errorMessage;
      console.error("Login error:", errorCode, errorMessage);
    });
}

var eye1 = document.getElementById('eyeToggle1');
var count1 = 0;
countClick1 = () => {
  if (eye1.onclick)
    count1++;
  return count1;
}
passwordVisible1 = () => {
  let count = countClick1();
  var passwordType = document.getElementById('pass');
  if (count % 2 == 1) {
    if (passwordType.type === "password") {
      passwordType.type = 'text';
      eye1.className = "fa-regular fa-eye-slash"
    }
  }
  else {
    passwordType.type = "password";
    eye1.className = "fa-regular fa-eye"
  }
}

var eye2 = document.getElementById('eyeToggle2');
var count2 = 0;
countClick2 = () => {
  if (eye2.onclick)
    count2++;
  return count2;
}
passwordVisible2 = () => {
  let count2 = countClick2();
  var passwordType = document.getElementById('repass');
  if (count2 % 2 == 1) {
    if (passwordType.type === "password") {
      passwordType.type = 'text';
      eye2.className = "fa-regular fa-eye-slash"
    }
  }
  else {
    passwordType.type = "password";
    eye2.className = "fa-regular fa-eye"
  }
}

// SIGN UP
signUp = () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  var confirmPassword = document.getElementById("repass").value;
  if (password == confirmPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User registration successful
        const user = userCredential.user;
        console.log('User registered:', user);
        document.getElementById('message').style.color = "green";
        document.getElementById('message').innerHTML = "Account created successful!Login back.";
      })
      .catch((error) => {
        // Handle registration error
        document.getElementById('message').style.color = "red";
        document.getElementById('message').innerHTML = error;
        console.log('Registration error:', error);
      });
  }
  else {
    document.getElementById('message').style.color = "red";
    document.getElementById('message').innerHTML = "Password doesn't match!";
  }
}
const db = firebase.firestore();
// Tour Booking
const rf4 = db.collection('Tour');
// Store in db
saveTour = () => {
 
  var data = {
    name: document.getElementById("tname").value,
    num: document.getElementById("tnum").value,
    location: document.getElementById("tloc").value,
    date: document.getElementById("newdate").value,
    package: document.getElementById("tpackage").value,
    TripType: document.getElementById("ttype").value,
    Days: document.getElementById("tdays").value,
    Guests: document.getElementById("tcount").value

  }
  if(data.name=="" || data.num=="" || data.location=="" || data.date=='' || data.package=="" || data.TripType=="" || data.Days=="" || data.Guests==""){
    document.getElementById('errorBox1').style.display='block';
    setTimeout(()=>document.getElementById('errorBox1').style.display='none',3000);
  }
  else{
  rf4.add(data).then(docRef => {
    console.log('Document written with ID: ', docRef.id);
    document.getElementById('msgBox1').style.display='block';
    setTimeout(()=>document.getElementById('msgBox1').style.display='none',3000);
  })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};
}


//Contact Form
// Create a reference to a collection
const rf = db.collection('ContactForm');
// Store in db
const contactForm = document.querySelector("#contactform");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  var data = {
    name:document.getElementById("clientName").value,
    service: document.getElementById("service").value,
    email: document.getElementById("email").value,
    number: document.getElementById("number").value,
    msg:document.getElementById('msg').value
  }
  if(data.name=="" || data.email=="" || data.service=="Service Type" || data.number=="" || data.msg==""){
    document.getElementById('errorBox').style.display='block';
    setTimeout(()=>document.getElementById('errorBox').style.display='none',3000);
  }
  else if(data.number<=999999999 || data.number>9999999999){
    document.getElementById('errorBox').style.display='block';
    setTimeout(()=>document.getElementById('errorBox').style.display='none',3000);
  }
  else{
  rf.add(data).then(() => {
    
    document.getElementById('msgBox').style.display='block';
    setTimeout(()=>document.getElementById('msgBox').style.display='none',3000);
  })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
  }
})

// Room Booking
const rf1 = db.collection('room');
// Store in db
save = () => {
  const uid=localStorage.getItem("id");
  var data = {
    name: document.getElementById("aname").value,
    email: document.getElementById("anum").value,
    hotelName: document.getElementById("roomChoice").value,
    roomCount: document.getElementById("aguest").value,
    checkin: document.getElementById("acac").value,
    checkout: document.getElementById("aloc").value

  }
  if(uid!=null){
  if(data.name==''|| data.num ==''||data.guest==''|| data.roomCount==''|| data.Ac==''|| data.location==''){
    document.getElementById('errorAlert1').style.display='block';
    setTimeout(()=>document.getElementById('errorAlert1').style.display='none',3000);
  }
  else{ 
  rf1.add(data).then(docRef => {
    console.log('Document written with ID: ', docRef.id);
    document.getElementById('bookingAlert1').style.display='block';
    setTimeout(()=>document.getElementById('bookingAlert1').style.display='none',3000);
  })
    .catch(error => {
      console.error('Error adding document: ', error);
      document.getElementById('errorAlert1').style.display='block';
      setTimeout(()=>document.getElementById('errorAlert1').style.display='none',3000);
    });
  }
}
else{
  document.getElementById('login').style.display='block';
  setTimeout(()=>document.getElementById('login').style.display='none',3000);
}
 
};
       // Create a reference to a collection
       const rf5 = db.collection('users');
       // Store in db
       saveUser = () =>  {
         var data = {
           name: document.getElementById("name").value,
           email: document.getElementById("email").value,
           pass: document.getElementById("pass").value
         }
         rf5.add(data).then(docRef => {
           console.log('Document written with ID: ', docRef.id);
         })
           .catch(error => {
             console.error('Error adding document: ', error);
           });
       };








// Cab booking

const rf2 = db.collection('Cab');
// Store in db
saveCab = () => {
  const uid = localStorage.getItem('id');
  var data = {
    name: document.getElementById("cabname").value,
    num: document.getElementById("cabnum").value,
    departure: document.getElementById("cabdep").value,
    destination: document.getElementById("cabdes").value,
    Vehicle: document.getElementById("cabchoice").value,
    Time: document.getElementById("cabtime").value

  }
  if(uid!=null){
  if(data.name==''|| data.num ==''||data.departure==''|| data.destination==''|| data.Vehicle==''|| data.Time==''){
    document.getElementById('errorAlert').style.display='block';
    setTimeout(()=>document.getElementById('errorAlert').style.display='none',3000);
  }
  else{
  rf2.add(data).then(docRef => {
    console.log('Document written with ID: ', docRef.id);
    document.getElementById('bookingAlert').style.display='block';
    setTimeout(()=>document.getElementById('bookingAlert').style.display='none',3000);
  })
    .catch(error => {
      console.error('Error adding document: ', error);
      document.getElementById('errorAlert').style.display='block';
      setTimeout(()=>document.getElementById('errorAlert').style.display='none',3000);
    });
  }
}
else{
  
    document.getElementById('login1').style.display='block';
    setTimeout(()=>document.getElementById('login1').style.display='none',3000);
  
}
};

// Camera Booking

const rf3 = db.collection('Camera');
// Store in db
saveCam = () => {
  const uid=localStorage.getItem('id');
  var data = {
    name: document.getElementById("camname").value,
    email: document.getElementById("camnum").value,
    model: document.getElementById("cammodel").value,
    variant: document.getElementById("camvariant").value,
    lens: document.getElementById("camlens").value,
    Time: document.getElementById("camtime").value

  }
  if(uid!=null){
  if(data.name==''|| data.num ==''||data.model==''|| data.variant==''|| data.lens==''|| data.Time==''){
    document.getElementById('errorAlert2').style.display='block';
    setTimeout(()=>document.getElementById('errorAlert2').style.display='none',3000);
  }
  else{
  rf3.add(data).then(docRef => {
    console.log('Document written with ID: ', docRef.id);
    document.getElementById('bookingAlert2').style.display='block';
    setTimeout(()=>document.getElementById('bookingAlert2').style.display='none',3000);
  })
    .catch(error => {
      console.error('Error adding document: ', error);
      document.getElementById('errorAlert2').style.display='block';
      setTimeout(()=>document.getElementById('errorAlert2').style.display='none',3000);
    });
  }
}
else{
  document.getElementById('login2').style.display='block';
  setTimeout(()=>document.getElementById('login2').style.display='none',3000);
}
};





// Retrieve data from db
getData = () => {
  rf.get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        document.getElementById('result').innerHTML = doc.data().password;

        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
}

const provider = new firebase.auth.GoogleAuthProvider();

// Attach an event listener to the sign-in button
const signInButton = document.getElementById('google-sign-in-button');
signInButton.addEventListener('click', () => {
  // Start the sign-in process
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // User signed in successfully
      const user = result.user;
      console.log('Signed in user:', user);
      console.log('current user:', firebase.auth().currentUser);
    })
    .catch((error) => {
      // Handle sign-in error
      console.error('Error signing in:', error);
    });
});

const docRef = db.collection('users').doc('userdetails');
update = () => {

  const newData = {
    password: document.getElementById("npass").value

    // Add more fields as needed
  };

  // Update the document with the new data
  docRef.update(newData)
    .then(() => {
      console.log('Document updated successfully');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
}

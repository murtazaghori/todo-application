  // Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDKH22MMdvmfNA51Fuu_jG04C8Mey9soC8",
  authDomain: "fir-auth-6191a.firebaseapp.com",
  projectId: "fir-auth-6191a",
  storageBucket: "fir-auth-6191a.firebasestorage.app",
  messagingSenderId: "651528638379",
  appId: "1:651528638379:web:e57c46e1c7e05e73e78cee"
};
firebase.initializeApp(firebaseConfig);

// Sign-in function to handle user sign-up
function signIn(event) {
  event.preventDefault();  // Prevent form submission

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  console.log("Name: ", name);  // Debugging
  console.log("Email: ", email);
  console.log("Password: ", password);

  // Firebase signup
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully
      var user = userCredential.user;
      console.log("User: ", user);
      alert('Sign-up successful!');
      // Optional: Redirect to another page (e.g., home or dashboard)
      window.location.href = "Todo.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error: ", errorMessage);
      alert('Error: ' + errorMessage);
    });

    
}

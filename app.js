// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDKH22MMdvmfNA51Fuu_jG04C8Mey9soC8",
//     authDomain: "fir-auth-6191a.firebaseapp.com",
//     databaseURL: "https://fir-auth-6191a-default-rtdb.firebaseio.com",
//     projectId: "fir-auth-6191a",
//     storageBucket: "fir-auth-6191a.firebasestorage.app",
//     messagingSenderId: "651528638379",
//     appId: "1:651528638379:web:e57c46e1c7e05e73e78cee"
//   };
  
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
  
//   // Save data function
//   function savedata(event) {
//     // Prevent form submission (page reload)
//     event.preventDefault();
  
//     try {
//       // Get values from the form
//       var name = document.getElementById("name").value;
//       var email = document.getElementById("email").value;
//       var password = document.getElementById("password").value;
//       var taskDescription = document.getElementById("taskDescription").value;
  
//       // Create user object
//       var userObj = {
//         userName: name,
//         userEmail: email,
//         userPassword: password,
//         taskDescription: taskDescription // Include the task description if required
//       };
  
//       // Save data to Firebase Realtime Database
//       firebase.database().ref("users").push(userObj, (error) => {
//         if (error) {
//           console.log("Error saving data: ", error);
//         } else {
//           console.log("Data saved successfully!");
//           alert("Data saved successfully!");
//           // Optionally, clear form fields after successful submission
//           document.getElementById("userForm").reset();
//         }
//       });
  
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   }
  
//   // Add event listener for form submission
//   document.getElementById("userForm").addEventListener("submit", savedata);
  
// Firebase configuration



// app.js

// Firebase configuration
    
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKH22MMdvmfNA51Fuu_jG04C8Mey9soC8",
  authDomain: "fir-auth-6191a.firebaseapp.com",
  databaseURL: "https://fir-auth-6191a-default-rtdb.firebaseio.com",
  projectId: "fir-auth-6191a",
  storageBucket: "fir-auth-6191a.firebasestorage.app",
  messagingSenderId: "651528638379",
  appId: "1:651528638379:web:e57c46e1c7e05e73e78cee"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Realtime Database reference
const dbRef = firebase.database().ref('todos');

// Get reference to the list where tasks will be displayed
var ulElement = document.getElementById("list");

// Function to add new ToDo task
function addTodo() {
  var input = document.getElementById("todoInput");

  if (input.value) {
    var todoText = input.value;

    // Add new task to Firebase
    const newTodoRef = dbRef.push();
    newTodoRef.set({
      task: todoText,
      completed: false
    }, function(error) {
      if (error) {
        console.log("Error saving data to Firebase:", error);
      } else {
        console.log("Task saved successfully to Firebase");
      }
    });

    // Add task to the HTML list
    var liElement = document.createElement("li");
    liElement.textContent = todoText;
    liElement.setAttribute('data-id', newTodoRef.key); // Store Firebase key as a data-id

    // Create Delete Button
    var delBtnElement = document.createElement("button");
    delBtnElement.textContent = "Delete";
    delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");
    liElement.appendChild(delBtnElement);

    // Create Edit Button
    var editBtnElement = document.createElement("button");
    editBtnElement.textContent = "Edit";
    editBtnElement.setAttribute("onclick", "editItem(this)");
    liElement.appendChild(editBtnElement);

    // Append the new list item to the ToDo list
    ulElement.appendChild(liElement);

    // Clear input field after adding task
    input.value = "";
  } else {
    alert("Please fill in the field..");
  }
}

// Delete all items from the list
function deleteAllItems() {
  ulElement.innerHTML = ""; // Clear list from UI
  dbRef.remove(); // Remove all items from Firebase
}

// Delete a single item from the list
function deleteSingleItem(e) {
  var todoId = e.parentNode.getAttribute('data-id');
  e.parentNode.remove(); // Remove from UI
  dbRef.child(todoId).remove(); // Remove from Firebase
}

// Edit a ToDo item
function editItem(e) {
  var updatedVal = prompt("Enter updated value..");
  if (updatedVal) {
    e.parentNode.firstChild.nodeValue = updatedVal;

    var todoId = e.parentNode.getAttribute('data-id');
    dbRef.child(todoId).update({
      task: updatedVal
    });
  }
}


// Load ToDo items from Firebase on page load
function loadTodos() {
  dbRef.on('value', function(snapshot) {
    var todos = snapshot.val();
    ulElement.innerHTML = ''; // Clear the current list

    for (let id in todos) {
      const todo = todos[id];

      var liElement = document.createElement("li");
      liElement.textContent = todo.task;
      liElement.setAttribute('data-id', id); // Store Firebase key as a data-id

      // Create Delete Button only once for each task
      var delBtnElement = document.createElement("button");
      delBtnElement.textContent = "Delete";
      delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");
      liElement.appendChild(delBtnElement);

      // Create Edit Button only once for each task
      var editBtnElement = document.createElement("button");
      editBtnElement.textContent = "Edit";
      editBtnElement.setAttribute("onclick", "editItem(this)");
      liElement.appendChild(editBtnElement);

      // Append the list item to the ToDo list
      ulElement.appendChild(liElement);
    }
  });
}

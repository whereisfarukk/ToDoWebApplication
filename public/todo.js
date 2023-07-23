const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    let save = document.createElement("save");
    let edit = document.createElement("edit");

    span.innerHTML = "\u2718";
    edit.innerHTML = "\u270D";
    save.innerHTML = "\u2714";

    li.appendChild(span);
    li.appendChild(edit);
    li.appendChild(save);
    save.style.display = "none";
    edit.style.display = "inline-block";
    span.style.display = "inline-block";



    const userId = localStorage.getItem('userId');
    console.log(userId);

    function enableEditing() {
      li.contentEditable = true; // Enable editing
      li.classList.add("editing"); // Add a class to style the editing state
      edit.style.display = "none"; // Hide the edit button
      save.style.display = "inline-block"; // Show the save button

      // Disable the edit, save, and span buttons
      edit.disabled = true;
      save.disabled = true;
      span.disabled = true;

      // Prevent default focus behavior of the edit and save buttons
      edit.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });
      save.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });

      // Set focus to the editable element and place cursor at the end of the text
      li.focus();
      const textNode = li.firstChild;
      const range = document.createRange();
      range.selectNodeContents(textNode);
      range.collapse(false); // Place the cursor at the end of the text
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    function disableEditing() {
      li.contentEditable = false; // Disable editing
      li.classList.remove("editing"); // Remove the class when editing is finished
      edit.style.display = "inline-block"; // Show the edit button
      save.style.display = "none"; // Hide the save button
    }

    function deleteTodoItem() {
      const text = li.innerHTML;
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `/auth/todo/${text}`, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          // Handle successful response
          console.log("Task deleted successfully");
          li.remove(); // Remove the todo item from the interface
        } else {
          // Handle error or other responses
          console.error("Error deleting task");
        }
      };
      xhr.send();
    }

    function enableEditing() {
      const updatedText = li.innerHTML;
      const todoId = todo.id; // Get the todo ID from your data
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `/auth/todo/${todoId}`, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          // Handle successful response
          console.log("Task updated successfully");
        } else {
          // Handle error or other responses
          console.error("Error updating task");
        }
      };
      xhr.send(JSON.stringify({ text: updatedText }));
    }
    edit.addEventListener("click", enableEditing);
    save.addEventListener("click", function () {
      disableEditing();
    });
    span.addEventListener("click", deleteTodoItem);

    li.addEventListener("blur", function () {
      disableEditing();
    });

    const text = inputBox.value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/auth/todo", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Handle successful response
        console.log("Task added successfully");
      } else {
        // Handle error or other responses
        console.error("Error adding task");
      }
    };
    
    xhr.send(JSON.stringify({ text: text }));
    
    saveTodos(userId, text, (error, results) => {
      if (error) {
        console.log("Error saving todo:", error);
      } else {
        console.log("Todo saved successfully:", results);
        window.location.href = '/todo';
      }
    });
    inputBox.value = "";
  }
 
}

function retrieveTodos() {
  fetch("/auth/todo")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todo) => {
        let li = document.createElement("li");
        li.innerHTML = todo.text;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        let save = document.createElement("save");
        let edit = document.createElement("edit");

        span.innerHTML = "\u2718";
        edit.innerHTML = "\u270D";
        save.innerHTML = "\u2714";

        li.appendChild(span);
        li.appendChild(edit);
        li.appendChild(save);
        save.style.display = "none";
        edit.style.display = "inline-block";
        span.style.display = "inline-block";

        function enableEditing() {
          li.contentEditable = true; // Enable editing
          li.classList.add("editing"); // Add a class to style the editing state
          edit.style.display = "none"; // Hide the edit button
          save.style.display = "inline-block"; // Show the save button

          // Disable the edit, save, and span buttons
          edit.disabled = true;
          save.disabled = true;
          span.disabled = true;

          // Prevent default focus behavior of the edit and save buttons
          edit.addEventListener("mousedown", function (event) {
            event.preventDefault();
          });
          save.addEventListener("mousedown", function (event) {
            event.preventDefault();
          });

          // Set focus to the editable element and place cursor at the end of the text
          li.focus();
          const textNode = li.firstChild;
          const range = document.createRange();
          range.selectNodeContents(textNode);
          range.collapse(false); // Place the cursor at the end of the text
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }

        function disableEditing() {
          li.contentEditable = false; 
          li.classList.remove("editing"); 
          edit.style.display = "inline-block";
          save.style.display = "none"; 
          const updatedText =  li.textContent.slice(0, -3);
          const todoId = todo.id; // Get the todo ID from my data
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", `/auth/todo/${todoId}`, true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              // Handle successful response
              console.log("Task updated successfully");
            } else {
              // Handle erro responses
              console.error("Error updating task");
            }
          };
          xhr.send(JSON.stringify({ text: updatedText }));
        }
        function deleteTodoItem() {
          const todoId = todo.id; // Get the todo ID from  data
          const xhr = new XMLHttpRequest();
          xhr.open("DELETE", `/auth/todo/${todoId}`, true);
          xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              // Handle successful response
              console.log("Task deleted successfully");
              li.remove(); // Remove the todo item from the interface
            } else {
              console.log("Error deleting task");
            }
          };
          xhr.send();
        }

        edit.addEventListener("click", enableEditing);
        save.addEventListener("click", function () {
          disableEditing();
        });
        span.addEventListener("click", deleteTodoItem);

        li.addEventListener("blur", function () {
          disableEditing();
        });
      });
    })
    .catch((error) => {
      console.error("Error retrieving todos:", error);
    });
}

// Calling the retrieveTodos function when the page loads
window.addEventListener("load", retrieveTodos);
listContainer.addEventListener("click",function(e){
  if(e.target.tagName === "LI"){
      e.target.classList.toggle("checked");
  
  }
  else if(e.target.tagName === "SPAN"){
      e.target.parentElement.remove();
  }
},false);
function saveTodos(userId, text, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/auth/todo", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        callback(null, data);
      } else {
        callback("Error saving todo", null);
      }
    }
  };
  xhr.send(JSON.stringify({ userId, text }));
}
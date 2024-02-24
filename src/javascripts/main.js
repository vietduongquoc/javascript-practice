// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addBtn");

var icon = document.getElementById("edit")

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// Also close the modal if the user clicks anywhere outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* Edit modal**/

// Get the necessary elements for the edit modal
var editModal = document.getElementById("editProductModal");
var editBtn = document.getElementById("editProductBtn");
var editSpan = document.getElementsByClassName("edit-close")[0];

// When the user clicks on the edit button, open the modal
editBtn.onclick = function () {
  editModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
editSpan.onclick = function () {
  editModal.style.display = "none";
}

// When the user clicks anywhere outside the modal, it will also close
window.onclick = function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
}

/* Delete modal */

// Get the elements needed for the delete method
var deleteModal = document.getElementById("deleteProductModal");
var deleteBtn = document.getElementById("deleteProductBtn");
var deleteSpan = document.getElementsByClassName("delete-close")[0];
var cancelDelete = document.getElementById("cancelDelete");

// When the user clicks the delete button, open the modal
deleteBtn.onclick = function () {
  deleteModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
deleteSpan.onclick = function () {
  deleteModal.style.display = "none";
}

// When the user clicks on the "Cancel" button, close the modal
cancelDelete.onclick = function () {
  deleteModal.style.display = "none";
}

// When the user clicks anywhere outside the modal, it will also close
deleteBtn.onclick = function (event) {
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
}


/* Error modal */
// Get the necessary elements for the error modal
var errorModal = document.getElementById("errorModal");
var errorBtn = document.getElementById("errorActionBtn");
var errorSpan = document.getElementsByClassName("error-close")[0];

// When the user clicks on the button to perform an action, open the error modal
errorBtn.onclick = function() {
  errorModal.style.display = "block";
}

// When the user clicks on <span> (x), close the error modal
errorSpan.onclick = function() {
  errorModal.style.display = "none";
}

// When the user clicks anywhere outside the modal, it will also close
errorModal.onclick = function(event) {
  if (event.target == errorModal) {
    errorModal.style.display = "none";
  }
}


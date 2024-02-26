// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("addBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

/* Edit modal**/

// Get the necessary elements for the edit modal
const editModal = document.getElementById("editProductModal");
const editBtn = document.getElementById("editProductBtn");
const editSpan = document.getElementsByClassName("edit-close")[0];

// When the user clicks on the edit button, open the modal
editBtn.onclick = function () {
  editModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
editSpan.onclick = function () {
  editModal.style.display = "none";
}

/* Delete modal */

// Get the elements needed for the delete method
const deleteModal = document.getElementById("deleteProductModal");
const deleteBtn = document.getElementById("deleteProductBtn");
const deleteSpan = document.getElementsByClassName("delete-close")[0];

// When the user clicks the delete button, open the modal
deleteBtn.onclick = function () {
  deleteModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
deleteSpan.onclick = function () {
  deleteModal.style.display = "none";
}

/* Error modal */

// Get the necessary elements for the error modal
const errorModal = document.getElementById("errorModal");
const errorBtn = document.getElementById("errorActionBtn");
const errorSpan = document.getElementsByClassName("error-close")[0];

errorBtn.onclick = function () {
  errorModal.style.display = "block";
}

// When the user clicks on <span> (x), close the error modal
errorSpan.onclick = function () {
  errorModal.style.display = "none";
}



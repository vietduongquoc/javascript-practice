// Get the modal
const modal = document.getElementById("addProductModal");
// Get the button that opens the modal
const btn = document.getElementById("addBtn");
// Get the <span> element that closes the modal
const span = document.getElementById("add-close");
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
const editBtns = document.getElementsByClassName("editProductBtn"); //Get all the buttons
const editSpan = document.getElementById("edit-close");

for (let i = 0; i < editBtns.length; i++) {
  editBtns[i].onclick = function () {
    editModal.style.display = "block";
  }
}

editSpan.onclick = function () {
  editModal.style.display = "none";
}

/* Delete modal */

// Get the elements needed for the delete method
const deleteModal = document.getElementById("deleteProductModal");
const deleteBtns = document.getElementsByClassName("deleteProductBtn");
const deleteSpan = document.getElementById("delete-close");

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].onclick = function () {
    deleteModal.style.display = "block";
  }
}
// When the user clicks on <span> (x), close the modal
deleteSpan.onclick = function () {
  deleteModal.style.display = "none";
}

/* Error modal */
// Get the necessary elements for the error modal
const errorModal = document.getElementById("errorModal");
const errorBtn = document.getElementById("errorActionBtn");
const errorSpan = document.getElementById("error-close");

errorBtn.onclick = function () {
  errorModal.style.display = "block";
}
// When the user clicks on <span> (x), close the error modal
errorSpan.onclick = function () {
  errorModal.style.display = "none";
}

//Get all toggle-btn and assign them to variables togglerBtns
var togglerBtns = document.querySelectorAll(".toggler-btn");
// Loop through each toggler and add a click event
togglerBtns.forEach(function (togglerBtn) {
  togglerBtn.onclick = function () {
    const id = togglerBtn.id;
    var menuBox = document.querySelector(`[data-id="${id}"]`);
    menuBox.classList.toggle("hidden")
  };
});




// Get the modal
const modal = document.getElementById("myModal");
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
// const errorBtn = document.getElementById("errorActionBtn");
// const errorSpan = document.getElementById("error-close");

// errorBtn.onclick = function () {
//   errorModal.style.display = "block";
// }
// When the user clicks on <span> (x), close the error modal
// errorSpan.onclick = function () {
//   errorModal.style.display = "none";
// }

// var togglerBtns = document.getElementsByClassName("toggler-btn");
// for (let btn of togglerBtns) {
//   btn.onclick = function () {
//     var editBtns = document.getElementsByClassName("editProductBtn");
//     var deleteBtns = document.getElementsByClassName("deleteProductBtn");

//     for (let editBtn of editBtns) {
//       console.log(editBtn)
//       if (editBtn.style.display === "none") {
//         editBtn.style.display = "block";
//       } else {
//         editBtn.style.display = "none";
//       }
//       editBtn.classList.toggle('hidden');
//     }

//     for (let deleteBtn of deleteBtns) {
//       if (deleteBtn.style.display === "none") {
//         deleteBtn.style.display = "block";
//       } else {
//         deleteBtn.style.display = "none";
//       }
//       deleteBtn.classList.toggle('hidden');
//     }
//   };
// }

// Lấy tất cả nút toggler và gán cho biến togglerBtns
var togglerBtns = document.querySelectorAll(".toggler-btn");
// Lặp qua từng nút toggler và thêm sự kiện click
togglerBtns.forEach(function (togglerBtn) {
  togglerBtn.onclick = function () {
    // Lấy phần tử menu-box
    const id = togglerBtn.id;

    var menuBox = document.querySelector(`[data-id="${id}"]`);

    // Toggle hiển thị của menu-box
    menuBox.classList.toggle("hidden")
  };
});




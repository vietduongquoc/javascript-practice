import { API } from '../constants/url-api';

export default class ProductView {

  static renderNewProducts(product) {
    const {
      name,
      brand,
      price,
      quantity,
      status,
    } = product;

    const tableElement = document.querySelector('.table');

    const productListHTML = `
    <tr>
      <td><img src="/ibm-image.a83d7a21.png" alt="ibm"><span>${name}</span></td>
      <td><button class="btn btn-sattus text-status btn-false">${status === true ? 'Available' : 'Sold out'}</button></td>
      <td>${brand}</td>
      <td><button class="btn btn-brand">${quantity}</button></td>
      <td><img src="/gladys.a60930bd.png" alt="glady"></td>
      <td>$${price}</td>
      <td>
        <img id="6" class="toggler-btn" src="/icon-action.07809a11.png" alt="icons-action">
        <div class="hidden menu-box" data-id="6">
          <button class="editProductBtn">Edit</button>
          <button class="deleteProductBtn">Delete</button>
        </div>
      </td>
    </tr>
    `
    tableElement.innerHTML += productListHTML;

    //Get all toggle-btn and assign them to variables togglerBtns
    let togglerBtns = document.querySelectorAll(".toggler-btn");
    // Loop through each toggler and add a click event
    togglerBtns.forEach(function (togglerBtn) {
      togglerBtn.onclick = function () {
        const id = togglerBtn.id;
        var menuBox = document.querySelector(`[data-id="${id}"]`);
        menuBox.classList.toggle("hidden")
      };
    });
    /* Edit modal**/

    // Get the necessary elements for the edit modal
    const editModal = document.getElementById("editProductModal");
    const editBtns = document.getElementsByClassName("editProductBtn"); //Get all the buttons
    const editSpan = document.getElementById("edit-close");

    for (let i = 0; i < editBtns.length; i++) {
      editBtns[i].onclick = function () {
        editModal.classList.toggle("hidden");
      }
    }

    editSpan.onclick = function () {
      editModal.classList.toggle("hidden");
    };

    /* Delete modal */

    // Get the elements needed for the delete method
    const deleteModal = document.getElementById("deleteProductModal");
    const deleteBtns = document.getElementsByClassName("deleteProductBtn");
    const deleteSpan = document.getElementById("delete-close");

    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].onclick = function () {
        deleteModal.classList.toggle("hidden");
      }
    }
    // When the user clicks on <span> (x), close the modal
    deleteSpan.onclick = function () {
      deleteModal.classList.toggle("hidden");
    };
  }
}

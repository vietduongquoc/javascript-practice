import { API } from '../constants/url-api';

export default class ProductView {

//   renderAddProductPage() {
//     this.clearMainContainer();
//     const mainContent = getElementById('main-content');

//     mainContent.innerHTML = `
// <div id="addProductModal" class="add-modal hidden">
// <form class="container modal-content" action="javascript:void(0)">
//   <span id="add-close">&times;</span>
//   <h3 class="modal-title">Add new product</h3>
//   <p class="modal-dcrs">Name</p>
//   <input class="input" type="text" id="productName" placeholder="Enter name...">
//   <p class="modal-dcrs">Quantity</p>
//   <input class="input" type="number" id="productQuantity" placeholder="0">
//   <p class="modal-dcrs">Price</p>
//   <input class="input" type="number" id="productPrice" placeholder="0">
//   <label for="status-dropdown" class="modal-dcrs">Status</label><br>
//   <select class="input input-select-status" id="status-dropdown" name="options">
//     <option value="option1">Available</option>
//     <option value="option2">Sold Out</option>
//   </select>
//   <p class="modal-dcrs">Brand</p>
//   <input class="input" type="text" id="productBrand" placeholder="Enter Brand">
//   <div class="button-add-modal">
//     <button id="cancelBtnAdd" class="modal-dcrs btn-form-cancel" type="reset">Cancel</button>
//     <button id="confirmBtnAdd" class="modal-dcrs-btn btn-form-confirm" type="submit">Confirm</button>
//   </div>
// </form>
// `;
//   }

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
  }
}

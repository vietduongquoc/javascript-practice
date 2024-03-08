import { API } from '../constants/url-api';
import { APIHandler } from '../controllers/product.controller';
import { validateForm } from '../models/user.model';

export default class ProductView {
  static renderProducts(products) {
    const tableElement = document.querySelector('.table');
    products.forEach(product => {
      const { id, name, type, brand, price, quantity, status } = product;
      const btnStatus = status ? 'btn-true' : 'btn-false';
      const textStatus = status ? 'Available' : 'Sold out';
      const productListHTML = `
        <tr>
          <td class="wrap-name"><span>${name}</span></td>
          <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
          <td>${type}</td>
          <td>${quantity}</td>
          <td>${brand}</td>
          <td>$${price}</td>
          <td>
            <img class="toggler-btn" src="/icon-action.07809a11.png" alt="icons-action" data-id="${id}">
            <div class="hidden menu-box" data-id="${id}">
              <button class="editProductBtn" data-product-id="${id}">Edit</button>
              <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
            </div>
          </td>
        </tr>
      `;
      tableElement.innerHTML += productListHTML;
    });
    this.setupToggleEvent();
  }

  renderProductFormPage(data = {}) {
    const {
      ADD_PRODUCT_HEADING,
      EDIT_PRODUCT_HEADING
    } = MESSAGES;
    const headingPage = Object.keys(data).length === 0 ? ADD_PRODUCT_HEADING : EDIT_PRODUCT_HEADING;

    // Destructure with default values to handle new product case (data = {})
    const {
      id = '', // Default to an empty string if id is not present
      name = '',
      price = '',
      quantity = '',
      brand = '',
      type = ''
    } = data;

    // It's getElementById, not getElementById, and should be called on document
    const tableContent = document.getElementById('table-content');

    // Check if the id attribute should be included
    const productIdAttribute = id ? `data-product-id="${id}"` : '';

    tableContent.innerHTML = `
      <div id="addProductModal" class="add-modal hidden">
        <form class="container modal-content" action="javascript:void(0)" ${productIdAttribute} id="product-form">
          <span id="add-close">&times;</span>
          <h3 class="modal-title">${headingPage}</h3>
          <label for="productName" class="modal-dcrs">Name</label>
          <input value="${name}" data-field="Name" class="input" type="text" id="productName" placeholder="Enter name...">
          <p data-field-error="Name" class="error-message" id="name-error"></p>

          <label for="productType" class="modal-dcrs">Type</label>
          <input value="${type}" data-field="Type" class="input" type="text" id="productType" placeholder="Enter type...">
          <p data-field-error="Type" class="error-message" id="type-error"></p>

          <label for="productQuantity" class="modal-dcrs">Quantity</label>
          <input value="${quantity}" data-field="Quantity" class="input" type="number" id="productQuantity" placeholder="0">
          <p data-field-error="Quantity" class="error-message" id="quantity-error"></p>

          <label for="productPrice" class="modal-dcrs">Price</label>
          <input value="${price}" data-field="Price" class="input" type="number" id="productPrice" placeholder="0">
          <p data-field-error="Price" class="error-message" id="price-error"></p>

          <label for="productBrand" class="modal-dcrs">Brand</label>
          <input value="${brand}" data-field="Brand" class="input" type="text" id="productBrand" placeholder="Enter Brand">
          <p data-field-error="Brand" class="error-message" id="brand-error"></p>

          <!-- The select for "Status" seems to be static and not tied to the product data. Adjust if needed. -->

          <div class="button-add-modal">
            <button id="cancelBtnAdd" class="modal-dcrs btn-form-cancel" type="reset">Cancel</button>
            <button id="confirmBtnAdd" class="modal-dcrs-btn btn-form-confirm" type="submit">Confirm</button>
          </div>
        </form>
      </div>
    `;

    // Assuming this.setupToggleEvent sets up the necessary event listeners
    // You might want to check or implement this method to ensure it behaves as expected.
    this.setupToggleEvent(); // Removed id as it doesn't seem necessary for setting up a toggle event based on provided context
  }

  static renderNewProduct(product) {
    const tableElement = document.querySelector('.table');
    const { id, name, type, brand, price, quantity, status } = product;
    const btnStatus = status ? 'btn-true' : 'btn-false';
    const textStatus = status ? 'Available' : 'Sold out';
    const productListHTML = `
      <tr>
        <td class="wrap-name"><span>${name}</span></td>
        <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
        <td>${type}</td>
        <td>${quantity}</td>
        <td>${brand}</td>
        <td>$${price}</td>
        <td>
            <img class="toggler-btn" src="/icon-action.07809a11.png" alt="icons-action" data-id="${id}">
            <div class="hidden menu-box" data-id="${id}">
              <button class="editProductBtn" data-product-id="${id}">Edit</button>
              <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
            </div>
        </td>
      </tr>
    `;
    tableElement.innerHTML += productListHTML;
    // Call setupToggleEvent again to ensure the setup event for the new product
    this.setupToggleEvent(id);
  }

  static renderEditProduct(productId) {
    const { id, name, type, brand, price, quantity, status } = productId;
    const btnStatus = status ? 'btn-true' : 'btn-false';
    const textStatus = status ? 'Available' : 'Sold out';


    const newItemHTML = `
        <td class="wrap-name"><span>${name}</span></td>
        <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
        <td>${type}</td>
        <td>${quantity}</td>
        <td>${brand}</td>
        <td>$${price}</td>
        <td>
            <img class="toggler-btn" src="/icon-action.07809a11.png" alt="icons-action" data-id="${id}">
            <div class="hidden menu-box" data-id="${id}">
              <button class="editProductBtn" data-product-id="${id}">Edit</button>
              <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
            </div>
        </td>
    `;

    // Tìm hàng (tr) của sản phẩm trong bảng dựa vào id và thay thế nội dung của nó
    const productRow = document.querySelector(`tr[data-id="${id}"]`); // Giả sử mỗi hàng tr có attribute `data-id`
    if (productRow) {
      productRow.innerHTML = newItemHTML;
    }

    this.setupToggleEvent(id);
  }



  static setupToggleEvent(id) {
    console.log({ id });
    console.log('setupToggleEvent', id)
    const togglerBtns = document.querySelectorAll('.toggler-btn');
    togglerBtns.forEach(btn => {
      btn.removeEventListener('click', this.toggleMenu);
      btn.addEventListener('click', this.toggleMenu);
    });
    this.setupEditModalEvent();
    this.setupDeleteModalEvent();
  }
  static toggleMenu(event) {
    const id = event.target.getAttribute('data-id');
    // console.log('toggleMenu: ', id)
    const menuBox = document.querySelector(`.menu-box[data-id="${id}"]`);
    if (menuBox) {
      menuBox.classList.toggle('hidden');
    }
  }




  static setupEditModalEvent() {
    const editBtns = document.querySelectorAll('.editProductBtn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', this.editProduct);
    });
    document.getElementById("edit-close").addEventListener('click', () => {
      document.getElementById("editProductModal").classList.toggle("hidden");
    });
  }
  static editProduct(event) {
    const productId = event.target.getAttribute('data-product-id');
    // console.log('editProduct: ', productId)
    //Edit-btns
    let cancelBtnEdit = document.getElementById("cancelBtnEdit");
    if (cancelBtnEdit) {
      cancelBtnEdit.addEventListener('click', function () {
        let modal = document.querySelector('.edit-modal');
        if (modal) {
          modal.classList.toggle("hidden");
        }
      });
    }
    let confirmBtnEdit = document.getElementById("confirmBtnEdit");
    if (confirmBtnEdit) {
      confirmBtnEdit.addEventListener('click', async function () {
        const result = await APIHandler.editProduct(productId);
        console.log('confirmBtnEdit: ', productId)
        let modal = document.querySelector('.edit-modal');
        if (modal) {
          modal.classList.toggle("hidden");
        }
        // location.reload()
      });
    }
    document.getElementById("editProductModal").classList.toggle("hidden");
  };





  static setupDeleteModalEvent() {
    const deleteBtns = document.querySelectorAll('.deleteProductBtn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', this.deleteProduct);
    });
    document.getElementById("delete-close").addEventListener('click', () => {
      document.getElementById("deleteProductModal").classList.toggle("hidden");
    });
  };
  static deleteProduct(event) {
    const productId = event.target.getAttribute('data-product-id');
    // console.log('deleteProduct: ', productId)
    //Delete-btns
    let btnDeleteCancel = document.getElementById("cancel-btn-delete");
    if (btnDeleteCancel) {
      btnDeleteCancel.addEventListener('click', function () {
        let modal = document.querySelector('.delete-modal');
        if (modal) {
          modal.classList.toggle("hidden");
        }
      });
    }
    let btnCfDelete = document.getElementById("confirm-btn-delete");
    if (btnCfDelete) {
      btnCfDelete.addEventListener('click', async function () {
        const result = await APIHandler.deleteProduct(productId);
        // console.log('btnCfDelete: ', productId)
        let modal = document.querySelector('.delete-modal');
        if (modal) {
          modal.classList.toggle("hidden");
        }
        location.reload()
      });
    }
    document.getElementById("deleteProductModal").classList.toggle("hidden");
  };
}

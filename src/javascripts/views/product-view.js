import { API } from '../constants/url-api';
import { APIHandler } from '../controllers/product.controller';
import validateForm from '../../utils/validateProductForm';
import generateErrorMessages from '../../utils/dom';
import iconAction from '../../assets/images/icon-action.png';

export default class ProductView {
  static bindClickPagination() {
    const homepage = document.querySelector('.homepage');
    homepage.addEventListener('click', (e) => {
      const target = e.target;

      if (!target.classList.contains('pagination-link')) {
        return;
      }

      const page = target.textContent;

      APIHandler.get({ page: page })
        .then(data => {
          ProductView.renderProducts(data);
        })
        .catch(error => console.error('Failed to load products:', error));
    });
  }

  static renderProducts(products) {
    const homepage = document.getElementById('table-products');

    // const tableElement = document.querySelector('.table');
    homepage.innerHTML = '<tr></tr>'
    // element = document.getElementById("element-id");
    homepage.parentNode.removeChild(homepage);
    console.log('homepage ', homepage);
    products.forEach(product => {
      const { id, name, type, brand, price, quantity, status } = product;
      const btnStatus = status ? 'btn-true' : 'btn-false';
      const textStatus = status ? 'Available' : 'Sold out';
      const productListHTML = `

        <td id="product-name-${id}"><span>${name}</span></td>
        <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
        <td id="product-type-${id}">${type}</td>
        <td id="product-quantity-${id}">${quantity}</td>
        <td id="product-brand-${id}">${brand}</td>
        <td id="product-price-${id}">$${price}</td>
          <td>
            <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
            <div class="hidden menu-box" data-id="${id}">
              <button class="editProductBtn" data-product-id="${id}">Edit</button>
              <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
            </div>
          </td>

      `;
      homepage.innerHTML += productListHTML;
      // console.log();
    });

    const paginationHTML = `
        <tr class="pagination-container">
          <div class="pagination-link" id="prev-button" aria-label="Previous page" title="Previous page">
            &lt;
          </div>
              <button class="pagination-link">1</button>
              <button class="pagination-link">2</button>
              <button class="pagination-link">3</button>

          <div class="pagination-link" id="next-button" aria-label="Next page" title="Next page">
            &gt;
          </div>
        <tr>
      `;
    homepage.innerHTML += paginationHTML;
    // console.log(homepage)
    this.setupToggleEvent();
    this.bindClickPagination();
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
            <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
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
    const productRow = document.querySelector(`tr[data-id="${id}"]`);
    if (productRow) {
      productRow.innerHTML = newItemHTML;
    }
    this.setupToggleEvent(id);
  }
  static setupToggleEvent() {
    // console.log({ id });
    // console.log('setupToggleEvent', id)
    const togglerBtns = document.querySelectorAll('.toggler-btn');
    togglerBtns.forEach(btn => {
      btn.removeEventListener('click', this.toggleMenu);
      btn.addEventListener('click', this.toggleMenu);
    });
    this.setupEditModalEvent();
    this.setupDeleteModalEvent();
    this.AddModalEvent();
  }
  static AddModalEvent() {
    let btnCancel = document.getElementById("cancelBtnAdd");
    if (btnCancel) {
      btnCancel.addEventListener('click', function () {
        let modal = document.querySelector('.add-modal');
        if (modal) {
          modal.classList.toggle("hidden");
        }
      });
    }
  }
  static toggleMenu(event) {
    const id = event.target.getAttribute('data-id');
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
    const elementModal = document.getElementsByClassName('edit-modal-content')
    elementModal[0].setAttribute("data-product-id", productId);

    document.getElementById('edit-productName').value = document.getElementById(`product-name-${productId}`).innerText
    document.getElementById('edit-productQuantity').value = document.getElementById(`product-quantity-${productId}`).innerText;
    document.getElementById('edit-productType').value = document.getElementById(`product-type-${productId}`).innerText;
    document.getElementById('edit-productPrice').value = document.getElementById(`product-price-${productId}`).innerText;
    document.getElementById('edit-productBrand').value = document.getElementById(`product-brand-${productId}`).innerText;

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
        // console.log('confirmBtnEdit: ', productId)
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

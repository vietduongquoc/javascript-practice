import { API } from '../constants/url-api';
import { APIHandler } from '../controllers/product.controller';
import { validateForm } from '../models/user.model';

export default class ProductView {
  static renderProducts(products) {
    const tableElement = document.querySelector('.table');
    products.forEach(product => {
      const { id, name,type, brand, price, quantity, status } = product;
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
              <button class="editProductBtn">Edit</button>
              <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
            </div>
          </td>
        </tr>
      `;
      tableElement.innerHTML += productListHTML;
    });
    this.setupToggleEvent();
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
              <button class="editProductBtn">Edit</button>
              <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
            </div>
        </td>
      </tr>
    `;
    tableElement.innerHTML += productListHTML;
    // Call setupToggleEvent again to ensure the setup event for the new product
    this.setupToggleEvent(id);
  }

  renderProductFormPage(data = {}) {

    const {
      id,
      name = '',
      price = '',
      colors = '',
      brand = '',
      imgUrl = ''
    } = data;
    let color = '';
    let hexCnpmode = '';

    if (colors && colors.length > 0) {
      ({ name: color, hexCode } = colors[0]);
    }

    const tableElement = document.querySelector('.table');

    const productListHTML = `
     <tr>
       <td class="wrap-name"><img class="img-item" src="${imgUrl}" alt="${name}"><span>${name}</span></td>
        <p data-field-error="Name" class="error-message" id="name-error"></p>
       <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
       <td>${brand}</td>
        <p data-field-error="Brand" class="error-message" id="brand-error"></p>
       <td>${quantity}</td>
        <p data-field-error="Quantity" class="error-message" id="quantity-error"></p>
       <td><img src="/gladys.a60930bd.png" alt="glady"></td>
       <td>$${price}</td>
        <p data-field-error="Price" class="error-message" id="price-error"></p>
       <td>
        <img class="toggler-btn" src="/icon-action.07809a11.png" alt="icons-action" data-id="${id}">
        <div class="hidden menu-box" data-id="${id}">
          <button class="editProductBtn">Edit</button>
          <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
        </div>
       </td>
     </tr>
  `;
    tableElement.innerHTML += productListHTML;
    // Call setupToggleEvent again to ensure the setup event for the new product
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
    console.log('toggleMenu: ', id)
    const menuBox = document.querySelector(`.menu-box[data-id="${id}"]`);
    if (menuBox) {
      menuBox.classList.toggle('hidden');
    }
  }
  static setupEditModalEvent() {
    const editBtns = document.querySelectorAll('.editProductBtn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById("editProductModal").classList.toggle("hidden");
      });
    });
    document.getElementById("edit-close").addEventListener('click', () => {
      document.getElementById("editProductModal").classList.toggle("hidden");
    });
  }
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
    console.log('deleteProduct: ', productId)
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
        console.log('btnCfDelete: ', productId)
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

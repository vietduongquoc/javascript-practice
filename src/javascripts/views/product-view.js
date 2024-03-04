import { API } from '../constants/url-api';

export default class ProductView {
  static renderProducts(products) {
    const tableElement = document.querySelector('.table');
    // tableElement.innerHTML = '';


    products.forEach(product => {
      const { id, imgUrl, name, brand, price, quantity, status } = product;
      const btnStatus = status ? 'btn-true' : 'btn-false';
      const textStatus = status ? 'Available' : 'Sold out';

      const productListHTML = `
        <tr>
          <td class="wrap-img"><img class="img-item" src="${imgUrl}" alt="${name}"><span>${name}</span></td>
          <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
          <td>${brand}</td>
          <td>${quantity}</td>
          <td><img src="/gladys.a60930bd.png" alt="glady"></td>
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
    const { id, imgUrl, name, brand, price, quantity, status } = product;
    const btnStatus = status ? 'btn-true' : 'btn-false';
    const textStatus = status ? 'Available' : 'Sold out';

    const productListHTML = `
      <tr>
        <td class="wrap-img"><img class="img-item" src="${imgUrl}" alt="${name}"><span>${name}</span></td>
        <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
        <td>${brand}</td>
        <td>${quantity}</td>
        <td><img src="/gladys.a60930bd.png" alt="glady"></td>
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

  static setupToggleEvent(id) {
    console.log({id})
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
    console.log(id)
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
      btn.addEventListener('click', () => {
        document.getElementById("deleteProductModal").classList.toggle("hidden");
      });
    });

    document.getElementById("delete-close").addEventListener('click', () => {
      document.getElementById("deleteProductModal").classList.toggle("hidden");
    });
  };
}

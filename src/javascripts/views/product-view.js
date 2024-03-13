import { API } from '../constants/url-api';
import { APIHandler } from '../controllers/product.controller';
import validateForm from '../../utils/validateProductForm';
import generateErrorMessages from '../../utils/dom';
import iconAction from '../../assets/images/icon-action.png';

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
            <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
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

  renderPagination

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

document.addEventListener('DOMContentLoaded', function () {
  APIHandler.get('products')
    .then(data => {
      ProductView.renderProducts(data);
    })
    .catch(error => console.error('Failed to load products:', error));
});

addProductModal.addEventListener('submit', async function (event) {
  event.preventDefault();

  // Get the values from the form inputs
  const nameValue = document.getElementById('productName').value;
  const TypeValue = document.getElementById('productType').value;
  const QuantityValue = document.getElementById('productQuantity').value;
  const ProductStatusDropdown = document.getElementById('status-dropdown').value;
  const priceValue = document.getElementById('productPrice').value;
  const brandValue = document.getElementById('productBrand').value;

  // Create a product object with the form input values
  const productInputs = {
    'Name': nameValue,
    'Price': priceValue,
    'Brand': brandValue,
    'Type': TypeValue,
    'Quantity': QuantityValue,
  }

  const { formError } = validateForm(productInputs);

  // Generate new error messages based on the validation results
  generateErrorMessages(formError);

  // If there are any validation errors, stop the function
  const isPassed = Object.values(formError).every(value => value === '');
  if (!isPassed) {
    return;
  }

  const product = {
    name: nameValue,
    price: priceValue,
    brand: brandValue,
    type: TypeValue,
    quantity: QuantityValue
  }

  // Send a new data product to the API and process the results
  try {
    const products = await APIHandler.post('products', product);

    ProductView.renderNewProduct(products)
  } catch (error) {
    console.error('Error adding product:', error);
  }

  // Get the list of new products after adding
  try {
    const data = await APIHandler.get('products');
    console.log(data);
  } catch (error) {
    console.error('Failed to load products:', error);
  };
  location.reload()
});

document.addEventListener('DOMContentLoaded', function () {
  const editProductModal = document.getElementById('editProductModal');
  editProductModal.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Assuming you have a way to set and get the currently editing product's ID.
    const productId = e.target.getAttribute('data-product-id');

    console.log(productId)
    const editProductName = document.getElementById('edit-productName').value;
    const editProductQuantity = document.getElementById('edit-productQuantity').value;
    const editProductType = document.getElementById('edit-productType').value;
    const editProductPrice = document.getElementById('edit-productPrice').value;
    const editProductBrand = document.getElementById('edit-productBrand').value;

    const editedProductData = {
      name: editProductName,
      quantity: editProductQuantity,
      type: editProductType,
      price: editProductPrice,
      brand: editProductBrand
    };
    console.log('editedProductData: ', editedProductData)
    // Send the edited product data to the API and process the results
    try {
      const updatedProduct = await APIHandler.editProduct(productId, editedProductData);

      // Assuming renderEditProduct is similar to renderNewProduct but for updating the UI with the edited product details.
      // If renderNewProduct can handle both new and updated products, you can call it directly instead.
      ProductView.renderEditProduct(updatedProduct);
    } catch (error) {
      console.error('Error editing product:', error);
    }
    // Optionally, fetch and refresh the list of products.
    try {
      const data = await APIHandler.get('products');
      ProductView.renderProducts(data); // Assuming this method exists to render all products
    } catch (error) {
      console.error('Failed to load products:', error);
    };
    location.reload(); // Or close the modal and update the UI as needed without reloading.
  });
});

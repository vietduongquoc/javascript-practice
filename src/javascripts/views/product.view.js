// export default class ProductView {
//   static currentPage = parseInt(new URLSearchParams(window.location.search).get('page') || '1');
//   static totalPages = 0;
//   static bindClickPagination() {
//     const homepage = document.querySelector('.homepage');
//     homepage.removeEventListener('click', this.handlePagination);
//     homepage.addEventListener('click', this.handlePagination);
//   }
//   static handlePagination(event) {
//     const target = event.target;
//     if (!target.classList.contains('pagination-link')) {
//       return;
//     }
//     const page = target.textContent;
//     ProductModel.get({ page: page })
//       .then(data => {
//         ProductView.renderProducts(data);
//       })
//       .catch(error => console.error('Failed to load products:', error));
//   }

// document.addEventListener('DOMContentLoaded', async function () {
//   const dataLength = await ProductModel.getDataLength();
//   ProductView.totalPages = parseInt(dataLength / 8) + 1;

//   ProductModel.get()
//     .then(data => {
//       ProductView.renderProducts(data);
//     })
//     .catch(error => console.error('Failed to load products:', error));
// });

// addProductModal.addEventListener('submit', async function (event) {
//   event.preventDefault();

//   // Get the values from the form inputs
//   const nameValue = document.getElementById('productName').value;
//   const TypeValue = document.getElementById('productType').value;
//   const QuantityValue = document.getElementById('productQuantity').value;
//   const priceValue = document.getElementById('productPrice').value;
//   const brandValue = document.getElementById('productBrand').value;

//   // Create a product object with the form input values
//   const productInputs = {
//     'Name': nameValue,
//     'Price': priceValue,
//     'Brand': brandValue,
//     'Type': TypeValue,
//     'Quantity': QuantityValue,
//   }

//   const { formError } = validateForm(productInputs);

//   // Generate new error messages based on the validation results
//   generateErrorMessages(formError);

//   // If there are any validation errors, stop the function
//   const isPassed = Object.values(formError).every(value => value === '');
//   if (!isPassed) {
//     return;
//   }

//   const product = {
//     name: nameValue,
//     price: priceValue,
//     brand: brandValue,
//     type: TypeValue,
//     quantity: QuantityValue
//   }
//   let targetPage = 1;
//   // Send a new data product to the API and process the results
//   try {
//     const dataLength = await ProductModel.getDataLength();
//     targetPage = parseInt((dataLength / 8)) + 1;

//     await ProductModel.post('products', product);

//     ProductView.totalPages = parseInt((dataLength / 8)) + 1;

//   } catch (error) {
//     console.error('Error adding product:', error);
//   }

//   // Get the list of new products after adding
//   try {
//     const data = await ProductModel.get({ page: targetPage });
//     addProductModal.classList.toggle('hidden');
//     ProductView.renderProducts(data);
//   } catch (error) {
//     console.error('Failed to load products:', error);
//   };

// });

// document.addEventListener('DOMContentLoaded', function () {
//   const editProductModal = document.getElementById('editProductModal');
//   editProductModal.addEventListener('submit', async function (e) {
//     e.preventDefault();

//     // Assuming you have a way to set and get the currently editing product's ID.
//     const productId = e.target.getAttribute('data-product-id');

//     // console.log(productId)
//     const editProductName = document.getElementById('edit-productName').value;
//     const editProductQuantity = document.getElementById('edit-productQuantity').value;
//     const editProductType = document.getElementById('edit-productType').value;
//     const editProductPrice = document.getElementById('edit-productPrice').value;
//     const editProductBrand = document.getElementById('edit-productBrand').value;

//     const editedProductData = {
//       name: editProductName,
//       quantity: editProductQuantity,
//       type: editProductType,
//       price: editProductPrice,
//       brand: editProductBrand
//     };
//     console.log('editedProductData: ', editedProductData)
//     // Send the edited product data to the API and process the results
//     try {
//       const updatedProduct = await ProductModel.editProduct(productId, editedProductData);

//       // Assuming renderEditProduct is similar to renderNewProduct but for updating the UI with the edited product details.
//       // If renderNewProduct can handle both new and updated products, you can call it directly instead.
//       ProductView.renderEditProduct(updatedProduct);
//     } catch (error) {
//       console.error('Error editing product:', error);
//     }
//     // Optionally, fetch and refresh the list of products.
//     try {
//       const data = await ProductModel.get('products');
//       ProductView.renderProducts(data); // Assuming this method exists to render all products
//     } catch (error) {
//       console.error('Failed to load products:', error);
//     };
//     location.reload(); // Or close the modal and update the UI as needed without reloading.
//   });
// });

import ProductModel from '../models/product.model';
import validateForm from '../../utils/validateProductForm';
import generateErrorMessages from '../../utils/dom';
import renderProductRow from '../templates/product';
import { displayProduct } from '../templates/product';

export default class ProductView {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.tableElement = document.querySelector('.table');
    this.rowElement = document.querySelectorAll('.product-row');
  }

  toggleLoader = () => {
    this.loader.classList.toggle('hidden');
  };

  renderProductsGrid = (products) => {
    if (this.rowElement.length) {
      this.rowElement.forEach(e => e.remove());
    };
  }

  renderProducts(products) {
    return (this.tableElement.innerHTML = displayProduct(products));
  };

  static currentPage = parseInt(new URLSearchParams(window.location.search).get('page') || '1');
  static totalPages = 0;
  bindClickPagination() {
    const homepage = document.querySelector('.homepage');
    homepage.removeEventListener('click', this.handlePagination);
    homepage.addEventListener('click', this.handlePagination);
  };
  handlePagination(event) {
    const target = event.target;
    if (!target.classList.contains('pagination-link')) {
      return;
    }
    const page = target.textContent;
    ProductModel.get({ page: page })
      .then(data => {
        ProductView.renderProducts(data);
      })
      .catch(error => console.error('Failed to load products:', error));
  };

  bindToggleModel() {
    const homePage = document.querySelector('.homepage');
    const addModal = document.getElementById("addProductModal");
    const editModal = document.getElementById("editProductModal");
    const deleteModal = document.getElementById("deleteProductModal");

    homePage.addEventListener('click', async (e) => {
      const target = e.target;

      if (target.id === 'addBtn') {
        addModal.firstElementChild.reset();
        addModal.classList.toggle('hidden');
      }

      const id = target.getAttribute('data-id');
      const menuBox = document.querySelector(`.menu-box[data-id="${id}"]`);
      if (menuBox) {
        menuBox.classList.toggle('hidden');
      }

      if (target.classList.contains('editProductBtn')) {
        const productId = target.getAttribute('data-product-id');
        // Set values for edit modal
        document.getElementById('edit-productName').value = document.getElementById(`product-name-${productId}`).innerText;
        document.getElementById('edit-productQuantity').value = document.getElementById(`product-quantity-${productId}`).innerText;
        document.getElementById('edit-productType').value = document.getElementById(`product-type-${productId}`).innerText;
        document.getElementById('edit-productPrice').value = document.getElementById(`product-price-${productId}`).innerText.substring(1);
        document.getElementById('edit-productBrand').value = document.getElementById(`product-brand-${productId}`).innerText;

        editModal.classList.toggle('hidden');
      }

      if (target.classList.contains('deleteProductBtn')) {
        const productId = target.getAttribute('data-product-id');
        deleteModal.classList.toggle('hidden');
      }
    });

    // Cancel button for add modal
    const btnCancelAdd = document.getElementById("cancelBtnAdd");
    if (btnCancelAdd) {
      btnCancelAdd.addEventListener('click', () => {
        addModal.classList.toggle("hidden");
      });
    }

    // Cancel button for edit modal
    const btnCancelEdit = document.getElementById("cancelBtnEdit");
    if (btnCancelEdit) {
      btnCancelEdit.addEventListener('click', () => {
        editModal.classList.toggle("hidden");
      });
    }

    // Confirm button for edit modal
    const btnConfirmEdit = document.getElementById("confirmBtnEdit");
    if (btnConfirmEdit) {
      btnConfirmEdit.addEventListener('click', async () => {
        // Code to handle edit confirmation
        // await ProductModel.editProduct(productId);
        editModal.classList.toggle("hidden");
        // location.reload();
      });
    }

    // Cancel button for delete modal
    const btnCancelDelete = document.getElementById("cancel-btn-delete");
    if (btnCancelDelete) {
      btnCancelDelete.addEventListener('click', () => {
        deleteModal.classList.toggle("hidden");
      });
    }

    // Confirm button for delete modal
    const btnConfirmDelete = document.getElementById("confirm-btn-delete");
    if (btnConfirmDelete) {
      btnConfirmDelete.addEventListener('click', async () => {
        // Code to handle delete confirmation
        // await ProductModel.deleteProduct(productId);
        deleteModal.classList.toggle("hidden");
        // location.reload();
      });
    }
  }
}










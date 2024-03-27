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
//         ProductView.renderProductss(data);
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


//   static currentPage = parseInt(new URLSearchParams(window.location.search).get('page') || '1');
//   static totalPages = 0;
//   // bindClickPagination() {
//   //   const homepage = document.querySelector('.homepage');
//   //   homepage.removeEventListener('click', this.handlePagination);
//   //   homepage.addEventListener('click', this.handlePagination);
//   // };
//   // handlePagination(event) {
//   //   const target = event.target;
//   //   if (!target.classList.contains('pagination-link')) {
//   //     return;
//   //   }
//   //   const page = target.textContent;
//   //   ProductModel.get({ page: page })
//   //     .then(data => {
//   //       ProductView.renderProducts(data);
//   //     })
//   //     .catch(error => console.error('Failed to load products:', error));
//   // };


import generateErrorMessages from '../../utils/dom';
import { displayProduct, renderNewProduct, renderProductFormPage, displayPagination } from '../templates/product';
import ProductService from '../api.service/product.service';

export default class ProductView {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.tableElement = document.querySelector('.table');
    this.rowElement = document.querySelectorAll('.product-row');
    this.addProductModal = document.getElementById("addProductModal");
  }

  toggleLoader = () => {
    this.loader.classList.toggle('hidden');
  };

  renderProductsGrid = (products) => {
    if (this.rowElement.length) {
      this.rowElement.forEach(e => e.remove());
    };
  };

  renderProducts = (products) => {
    this.tableElement.innerHTML = displayProduct(products);
  };

  showFormErrors = (formError) => {
    const errorMessages = generateErrorMessages(formError);
  }

  bindAddProductModal = (handler) => {
    this.addProductModal.addEventListener('submit', async (event) => {
      const nameValue = document.getElementById('productName').value;
      const TypeValue = document.getElementById('productType').value;
      const QuantityValue = document.getElementById('productQuantity').value;
      const priceValue = document.getElementById('productPrice').value;
      const brandValue = document.getElementById('productBrand').value;
      const productInputs = {
        'Name': nameValue,
        'Price': priceValue,
        'Brand': brandValue,
        'Type': TypeValue,
        'Quantity': QuantityValue,
      };
      await handler(productInputs);
    });

    const addBtn = document.getElementById('addBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.addProductModal.firstElementChild.reset();
        this.addProductModal.classList.toggle('hidden');
      });
    }

    const btnCancelAdd = document.getElementById("cancelBtnAdd");
    if (btnCancelAdd) {
      btnCancelAdd.addEventListener('click', () => {
        this.addProductModal.classList.toggle("hidden");
      });
    }

    const btnConfirmAdd = document.getElementById("confirmBtnAdd");
    if (btnConfirmAdd) {
      btnConfirmAdd.addEventListener('click', async () => {
        const form = this.addProductModal.querySelector('form');
        if (form) {
          form.submit();
        }
      });
    }
  }

  // bindSubmitAddProduct = (handler) => {
  //   this.addProductModal.addEventListener('submit', async (event) => {
  //     event.preventDefault();

  //     const nameValue = document.getElementById('productName').value;
  //     const TypeValue = document.getElementById('productType').value;
  //     const QuantityValue = document.getElementById('productQuantity').value;
  //     const priceValue = document.getElementById('productPrice').value;
  //     const brandValue = document.getElementById('productBrand').value;

  //     const productInputs = {
  //       'Name': nameValue,
  //       'Price': priceValue,
  //       'Brand': brandValue,
  //       'Type': TypeValue,
  //       'Quantity': QuantityValue,
  //     };
  //     const product = {
  //       name: nameValue,
  //       price: priceValue,
  //       brand: brandValue,
  //       type: TypeValue,
  //       quantity: QuantityValue
  //     };
}




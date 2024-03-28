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
import ProductController from '../controllers/product.controller';

export default class ProductView {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.tableElement = document.querySelector('.table');
    this.rowElement = document.querySelectorAll('.product-row');
    this.addProductModal = document.getElementById("addProductModal");
    this.editModal = document.getElementById("editProductModal");
  }

  toggleLoader = () => {
    this.loader.classList.toggle('hidden');
  };

  toggleAddModal = () => this.addProductModal.classList.toggle("hidden");

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

  loadProductList = (data) => {
    const products = data.map(productData => ({
      name: productData.name,
      price: productData.price,
      brand: productData.brand,
      type: productData.type,
      quantity: productData.quantity,
      status: productData.status
    }));
    this.renderProducts(products);
  };

  bindAddProductModal = (handler) => {
    this.addProductModal.addEventListener('submit', async (event) => {
      event.preventDefault();
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
    };
  };

  bindToggleModel = () => {
    const homePage = document.querySelector('.homepage');
    // const editModal = document.getElementById("editProductModal");
    // const deleteModal = document.getElementById("deleteProductModal");
    homePage.addEventListener('click', async (e) => {
      const target = e.target;
      const id = target.getAttribute('data-id');
      const menuBox = document.querySelector(`.menu-box[data-id="${id}"]`);
      if (menuBox) {
        menuBox.classList.toggle('hidden');
      }
      if (target.classList.contains('editProductBtn')) {
        const productId = target.getAttribute('data-product-id');
        //  Set values for edit modal
        document.getElementById('edit-productName').value = document.getElementById(`product-name-${productId}`).innerText;
        document.getElementById('edit-productQuantity').value = document.getElementById(`product-quantity-${productId}`).innerText;
        document.getElementById('edit-productType').value = document.getElementById(`product-type-${productId}`).innerText;
        document.getElementById('edit-productPrice').value = document.getElementById(`product-price-${productId}`).innerText.substring(1);
        document.getElementById('edit-productBrand').value = document.getElementById(`product-brand-${productId}`).innerText;
        document.getElementById('confirmBtnEdit').value = productId;
        this.editModal.classList.toggle('hidden');
      }
      // if (target.classList.contains('deleteProductBtn')) {
      //   const productId = target.getAttribute('data-product-id');
      //   deleteModal.classList.toggle('hidden');
      // }
    });
  };

  toggleEditModal() {
    const editModal = document.getElementById("editProductModal");
    editModal.classList.toggle("hidden");
  }

  bindEditModalEvents = (handlerEditProduct) => {
    const btnCancelEdit = document.getElementById("cancelBtnEdit");
    if (btnCancelEdit) {
      btnCancelEdit.addEventListener('click', () => {
        const editModal = document.getElementById("editProductModal");
        editModal.classList.toggle("hidden");
      });
    }

    const btnConfirmEdit = document.getElementById("confirmBtnEdit");
    if (btnConfirmEdit) {
      btnConfirmEdit.addEventListener('click', async () => {
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

        try {
          const productId = document.getElementById('confirmBtnEdit').value;
          await handlerEditProduct(productId, editedProductData);
        } catch (error) {
          console.error('Error editing product:', error);
        }
      });
    }
  }

  // bindToggleModel = () => {
  //   // const deleteModal = document.getElementById("deleteProductModal");
  //   // // Cancel button for delete modal
  //   // const btnCancelDelete = document.getElementById("cancel-btn-delete");
  //   // if (btnCancelDelete) {
  //   //   btnCancelDelete.addEventListener('click', () => {
  //   //     deleteModal.classList.toggle("hidden");
  //   //   });
  //   // }

  //   // // Confirm button for delete modal
  //   // const btnConfirmDelete = document.getElementById("confirm-btn-delete");
  //   // if (btnConfirmDelete) {
  //   //   btnConfirmDelete.addEventListener('click', async () => {
  //   //     deleteModal.classList.toggle("hidden");
  //   //     // location.reload();
  //   //   });
  //   // }
  // };
}






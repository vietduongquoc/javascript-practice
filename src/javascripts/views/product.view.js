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
import { displayProduct, displayPagination } from '../templates/product';
import ProductService from '../api.service/product.service';
import ProductController from '../controllers/product.controller';

export default class ProductView {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.tableElement = document.querySelector('.table');
    this.rowElement = document.querySelectorAll('.product-row');
    this.addProductModal = document.getElementById("addProductModal");
    this.editModal = document.getElementById("editProductModal");
    this.deleteModal = document.getElementById("deleteProductModal");
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

  toggleAddModal = () => this.addProductModal.classList.toggle("hidden");

  bindAddProductModal = (handler) => {
    this.addProductModal.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameValue = document.getElementById('productName').value;
      const typeValue = document.getElementById('productType').value;
      const quantityValue = document.getElementById('productQuantity').value;
      const priceValue = document.getElementById('productPrice').value;
      const brandValue = document.getElementById('productBrand').value;
      const productInputs = {
        'Name': nameValue,
        'Price': priceValue,
        'Brand': brandValue,
        'Type': typeValue,
        'Quantity': quantityValue,
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

  bindToggleModal = () => {
    const homePage = document.querySelector('.homepage');
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
      if (target.classList.contains('deleteProductBtn')) {
        const productId = target.getAttribute('data-product-id');
        document.getElementById('confirm-btn-delete').value = productId;
        this.deleteModal.classList.toggle('hidden');
      }
    });
  };

  toggleEditModal() {
    const editModal = document.getElementById("editProductModal");
    editModal.classList.toggle("hidden");
  }

  bindEditModalEvents = (handleEditProduct) => {
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
          await handleEditProduct(productId, editedProductData);
        } catch (error) {
          console.error('Error editing product:', error);
        }
      });
    };
  };

  toggleDeleteModal() {
    const deleteModal = document.getElementById("deleteProductModal");
    deleteModal.classList.toggle("hidden");
  }

  bindDeleteModalEvents = (handleConfirmDelete) => {
    // Cancel button for delete modal
    const btnCancelDelete = document.getElementById("cancel-btn-delete");
    if (btnCancelDelete) {
      btnCancelDelete.addEventListener('click', () => {
        this.toggleDeleteModal();
      });
    }
    // Confirm button for delete modal
    const btnConfirmDelete = document.getElementById("confirm-btn-delete");
    if (btnConfirmDelete) {
      btnConfirmDelete.addEventListener('click', async () => {
        const productId = btnConfirmDelete.value // Get the ID of the product to be deleted
        await handleConfirmDelete(productId); // Call the product deletion method from ProductController
      });
    };
  };

  // Cập nhật sự kiện cho các nút edit và delete sau khi render lại sản phẩm
  updateEventListeners = () => {
    this.bindToggleModal();
    this.bindEditModalEvents(ProductController.handleEditProduct);
    this.bindDeleteModalEvents(ProductController.handleConfirmDelete);
  };

  // Xử lý khi người dùng thực hiện edit sản phẩm
  handleEditProduct = async (productId, editedProductData) => {
    try {
      await ProductController.handleEditProduct(productId, editedProductData); // Gọi hàm xử lý edit từ ProductController
      this.toggleEditModal(); // Ẩn modal edit
      this.updateProductList(); // Cập nhật lại danh sách sản phẩm
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  // Xử lý khi người dùng thực hiện delete sản phẩm
  handleDeleteProduct = async (productId) => {
    try {
      await ProductController.handleConfirmDelete(productId); // Gọi hàm xác nhận delete từ ProductController
      this.toggleDeleteModal(); // Ẩn modal delete
      this.updateProductList(); // Cập nhật lại danh sách sản phẩm
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
}






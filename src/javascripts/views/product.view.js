import generateErrorMessages from '../../utils/dom';
import { displayProduct } from '../templates/product';

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
      id: productData.id,
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
      const statusValue = document.getElementById('status-dropdown').value === "true";
      const quantityValue = document.getElementById('productQuantity').value;
      const priceValue = document.getElementById('productPrice').value;
      const brandValue = document.getElementById('productBrand').value;
      const productInputs = {
        'Name': nameValue,
        'Status': statusValue,
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
    document.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.getAttribute('data-id');

      if (target.classList.contains('toggler-btn')) {
        const menuBox = target.nextElementSibling;
        menuBox.classList.toggle('hidden');
      }

      if (target.classList.contains('editProductBtn')) {
        const productId = target.getAttribute('data-product-id');
        this.setEditModalValues(productId);
        this.toggleEditModal();
      }

      if (target.classList.contains('deleteProductBtn')) {
        const productId = target.getAttribute('data-product-id');
        document.getElementById('confirm-btn-delete').value = productId;
        this.toggleDeleteModal();
      }
    });
  };

  // Function to set values for edit modal
  setEditModalValues = (productId) => {
    document.getElementById('edit-productName').value = document.getElementById(`product-name-${productId}`).innerText;
    document.getElementById('edit-productQuantity').value = document.getElementById(`product-quantity-${productId}`).innerText;
    document.getElementById('edit-productType').value = document.getElementById(`product-type-${productId}`).innerText;
    document.getElementById('edit-productPrice').value = document.getElementById(`product-price-${productId}`).innerText.substring(1);
    document.getElementById('edit-productBrand').value = document.getElementById(`product-brand-${productId}`).innerText;
    document.getElementById('confirmBtnEdit').value = productId;
  };

  // Toggle edit modal
  toggleEditModal = () => {
    const editModal = document.getElementById("editProductModal");
    editModal.classList.toggle("hidden");
  };
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
        const productId = btnConfirmEdit.value;
        const editedProductData = {
          name: document.getElementById('edit-productName').value,
          quantity: document.getElementById('edit-productQuantity').value,
          type: document.getElementById('edit-productType').value,
          price: document.getElementById('edit-productPrice').value,
          status: document.getElementById('edit-status-dropdown').value === "true",
          brand: document.getElementById('edit-productBrand').value
        };
        try {
          await handleEditProduct(productId, editedProductData);
        } catch (error) {
          console.error('Error editing product:', error);
        }
      });
    }
  };

  // Toggle delete modal
  toggleDeleteModal = () => {
    const deleteModal = document.getElementById("deleteProductModal");
    deleteModal.classList.toggle("hidden");
  };
  bindDeleteModalEvents = (handleConfirmDelete) => {
    const btnCancelDelete = document.getElementById("cancel-btn-delete");
    if (btnCancelDelete) {
      btnCancelDelete.addEventListener('click', () => {
        this.toggleDeleteModal();
      });
    }
    const btnConfirmDelete = document.getElementById("confirm-btn-delete");
    if (btnConfirmDelete) {
      btnConfirmDelete.addEventListener('click', async () => {
        const productId = btnConfirmDelete.value;
        await handleConfirmDelete(productId);
      });
    }
  };

  bindClickPagination(handlePagination) {
    const homepage = document.querySelector('.homepage');
    homepage.removeEventListener('click', (e) => handlePagination(e));
    homepage.addEventListener('click', (e) => handlePagination(e));
  };

  displayPagination = (currentPage, totalPages) => {
    const paginationElement = document.querySelector('.pagination-container');
    const paginationHTML = `
      ${currentPage === 1 || currentPage === 2 ? '' : `<a href="/?page=${currentPage - 2}" class="pagination-link">${currentPage - 2}</a>`}
      ${currentPage === 1 ? '' : `<a href="/?page=${currentPage - 1}" class="pagination-link">${currentPage - 1}</a>`}
      <a href="/?page=${currentPage}" class="pagination-link current-link">${currentPage}</a>
      ${totalPages > currentPage ? `<a href="/?page=${currentPage + 1}" class="pagination-link">${currentPage + 1}</a>` : ''}
      ${totalPages > currentPage + 1 ? `<a href="/?page=${currentPage + 2}" class="pagination-link">${currentPage + 2}</a>` : ''}
    `;
    paginationElement.innerHTML = paginationHTML;
  };
}






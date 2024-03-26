import ProductService from "../api.service/product.service";
import validateForm from "../../utils/validateProductForm";
import generateErrorMessages from "../../utils/dom";
import ProductModel from "../models/product.model";

export default class ProductController {
  constructor(productModel, productView) {
    this.productModel = productModel;
    this.productView = productView;
    this.addProductModal = document.getElementById("addProductModal");
  }

  init = () => {
    this.renderProducts();
    // this.productView.bindToggleModel();
  }

  renderProducts = async () => {
    this.productView.toggleLoader();
    const data = await ProductService.getPaginatedProducts();
    const products = this.productModel.createList(data);
    this.productView.renderProductsGrid(products);
    this.productView.renderProducts(products);
    this.productView.toggleLoader();
    this.bindAddProductModal();
    // this.productView.bindClickPagination();
  }

  // bindToggleModel = () => {
  //   const homePage = document.querySelector('.homepage');
  //   const addModal = document.getElementById("addProductModal");
  //   // const editModal = document.getElementById("editProductModal");
  //   // const deleteModal = document.getElementById("deleteProductModal");

  //   homePage.addEventListener('click', async (e) => {
  //     const target = e.target;

  //     if (target.id === 'addBtn') {
  //       addModal.firstElementChild.reset();
  //       addModal.classList.toggle('hidden');
  //     }

  //     // const id = target.getAttribute('data-id');
  //     // const menuBox = document.querySelector(`.menu-box[data-id="${id}"]`);
  //     // if (menuBox) {
  //     //   menuBox.classList.toggle('hidden');
  //     // }

  //     // if (target.classList.contains('editProductBtn')) {
  //     //   const productId = target.getAttribute('data-product-id');
  //     //   // Set values for edit modal
  //     //   document.getElementById('edit-productName').value = document.getElementById(`product-name-${productId}`).innerText;
  //     //   document.getElementById('edit-productQuantity').value = document.getElementById(`product-quantity-${productId}`).innerText;
  //     //   document.getElementById('edit-productType').value = document.getElementById(`product-type-${productId}`).innerText;
  //     //   document.getElementById('edit-productPrice').value = document.getElementById(`product-price-${productId}`).innerText.substring(1);
  //     //   document.getElementById('edit-productBrand').value = document.getElementById(`product-brand-${productId}`).innerText;

  //     //   editModal.classList.toggle('hidden');
  //     // }

  //     // if (target.classList.contains('deleteProductBtn')) {
  //     //   const productId = target.getAttribute('data-product-id');
  //     //   deleteModal.classList.toggle('hidden');
  //     // }
  //   });

  //   // Cancel button for add modal
  //   // const btnCancelAdd = document.getElementById("cancelBtnAdd");
  //   // if (btnCancelAdd) {
  //   //   btnCancelAdd.addEventListener('click', () => {
  //   //     addModal.classList.toggle("hidden");
  //   //   });
  //   // }

  //   // const btnConfirmAdd = document.getElementById("confirmBtnAdd");
  //   // if (btnConfirmAdd) {
  //   //   btnConfirmAdd.addEventListener('click', async () => {
  //   //     // const submitEvent = new Event('submit');
  //   //     // this.addProductModal.dispatchEvent(submitEvent);
  //   //   });
  //   // }

  //   // Cancel button for edit modal
  //   // const btnCancelEdit = document.getElementById("cancelBtnEdit");
  //   // if (btnCancelEdit) {
  //   //   btnCancelEdit.addEventListener('click', () => {
  //   //     editModal.classList.toggle("hidden");
  //   //   });
  //   // }

  //   // Confirm button for edit modal
  //   // const btnConfirmEdit = document.getElementById("confirmBtnEdit");
  //   // if (btnConfirmEdit) {
  //   //   btnConfirmEdit.addEventListener('click', async () => {
  //   //     // Code to handle edit confirmation
  //   //     // await ProductModel.editProduct(productId);
  //   //     editModal.classList.toggle("hidden");
  //   //     // location.reload();
  //   //   });
  //   // }

  //   // Cancel button for delete modal
  //   // const btnCancelDelete = document.getElementById("cancel-btn-delete");
  //   // if (btnCancelDelete) {
  //   //   btnCancelDelete.addEventListener('click', () => {
  //   //     deleteModal.classList.toggle("hidden");
  //   //   });
  //   // }

  //   // Confirm button for delete modal
  //   // const btnConfirmDelete = document.getElementById("confirm-btn-delete");
  //   // if (btnConfirmDelete) {
  //   //   btnConfirmDelete.addEventListener('click', async () => {
  //   //     // Code to handle delete confirmation
  //   //     // await ProductModel.deleteProduct(productId);
  //   //     deleteModal.classList.toggle("hidden");
  //   //     // location.reload();
  //   //   });
  //   // }
  // };

  bindAddProductModal = () => {
    const addProductModal = document.getElementById('addProductModal');
    addProductModal.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Get the values from the form inputs
      const nameValue = document.getElementById('productName').value;
      const TypeValue = document.getElementById('productType').value;
      const QuantityValue = document.getElementById('productQuantity').value;
      const priceValue = document.getElementById('productPrice').value;
      const brandValue = document.getElementById('productBrand').value;

      // Create a product object with the form input values
      const productInputs = {
        'Name': nameValue,
        'Price': priceValue,
        'Brand': brandValue,
        'Type': TypeValue,
        'Quantity': QuantityValue,
      };
      const { formError } = validateForm(productInputs);
      // Generate new error messages based on the validation results
      generateErrorMessages(formError);
      // If there are any validation errors, stop the function
      const isPassed = Object.values(formError).every(value => value === '');
      if (!isPassed) {
        return;
      }
      // Create product object
      const product = {
        name: nameValue,
        price: priceValue,
        brand: brandValue,
        type: TypeValue,
        quantity: QuantityValue
      };

      try {
        // Send product data to the server
        await ProductService.post('products', product);

        // Update total pages
        const dataLength = await ProductService.getPaginatedProducts();
        this.productView.totalPages = parseInt((dataLength / 8)) + 1;

        // Render products
        const data = await ProductService.getPaginatedProducts();
        this.addProductModal.classList.toggle('hidden');
        this.productView.renderProducts(data);
      } catch (error) {
        console.error('Failed to add product:', error);
      }
    });
    // Add event for the add button
    const addBtn = document.getElementById('addBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addProductModal.firstElementChild.reset(); // Reset form
        addProductModal.classList.toggle('hidden'); // Open modal
      });
    }
    // Add event for cancel button
    const btnCancelAdd = document.getElementById("cancelBtnAdd");
    if (btnCancelAdd) {
      btnCancelAdd.addEventListener('click', () => {
        addProductModal.classList.toggle("hidden");
      });
    }
    // Add event for confirm button
    const btnConfirmAdd = document.getElementById("confirmBtnAdd");
    if (btnConfirmAdd) {
      btnConfirmAdd.addEventListener('click', async () => {
        const addProductModal = document.getElementById('addProductModal');
        const form = addProductModal.querySelector('form');
        if (form) {
          form.submit();
        }
      });
    }
  };

  // bindClickPagination = () => {
  //   const homepage = document.querySelector('.homepage');
  //   homepage.removeEventListener('click', this.handlePagination);
  //   homepage.addEventListener('click', this.handlePagination);
  // };

  // handlePagination = (event) => {
  //   const target = event.target;
  //   if (!target.classList.contains('pagination-link')) {
  //     return;
  //   }
  //   const page = target.textContent;
  //   ProductService.get({ page: page })
  //     .then(data => {
  //       this.renderNewProduct(data);
  //     })
  //     .catch(error => console.error('Failed to load products:', error));
  // };
}





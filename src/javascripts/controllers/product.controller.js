import ProductService from "../api.service/product.service";
import ProductModel from "../models/product.model";
import ProductView from "../views/product.view";
import ProductEntity from "../models/product.entity";

export default class ProductController {
  constructor(productModel, productView) {
    this.productModel = productModel;
    this.productView = productView;
    // this.addProductModal = document.getElementById("addProductModal");
    // this.bindAddProductModal();
    // this.bindToggleModal();
  }

  init = () => {
    this.renderProducts();
    this.handerEventHandlers();
    // this.productView.bindToggleModel();
  }

  renderProducts = async () => {
    this.productView.toggleLoader();
    const data = await ProductService.getPaginatedProducts();
    const products = this.productModel.createList(data);
    this.productView.renderProductsGrid(products);
    this.productView.renderProducts(products);
    this.productView.toggleLoader();
    // this.productView.bindClickPagination();
  }

  handerEventHandlers = () => {
    this.productView.bindAddProductModal(this.handleAddProductSubmit);
  }

  handleAddProductSubmit = async (productInputs) => {
    const {
      Name: name,
      Type: type,
      Brand: brand,
      Price: price,
      Quantity: quantity
    } = productInputs;

    const data = {
      name,
      type,
      brand,
      price,
      quantity,
      status: true,
    }

    const newProductEntity = new ProductEntity(data);

    const { formError } = this.productModel.validateForm(productInputs);

    const isPassed = Object.values(formError).every(value => value === '');

    if (!isPassed) {
      this.productView.showFormErrors(formError);
      return;
    }
    try {
      // Send product data to the server
      await ProductService.post('products', newProductEntity);
      this.productView.toggleAddModal();
      // Render products
      const data = await ProductService.getPaginatedProducts();
      const products = this.productModel.createList(data);
      this.productView.renderProducts(data);
      // Update total pages
      this.productView.loadProductList(products);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
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





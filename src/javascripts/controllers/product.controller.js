import ProductService from "../api.service/product.service";
import ProductModel from "../models/product.model";

export default class ProductController {
  constructor (productModel, productView) {
    this.productModel = productModel;
    this.productView = productView;
    // this.addProductModal = document.getElementById("addProductModal");
    // this.bindAddProductModal();
    // this.bindToggleModel();
  }

  init = () => {
    this.renderProducts();
    // this.productView.bindToggleModal();
  }

  renderProducts = async () => {
    const data = await ProductService.getPaginatedProducts();
    const products = this.productModel.createList(data);
    this.productView.renderProductsGrid(products);
    this.productView.renderProducts(products);
    this.productView.toggleLoader();
    // this.productView.bindClickPagination();
  }

  // bindToggleModel = () => {
  //   const homePage = document.querySelector('.homepage');
  //   const addModal = document.getElementById("addProductModal");
  //   const editModal = document.getElementById("editProductModal");
  //   const deleteModal = document.getElementById("deleteProductModal");

  //   homePage.addEventListener('click', async (e) => {
  //     const target = e.target;

  //     if (target.id === 'addBtn') {
  //       addModal.firstElementChild.reset();
  //       addModal.classList.toggle('hidden');
  //     }

  //     const id = target.getAttribute('data-id');
  //     const menuBox = document.querySelector(`.menu-box[data-id="${id}"]`);
  //     if (menuBox) {
  //       menuBox.classList.toggle('hidden');
  //     }

  //     if (target.classList.contains('editProductBtn')) {
  //       const productId = target.getAttribute('data-product-id');
  //       // Set values for edit modal
  //       document.getElementById('edit-productName').value = document.getElementById(`product-name-${productId}`).innerText;
  //       document.getElementById('edit-productQuantity').value = document.getElementById(`product-quantity-${productId}`).innerText;
  //       document.getElementById('edit-productType').value = document.getElementById(`product-type-${productId}`).innerText;
  //       document.getElementById('edit-productPrice').value = document.getElementById(`product-price-${productId}`).innerText.substring(1);
  //       document.getElementById('edit-productBrand').value = document.getElementById(`product-brand-${productId}`).innerText;

  //       editModal.classList.toggle('hidden');
  //     }

  //     if (target.classList.contains('deleteProductBtn')) {
  //       const productId = target.getAttribute('data-product-id');
  //       deleteModal.classList.toggle('hidden');
  //     }
  //   });

  //   // Cancel button for add modal
  //   const btnCancelAdd = document.getElementById("cancelBtnAdd");
  //   if (btnCancelAdd) {
  //     btnCancelAdd.addEventListener('click', () => {
  //       addModal.classList.toggle("hidden");
  //     });
  //   }

  //   const btnConfirmAdd = document.getElementById("confirmBtnAdd");
  //   if (btnConfirmAdd) {
  //     btnConfirmAdd.addEventListener('click', async () => {
  //       // Code to handle edit confirmation
  //       // await ProductModel.addProduct(productId);
  //       // addModal.classList.toggle("hidden");
  //       // location.reload();
  //     });
  //   }

  //   // Cancel button for edit modal
  //   const btnCancelEdit = document.getElementById("cancelBtnEdit");
  //   if (btnCancelEdit) {
  //     btnCancelEdit.addEventListener('click', () => {
  //       editModal.classList.toggle("hidden");
  //     });
  //   }

  //   // Confirm button for edit modal
  //   const btnConfirmEdit = document.getElementById("confirmBtnEdit");
  //   if (btnConfirmEdit) {
  //     btnConfirmEdit.addEventListener('click', async () => {
  //       // Code to handle edit confirmation
  //       // await ProductModel.editProduct(productId);
  //       editModal.classList.toggle("hidden");
  //       // location.reload();
  //     });
  //   }

  //   // Cancel button for delete modal
  //   const btnCancelDelete = document.getElementById("cancel-btn-delete");
  //   if (btnCancelDelete) {
  //     btnCancelDelete.addEventListener('click', () => {
  //       deleteModal.classList.toggle("hidden");
  //     });
  //   }

  //   // Confirm button for delete modal
  //   const btnConfirmDelete = document.getElementById("confirm-btn-delete");
  //   if (btnConfirmDelete) {
  //     btnConfirmDelete.addEventListener('click', async () => {
  //       // Code to handle delete confirmation
  //       // await ProductModel.deleteProduct(productId);
  //       deleteModal.classList.toggle("hidden");
  //       // location.reload();
  //     });
  //   }
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

  // bindAddProductModal = () => {
  //   this.addProductModal.addEventListener('submit', async (event) => {
  //     event.preventDefault();

  //     // Get the values from the form inputs
  //     const nameValue = document.getElementById('productName').value;
  //     const TypeValue = document.getElementById('productType').value;
  //     const QuantityValue = document.getElementById('productQuantity').value;
  //     const priceValue = document.getElementById('productPrice').value;
  //     const brandValue = document.getElementById('productBrand').value;

  //     // Create a product object with the form input values
  //     const productInputs = {
  //       'Name': nameValue,
  //       'Price': priceValue,
  //       'Brand': brandValue,
  //       'Type': TypeValue,
  //       'Quantity': QuantityValue,
  //     };

  //     const { formError } = validateForm(productInputs);

  //     // Generate new error messages based on the validation results
  //     generateErrorMessages(formError);

  //     // If there are any validation errors, stop the function
  //     const isPassed = Object.values(formError).every(value => value === '');
  //     if (!isPassed) {
  //       return;
  //     }

  //     const product = {
  //       name: nameValue,
  //       price: priceValue,
  //       brand: brandValue,
  //       type: TypeValue,
  //       quantity: QuantityValue
  //     };

  //     let targetPage = 1;
  //     // Send a new data product to the API and process the results
  //     try {
  //       const dataLength = await ProductService.getProduct();
  //       targetPage = parseInt((dataLength / 8)) + 1;

  //       await ProductService.post('products', product);

  //       // Accessing instance property directly
  //       this.productView.totalPages = parseInt((dataLength / 8)) + 1;

  //     } catch (error) {
  //       console.error('Error adding product:', error);
  //     }

  //     // Get the list of new products after adding
  //     try {
  //       const data = await ProductService.getProduct({ page: targetPage });
  //       this.addProductModal.classList.toggle('hidden');

  //       // Accessing instance method directly
  //       this.productView.renderProducts(data);

  //     } catch (error) {
  //       console.error('Failed to load products:', error);
  //     }
  //   });
  // };
}





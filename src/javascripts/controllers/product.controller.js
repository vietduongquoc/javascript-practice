import ProductService from "../api.service/product.service";
import ProductEntity from "../models/product.entity";

export default class ProductController {
  constructor(productModel, productView) {
    this.productModel = productModel;
    this.productView = productView;
    this.currentPage = parseInt(new URLSearchParams(window.location.search).get('page') || '1');
  }

  init = async () => {
    await this.renderProducts();
    this.handleEventHandlers();
  }

  renderProducts = async () => {
    this.productView.toggleLoader();
    const [data, dataLength] = await Promise.all([
      ProductService.getPaginatedProducts(this.currentPage),
      ProductService.getProductsLength()
    ]);
    const totalPage = parseInt(dataLength / 8) + 1;
    const products = this.productModel.createList(data);
    this.productView.renderProductsGrid(products);
    this.productView.renderProducts(products);
    this.productView.displayPagination(this.currentPage, totalPage);
    this.productView.toggleLoader();
  }

  handleEventHandlers = () => {
    this.productView.bindAddProductModal(this.handleAddProductSubmit);
    this.productView.bindToggleModal();
    this.productView.bindEditModalEvents(this.handleEditProduct);
    this.productView.bindDeleteModalEvents(this.handleConfirmDelete);
    this.productView.bindClickPagination(this.handlePagination);
  }

  handleAddProductSubmit = async (productInputs) => {
    const {
      Id: id,
      Name: name,
      Type: type,
      Brand: brand,
      Price: price,
      Quantity: quantity,
      Status: status
    } = productInputs;

    const data = {
      id,
      name,
      type,
      brand,
      price,
      quantity,
      status
    }

    const newProductEntity = new ProductEntity(data);

    const { formError } = this.productModel.validateForm(productInputs);

    const isPassed = Object.values(formError).every(value => value === '');

    if (!isPassed) {
      this.productView.showFormErrors(formError);
      return;
    }
    try {
      await ProductService.post('products', newProductEntity);
      await this.renderProducts();
    } catch (error) {
      console.error('Failed to add product:', error);
    } finally {
      this.productView.toggleAddModal();
    }
  }

  handleEditProduct = async (productId, editedProductData) => {
    try {
      await ProductService.editProduct(productId, editedProductData);
      await this.renderProducts();
    } catch (error) {
      console.error('Error editing product:', error);
    } finally {
      this.productView.toggleEditModal();
    }
  };

  handleConfirmDelete = async (productId) => {
    try {
      await ProductService.deleteProduct(productId);  // Call the delete method from ProductService
      await this.renderProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      this.productView.toggleDeleteModal();
    }
  };

  handlePagination = async (event) => {
    const target = event.target;
    if (!target.classList.contains('pagination-link')) {
      return;
    }
    event.preventDefault();
    const url = target.getAttribute('href');
    window.history.pushState(null, '', url);
    const page = parseInt(target.textContent);
    this.currentPage = page; // Update current page
    await this.renderProducts();
  };
}





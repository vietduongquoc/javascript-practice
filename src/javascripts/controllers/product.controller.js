import ProductService from "../api.service/product.service";
import ProductModel from "../models/product.model";
import ProductView from "../views/product.view";
import ProductEntity from "../models/product.entity";

export default class ProductController {
  constructor(productModel, productView) {
    this.productModel = productModel;
    this.productView = productView;
  }

  init = () => {
    this.renderProducts();
    this.handeEventHandlers();
  }

  renderProducts = async () => {
    this.productView.toggleLoader();
    const data = await ProductService.getPaginatedProducts();
    const products = this.productModel.createList(data);
    this.productView.renderProductsGrid(products);
    this.productView.renderProducts(products);
    this.productView.toggleLoader();
    this.productView.displayPagination(ProductService.currentPage, ProductService.totalPage)
    this.productView.bindClickPagination(this.handlePagination);
  }

  handeEventHandlers = () => {
    this.productView.bindAddProductModal(this.handleAddProductSubmit);
    this.productView.bindToggleModal();
    this.productView.bindEditModalEvents(this.handleEditProduct);
    this.productView.bindDeleteModalEvents(this.handleConfirmDelete);
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
      this.productView.toggleLoader(); // Display the loading icon when sending a request to add a product
      // Send product data to the server
      await ProductService.post('products', newProductEntity);
      // Render products
      const data = await ProductService.getPaginatedProducts();
      const products = this.productModel.createList(data);
      this.productView.loadProductList(products);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
    finally {
      this.productView.toggleAddModal();
      this.productView.toggleLoader(); // Turn off icon loading after processing is complete
    }
  }

  handleEditProduct = async (productId, editedProductData) => {
    try {
      this.productView.toggleLoader();
      await ProductService.editProduct(productId, editedProductData);
      // Render products
      const data = await ProductService.getPaginatedProducts();
      const products = this.productModel.createList(data);
      this.productView.loadProductList(products);
    } catch (error) {
      console.error('Error editing product:', error);
      throw error;
    } finally {
      this.productView.toggleEditModal();
      this.productView.toggleLoader();
    };
  };

  handleConfirmDelete = async (productId) => {
    try {
      this.productView.toggleLoader();
      await ProductService.deleteProduct(productId); // Call the delete method from ProductService
      const data = await ProductService.getPaginatedProducts(); // Refresh the product list after deletion
      const products = this.productModel.createList(data);
      this.productView.loadProductList(products);  // Update the product list in the view
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    finally {
      this.productView.toggleDeleteModal();
      this.productView.toggleLoader(); // Turn off icon loading after processing is complete
    };
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
    const products = await ProductService.getPaginatedProducts(page);
    // const products = this.productModel.createList(data);
    this.productView.loadProductList(products);
  };
}





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
    this.handerEventHandlers();
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
    this.productView.bindAddProductModal(this.handlerAddProductSubmit);
    this.productView.bindToggleModel();
    this.productView.bindEditModalEvents(this.handlerEditProduct);
  }

  handlerAddProductSubmit = async (productInputs) => {
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
      this.productView.toggleLoader(); // Display the loading icon when sending a request to add a product
      // Send product data to the server
      await ProductService.post('products', newProductEntity);
      this.productView.toggleAddModal();
      // Render products
      const data = await ProductService.getPaginatedProducts();
      const products = this.productModel.createList(data);
      this.productView.loadProductList(products);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
    finally {
      this.productView.toggleLoader(); // Turn off icon loading after processing is complete
    }
  }

  handlerEditProduct = async (productId, editedProductData) => {
    try {
      this.productView.toggleLoader();
      const updatedProduct = await ProductService.editProduct(productId, editedProductData);
      // Render products
      const data = await ProductService.getPaginatedProducts();
      const products = this.productModel.createList(data);
      this.productView.loadProductList(products);
      return updatedProduct;
    } catch (error) {
      console.error('Error editing product:', error);
      throw error;
    } finally {
      this.productView.toggleEditModal();
      this.productView.toggleLoader();
    }
  }

  // bindToggleModel = () => {
  //   const homePage = document.querySelector('.homepage');
  //   const addModal = document.getElementById("addProductModal");
  //   // const editModal = document.getElementById("editProductModal");
  //   // const deleteModal = document.getElementById("deleteProductModal");
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





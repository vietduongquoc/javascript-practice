import ProductService from "../api.service/product.service";

export default class ProductController {
  constructor (productModel, productView) {
    this.productModel = productModel;
    this.productView = productView;
  }

  init = () => {
    this.renderProducts();
    this.productView.bindToggleModel();
  }

  renderProducts = async () => {
    this.productView.toggleLoader();
    const data = await ProductService.getProduct();
    const products = this.productModel.createList(data);
    this.productView.renderProductsGrid(products);
    this.productView.renderProducts(products);
    this.productView.toggleLoader();
    this.productView.bindClickPagination();
    this.productView.handlePagination();
  }

}





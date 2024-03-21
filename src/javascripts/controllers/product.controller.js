// import ProductView from "../views/product.view";
// import ProductModel from "../models/product.model";

// // Get the button that opens the modal
// const btn = document.getElementById("addBtn");
// const homePage = document.querySelector('.homepage');
// const modal = document.getElementById("addProductModal");
// const disableButton = document.getElementById("prev-button");
// const disableButtonNext = document.getElementById("next-button");

// homePage.addEventListener('click', async (e) => {
//   const target = e.target;

//   if (target.id === 'addBtn') {
//     modal.firstElementChild.reset();
//     modal.classList.toggle('hidden');
//   } else if (target.classList.contains('pagination-link')) {
//     const url = target.getAttribute('href');
//     e.preventDefault();
//     window.history.pushState(null, '', url);
//     const page = target.textContent;
//     ProductView.currentPage = parseInt(page);

//     // Disable buttons while loading data
//     if (disableButton) {
//       disableButton.disabled = true;
//     }
//     if (disableButtonNext) {
//       disableButtonNext.disabled = true;
//     }

//     try {
//       const data = await ProductModel.get();
//       ProductView.renderProducts(data);
//     } catch (error) {
//       console.error('Failed to load products:', error);
//     } finally {
//       // Re-enable buttons after loading data
//       if (disableButton) {
//         disableButton.disabled = false;
//       }
//       if (disableButtonNext) {
//         disableButtonNext.disabled = false;
//       }
//     }
//   }
// });

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
    const data = await ProductService.getAll();
    const products = this.productModel.createList(data);
    this.productView.renderProductsGrid(products);
    this.productView.renderProducts(products);
    this.productView.toggleLoader();
  }

}





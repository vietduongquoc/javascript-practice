import ProductController from "./controllers/product.controller";
import ProductModel from "./models/product.model";
import ProductView from "./views/product.view"

// new ProductController(new ProductModel(), new ProductView());


const homePage = document.querySelector('.homepage');
// Get the button that opens the modal
const btn = document.getElementById("addBtn");

homePage.addEventListener('click', (e) => {
  const target = e.target;
  const modal = document.getElementById("addProductModal");
  if (target.id === 'addBtn' || target.id === "add-close") {
    modal.firstElementChild.reset();
    modal.classList.toggle('hidden');
  }
  else if (target.classList.contains('pagination-link')) {
    const url = target.getAttribute('href');
    e.preventDefault();
    window.history.pushState(null, '', url);
    const page = target.textContent;
    ProductView.currentPage = parseInt(page);

    ProductModel.get()
      .then(data => {
        ProductView.renderProducts(data);
      })
      .catch(error => console.error('Failed to load products:', error));
  }
});



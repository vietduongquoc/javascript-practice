import ProductView from './views/product-view';
import { APIHandler } from './controllers/product.controller';
import { API } from './constants/url-api';

// Get the modal
const modal = document.getElementById("addProductModal");
// Get the button that opens the modal
const btn = document.getElementById("addBtn");
// Get the <span> element that closes the modal
const span = document.getElementById("add-close");
// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.classList.toggle("hidden");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.classList.toggle("hidden");
}

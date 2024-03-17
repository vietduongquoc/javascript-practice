import ProductView from './views/product.view';
import { APIHandler } from './controllers/product.controller';
import { API } from './constants/url-api';


// import ProductController from "./controllers/product.controller";
// import ProductModel from "./models/product.model";
// import ProductView from "./views/product.view";

// new ProductController(new ProductModel(), new ProductView());





const homePage = document.querySelector('.homepage');
// Get the modal

// Get the button that opens the modal
const btn = document.getElementById("addBtn");
// Get the <span> element that closes the modal
// When the user clicks the button, open the modal

homePage.addEventListener('click', (e) => {
  const target = e.target;
  const modal = document.getElementById("addProductModal");

  if (target.id === 'addBtn' || target.id === "add-close") {
    modal.classList.toggle('hidden');
  }
});



document.addEventListener('DOMContentLoaded', function () {
  APIHandler.get({ page: '1' })
    .then(data => {
      ProductView.renderProducts(data);
    })
    .catch(error => console.error('Failed to load products:', error));
});

addProductModal.addEventListener('submit', async function (event) {
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
  }

  const { formError } = validateForm(productInputs);

  // Generate new error messages based on the validation results
  generateErrorMessages(formError);

  // If there are any validation errors, stop the function
  const isPassed = Object.values(formError).every(value => value === '');
  if (!isPassed) {
    return;
  }

  const product = {
    name: nameValue,
    price: priceValue,
    brand: brandValue,
    type: TypeValue,
    quantity: QuantityValue
  }

  // Send a new data product to the API and process the results
  try {
    const products = await APIHandler.post('products', product);

    ProductView.renderNewProduct(products)
  } catch (error) {
    console.error('Error adding product:', error);
  }

  // Get the list of new products after adding
  try {
    const data = await APIHandler.get('products');
    console.log(data);
  } catch (error) {
    console.error('Failed to load products:', error);
  };
  location.reload()
});

document.addEventListener('DOMContentLoaded', function () {
  const editProductModal = document.getElementById('editProductModal');
  editProductModal.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Assuming you have a way to set and get the currently editing product's ID.
    const productId = e.target.getAttribute('data-product-id');

    // console.log(productId)
    const editProductName = document.getElementById('edit-productName').value;
    const editProductQuantity = document.getElementById('edit-productQuantity').value;
    const editProductType = document.getElementById('edit-productType').value;
    const editProductPrice = document.getElementById('edit-productPrice').value;
    const editProductBrand = document.getElementById('edit-productBrand').value;

    const editedProductData = {
      name: editProductName,
      quantity: editProductQuantity,
      type: editProductType,
      price: editProductPrice,
      brand: editProductBrand
    };
    console.log('editedProductData: ', editedProductData)
    // Send the edited product data to the API and process the results
    try {
      const updatedProduct = await APIHandler.editProduct(productId, editedProductData);

      // Assuming renderEditProduct is similar to renderNewProduct but for updating the UI with the edited product details.
      // If renderNewProduct can handle both new and updated products, you can call it directly instead.
      ProductView.renderEditProduct(updatedProduct);
    } catch (error) {
      console.error('Error editing product:', error);
    }
    // Optionally, fetch and refresh the list of products.
    try {
      const data = await APIHandler.get('products');
      ProductView.renderProducts(data); // Assuming this method exists to render all products
    } catch (error) {
      console.error('Failed to load products:', error);
    };
    location.reload(); // Or close the modal and update the UI as needed without reloading.
  });
});




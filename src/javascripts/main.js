import ProductView from './views/product-view';
import { APIHandler } from './controllers/product.controller';



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

//ADD-btns
let btnCancel = document.getElementById("cancelBtnAdd");

if (btnCancel) {
  btnCancel.addEventListener('click', function () {
    let modal = document.querySelector('.add-modal');
    if (modal) {
      modal.classList.toggle("hidden");
    }
  });
}
let btnCfAdd = document.getElementById("confirmBtnAdd");

if (btnCfAdd) {
  btnCfAdd.addEventListener('click', function () {
    let modal = document.querySelector('.add-modal');
    if (modal) {
      modal.classList.toggle("hidden");
    }
  });
};

//Edit-btns
let btnEditCancel = document.getElementById("cancelBtnEdit");

if (btnEditCancel) {
  btnEditCancel.addEventListener('click', function () {
    let modal = document.querySelector('.edit-modal');
    if (modal) {
      modal.classList.toggle("hidden");
    }
  });
}

let btnCfEdit = document.getElementById("confirmBtnEdit");

if (btnCfEdit) {
  btnCfEdit.addEventListener('click', function () {
    let modal = document.querySelector('.edit-modal');
    if (modal) {
      modal.classList.toggle("hidden");
    }
  });
};


document.addEventListener('DOMContentLoaded', function () {
  APIHandler.get('products')
    .then(data => {
      ProductView.renderProducts(data);
    })
    .catch(error => console.error('Failed to load products:', error));
});

document.addEventListener('DOMContentLoaded', function () {
  const addProductModal = document.getElementById('addProductModal');

  addProductModal.addEventListener('submit', async function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productType = document.getElementById('productType').value;
    const productPrice = document.getElementById('productPrice').value;
    const productstatusdropdown = document.getElementById('status-dropdown').value;
    const productBrand = document.getElementById('productBrand').value;

    const productData = {
      name: productName,
      quantity: productQuantity,
      type: productType,
      price: productPrice,
      status: productstatusdropdown,
      brand: productBrand
    };

    // Send a new data product to the API and process the results
    try {
      const product = await APIHandler.post('products', productData);

      ProductView.renderNewProduct(product)
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
    // location.reload()
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const editProductModal = document.getElementById('editProductModal');
  editProductModal.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Assuming you have a way to set and get the currently editing product's ID.
    const productId = e.target.getAttribute('data-product-id');

    console.log(productId)
    const editProductName = document.getElementById('edit-productName').value;
    const editProductQuantity = document.getElementById('edit-productQuantity').value;
    const editProductType = document.getElementById('edit-productType').value;
    const editProductPrice = document.getElementById('edit-productPrice').value;
    const editProductStatusDropdown = document.getElementById('edit-status-dropdown').value;
    const eidtProductBrand = document.getElementById('edit-productBrand').value;

    const editedProductData = {
      name: editProductName,
      quantity: editProductQuantity,
      type: editProductType,
      price: editProductPrice,
      status: editProductStatusDropdown === 'Available',
      brand: eidtProductBrand
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

    // location.reload(); // Or close the modal and update the UI as needed without reloading.
  });
});

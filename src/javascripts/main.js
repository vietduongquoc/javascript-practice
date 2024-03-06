import ProductView from './views/product-view';
import { APIHandler } from './models/product.model';
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
    const productPrice = document.getElementById('productPrice').value;
    const productstatusdropdown = document.getElementById('status-dropdown').value;
    const productBrand = document.getElementById('productBrand').value;

    const productData = {
      name: productName,
      quantity: productQuantity,
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
    location.reload()
  });
});

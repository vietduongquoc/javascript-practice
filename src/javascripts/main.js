import ProductView from './views/product-view';

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

/* Edit modal**/

// Get the necessary elements for the edit modal
const editModal = document.getElementById("editProductModal");
const editBtns = document.getElementsByClassName("editProductBtn"); //Get all the buttons
const editSpan = document.getElementById("edit-close");

for (let i = 0; i < editBtns.length; i++) {
  editBtns[i].onclick = function () {
    editModal.classList.toggle("hidden");
  }
}

editSpan.onclick = function () {
  editModal.classList.toggle("hidden");
}

/* Delete modal */

// Get the elements needed for the delete method
const deleteModal = document.getElementById("deleteProductModal");
const deleteBtns = document.getElementsByClassName("deleteProductBtn");
const deleteSpan = document.getElementById("delete-close");

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].onclick = function () {
    deleteModal.classList.toggle("hidden");
  }
}
// When the user clicks on <span> (x), close the modal
deleteSpan.onclick = function () {
  deleteModal.classList.toggle("hidden");
}

/* Error modal */
// Get the necessary elements for the error modal
// const errorModal = document.getElementById("errorModal");
// const errorBtn = document.getElementById("errorActionBtn");
// const errorSpan = document.getElementById("error-close");

// errorBtn.onclick = function () {
//   errorModal.style.display = "block";
// }
// When the user clicks on <span> (x), close the error modal
// errorSpan.onclick = function () {
//   errorModal.style.display = "none";
// }

//Get all toggle-btn and assign them to variables togglerBtns
let togglerBtns = document.querySelectorAll(".toggler-btn");
// Loop through each toggler and add a click event
togglerBtns.forEach(function (togglerBtn) {
  togglerBtn.onclick = function () {
    const id = togglerBtn.id;
    var menuBox = document.querySelector(`[data-id="${id}"]`);
    menuBox.classList.toggle("hidden")
  };
});

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
}



import { APIHandler } from './APIs/api';

document.addEventListener('DOMContentLoaded', function () {
  APIHandler.get('products')
    .then(data => {
      console.log(data);
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

      ProductView.renderNewProducts(product)
    } catch (error) {
      console.error('Error adding product:', error);
    }

    // Get the list of new products after adding
    try {
      const data = await APIHandler.get('products');
      console.log(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  });
});

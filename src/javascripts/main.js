import  ProductView from './views/product-view';
import { APIHandler } from './APIs/api';


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

// //Get all toggle-btn and assign them to variables togglerBtns
// let togglerBtns = document.querySelectorAll(".toggler-btn");
// // Loop through each toggler and add a click event
// togglerBtns.forEach(function (togglerBtn) {
//   togglerBtn.onclick = function () {
//     const id = togglerBtn.id;
//     var menuBox = document.querySelector(`[data-id="${id}"]`);
//     menuBox.classList.toggle("hidden")
//   };
// });

// /* Edit modal**/
// // Get the necessary elements for the edit modal
// const editModal = document.getElementById("editProductModal");
// const editBtns = document.getElementsByClassName("editProductBtn"); //Get all the buttons
// const editSpan = document.getElementById("edit-close");

// for (let i = 0; i < editBtns.length; i++) {
//   editBtns[i].onclick = function () {
//     editModal.classList.toggle("hidden");
//   }
// }

// editSpan.onclick = function () {
//   editModal.classList.toggle("hidden");
// }

// /* Delete modal */

// // Get the elements needed for the delete method
// const deleteModal = document.getElementById("deleteProductModal");
// const deleteBtns = document.getElementsByClassName("deleteProductBtn");
// const deleteSpan = document.getElementById("delete-close");

// for (let i = 0; i < deleteBtns.length; i++) {
//   deleteBtns[i].onclick = function () {
//     deleteModal.classList.toggle("hidden");
//   }
// }
// // When the user clicks on <span> (x), close the modal
// deleteSpan.onclick = function () {
//   deleteModal.classList.toggle("hidden");
// }

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
//Delete-btns
let btnDeleteCancel = document.getElementById("cancel-btn-delete");

if (btnDeleteCancel) {
  btnDeleteCancel.addEventListener('click', function () {
    let modal = document.querySelector('.delete-modal');
    if (modal) {
      modal.classList.toggle("hidden");
    }
  });
}

let btnCfDelete = document.getElementById("confirm-btn-delete");

if (btnCfDelete) {
  btnCfDelete.addEventListener('click', function async () {
    // await APIHandler.deleteProduct(productId);
    console.log('btnCfDelete')
    let modal = document.querySelector('.delete-modal');
    if (modal) {
      modal.classList.toggle("hidden");
    }

  });
}


import { APIHandler } from './APIs/api';

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
    };

  });
});

// document.addEventListener('DOMContentLoaded', function () {
//   const editProductModal = document.getElementById('editProductModal');

//   editProductModal.addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const editproductName = document.getElementById('edit-productName').value;
//     const editproductQuantity = document.getElementById('edit-productQuantity').value;
//     const editproductPrice = document.getElementById('edit-productPrice').value;
//     const editproductstatusdropdown = document.getElementById('edit-status-dropdown').value;
//     const editproductBrand = document.getElementById('edit-productBrand').value;

//     const editproductData = {
//       name: editproductName,
//       quantity: editproductQuantity,
//       price: editproductPrice,
//       status: editproductstatusdropdown,
//       brand: editproductBrand,
//     };

//     // Send a new data product to the API and process the results
//     try {
//       const editproduct = await APIHandler.put('products', editproductData);

//       ProductView.renderNewProducts(editproduct)
//     } catch (error) {
//       console.error('Error when editing product:', error);
//     }

//     // Get the list of new products after adding
//     try {
//       const data = await APIHandler.get('products');
//       console.log(data);
//     } catch (error) {
//       console.error('Failed to load products:', error);
//     };

//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  // Load and render products
  APIHandler.get()
    .then(data => {
      ProductView.renderProducts(data);
    })
    .catch(error => console.error('Failed to load products:', error));

  // Setup delete product event listener
  document.addEventListener('click', async function (e) {
    if (e.target && e.target.classList.contains('deleteProductBtn')) {
      e.preventDefault();
      const productId = e.target.getAttribute('data-product-id');
      if (!productId) return;
      console.log({productId})

      try {
        // Call the API to delete the product
        await APIHandler.deleteProduct(productId);

        console.log(`Product ${productId} deleted`);

        // Re-fetch and render the product list to reflect changes
        const updatedProducts = await APIHandler.get('products');
        ProductView.renderProducts(updatedProducts);
      } catch (error) {
        console.error(`Error deleting product ${productId}:`, error);
      }
    }
  });
});






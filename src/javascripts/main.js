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
// let btnCfAdd = document.getElementById("confirmBtnAdd");

// if (btnCfAdd) {
//   btnCfAdd.addEventListener('click', function () {
//     let modal = document.querySelector('.add-modal');
//     if (modal) {
//       modal.classList.toggle("hidden");
//     }
//   });
// };

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
console.log(1)
document.addEventListener('DOMContentLoaded', function () {
  const addProductModal = document.getElementById('addProductModal');

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

        return event.stopPropagation();
      }

      const product = {
        name: nameValue,
        price: priceValue,
        brand: brandValue,
        type: TypeValue,
        quantity: QuantityValue
      }

      switch (this.action) {
        case ACTION.ADD: {
          const { isSuccess } = await this.APIHandler.add(product);

          if (!isSuccess) {
            return Toast.error(ADD_PRODUCT_FAILED_MSG);
          }

          Toast.success(ADD_PRODUCT_SUCCESS_MSG);

          return handleRoute({ href: '/' });

        }
        case ACTION.EDIT: {
          const { params } = findRoute(window.location.pathname);

          const { isSuccess } = await this.service.editById(params.id, product);

          if (!isSuccess) {
            return Toast.error(UPDATE_ITEM_FAILED_MSG);
          }

          Toast.success(UPDATE_ITEM_SUCCESS_MSG);

        }
      }

      this.displayProductFormPage();
  });
});

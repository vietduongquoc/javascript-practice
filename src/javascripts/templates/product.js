// import iconAction from '../../assets/images/icon-action.png';
// export const displayProduct = (products) => {
//   let contentProduct = `
//       <tr>
//         <th>Product</th>
//         <th>Status</th>
//         <th>Type</th>
//         <th>Quantity</th>
//         <th>Brand</th>
//         <th>Price</th>
//         <th>Action</th>
//       </tr>`;
//   if (products.length > 0) {
//     products.forEach((item) => {
//       contentProduct += productTemplate(item);
//     });
//   }
//   return contentProduct;
// };
// export const productTemplate = (product) => {
//   const { id, name, type, brand, price, quantity, status } = product;
//   const btnStatus = status ? 'btn-true' : 'btn-false';
//   const textStatus = status ? 'Available' : 'Sold out';
//   return `
//       <tr class="product-row">
//         <td id="product-name-${id}"><span>${name}</span></td>
//         <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
//         <td id="product-type-${id}">${type}</td>
//         <td id="product-quantity-${id}">${quantity}</td>
//         <td id="product-brand-${id}">${brand}</td>
//         <td id="product-price-${id}">$${price}</td>
//         <td>
//           <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
//           <div class="hidden menu-box" data-id="${id}">
//             <button class="editProductBtn" data-product-id="${id}">Edit</button>
//             <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
//           </div>
//         </td>
//       </tr>
//     `;
// }

// // export const renderNewProduct = (product) => {
// //       const tableElement = document.querySelector('.table');
// //       const { id, name, type, brand, price, quantity, status } = product;
// //       const btnStatus = status ? 'btn-true' : 'btn-false';
// //       const textStatus = status ? 'Available' : 'Sold out';
// //       const productListHTML = `
// //         <tr>
// //           <td class="wrap-name"><span>${name}</span></td>
// //           <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
// //           <td>${type}</td>
// //           <td>${quantity}</td>
// //           <td>${brand}</td>
// //           <td>$${price}</td>
// //           <td>
// //               <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
// //               <div class="hidden menu-box" data-id="${id}">
// //                 <button class="editProductBtn" data-product-id="${id}">Edit</button>
// //                 <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
// //               </div>
// //           </td>
// //         </tr>
// //       `;
// //       tableElement.innerHTML += productListHTML;
// //       // Call setupToggleEvent again to ensure the setup event for the new product
// //       this.setupToggleEvent(id);
// //     }
// export const renderNewProduct = (product) => {
//   // console.log(product);
//   const tableElement = document.querySelector('.table');
//   const { id, name, type, brand, price, quantity, status } = product;
//   const btnStatus = status ? 'btn-true' : 'btn-false';
//   const textStatus = status ? 'Available' : 'Sold out';
//   const productListHTML = `
//     <tr>
//       <td class="wrap-name"><span>${name}</span></td>
//       <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
//       <td>${type}</td>
//       <td>${quantity}</td>
//       <td>${brand}</td>
//       <td>$${price}</td>
//       <td>
//           <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
//           <div class="hidden menu-box" data-id="${id}">
//             <button class="editProductBtn" data-product-id="${id}">Edit</button>
//             <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
//           </div>
//       </td>
//     </tr>
//   `;
//   tableElement.insertAdjacentHTML('beforeend', productListHTML);
//   setupToggleEvent(id);
// }
// // if (!rowElement.length) {
// //   const paginationElement = document.querySelector('.pagination-container');
// //   // console.log(this.currentPage, this.totalPages)
// //   const paginationHTML = `
// //               <div id="prev-button" aria-label="Previous page" title="Previous page">
// //               &lt;
// //               </div>
// //               ${this.currentPage === 1 || this.currentPage === 2 ? '' : `<a href="/?page=${this.currentPage - 2}" class="pagination-link">${this.currentPage - 2}</a>`}
// //               ${this.currentPage === 1 ? '' : `<a href="/?page=${this.currentPage - 1}" class="pagination-link">${this.currentPage - 1}</a>`}
// //               <a href="/?page=${this.currentPage}" class="pagination-link">${this.currentPage}</a>
// //               ${this.totalPages > this.currentPage ? `<a href="/?page=${this.currentPage + 1}" class="pagination-link">${this.currentPage + 1}</a>` : ''}
// //               ${this.totalPages > this.currentPage + 1 ? `<a href="/?page=${this.currentPage + 2}" class="pagination-link">${this.currentPage + 2}</a>` : ''}
// //               <div id="next-button" aria-label="Next page" title="Next page">
// //                   &gt;
// //               </div>
// //             `;
// //   paginationElement.innerHTML += paginationHTML;
// // }


// export const renderProductFormPage = (data = {}) => {
//   const {
//     ADD_PRODUCT_HEADING,
//     EDIT_PRODUCT_HEADING
//   } = MESSAGES;
//   const headingPage = Object.keys(data).length === 0 ? ADD_PRODUCT_HEADING : EDIT_PRODUCT_HEADING;
//   // Destructure with default values to handle new product case (data = {})
//   const {
//     id = '', // Default to an empty string if id is not present
//     name = '',
//     price = '',
//     quantity = '',
//     brand = '',
//     type = ''
//   } = data;
//   // It's getElementById, not getElementById, and should be called on document
//   const tableContent = document.getElementById('table-content');
//   // Check if the id attribute should be included
//   const productIdAttribute = id ? `data-product-id="${id}"` : '';

//   tableContent.innerHTML = `
//       <div id="addProductModal" class="add-modal hidden">
//         <form class="container modal-content" action="javascript:void(0)" ${productIdAttribute} id="product-form">
//           <span id="add-close">&times;</span>
//           <h3 class="modal-title">${headingPage}</h3>
//           <label for="productName" class="modal-dcrs">Name</label>
//           <input value="${name}" data-field="Name" class="input" type="text" id="productName" placeholder="Enter name...">
//           <p data-field-error="Name" class="error-message" id="name-error"></p>

//           <label for="productType" class="modal-dcrs">Type</label>
//           <input value="${type}" data-field="Type" class="input" type="text" id="productType" placeholder="Enter type...">
//           <p data-field-error="Type" class="error-message" id="type-error"></p>

//           <label for="productQuantity" class="modal-dcrs">Quantity</label>
//           <input value="${quantity}" data-field="Quantity" class="input" type="number" id="productQuantity" placeholder="0">
//           <p data-field-error="Quantity" class="error-message" id="quantity-error"></p>

//           <label for="productPrice" class="modal-dcrs">Price</label>
//           <input value="${price}" data-field="Price" class="input" type="number" id="productPrice" placeholder="0">
//           <p data-field-error="Price" class="error-message" id="price-error"></p>

//           <label for="productBrand" class="modal-dcrs">Brand</label>
//           <input value="${brand}" data-field="Brand" class="input" type="text" id="productBrand" placeholder="Enter Brand">
//           <p data-field-error="Brand" class="error-message" id="brand-error"></p>

//           <!-- The select for "Status" seems to be static and not tied to the product data. Adjust if needed. -->

//           <div class="button-add-modal">
//             <button id="cancelBtnAdd" class="modal-dcrs btn-form-cancel" type="reset">Cancel</button>
//             <button id="confirmBtnAdd" class="modal-dcrs-btn btn-form-confirm" type="submit">Confirm</button>
//           </div>
//         </form>
//       </div>
//     `;
//   // Assuming this.setupToggleEvent sets up the necessary event listeners
//   // You might want to check or implement this method to ensure it behaves as expected.
//   this.setupToggleEvent(); // Removed id as it doesn't seem necessary for setting up a toggle event based on provided context
// }

// export const renderEditProduct = (productId) => {
//   const { id, name, type, brand, price, quantity, status } = productId;
//   const btnStatus = status ? 'btn-true' : 'btn-false';
//   const textStatus = status ? 'Available' : 'Sold out';
//   const newItemHTML = `
//         <td class="wrap-name"><span>${name}</span></td>
//         <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
//         <td>${type}</td>
//         <td>${quantity}</td>
//         <td>${brand}</td>
//         <td>$${price}</td>
//         <td>
//             <img class="toggler-btn" src="/icon-action.07809a11.png" alt="icons-action" data-id="${id}">
//             <div class="hidden menu-box" data-id="${id}">
//               <button class="editProductBtn" data-product-id="${id}">Edit</button>
//               <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
//             </div>
//         </td>
//     `;
//   const productRow = document.querySelector(`tr[data-id="${id}"]`);
//   if (productRow) {
//     productRow.innerHTML = newItemHTML;
//   }
//   this.setupToggleEvent(id);
// }


import iconAction from '../../assets/images/icon-action.png';

export const displayProduct = (products) => {
  let contentProduct = `
      <tr>
        <th>Product</th>
        <th>Status</th>
        <th>Type</th>
        <th>Quantity</th>
        <th>Brand</th>
        <th>Price</th>
        <th>Action</th>
      </tr>`;
  if (products.length > 0) {
    products.forEach((item) => {
      contentProduct += productTemplate(item);
    });
  }
  return contentProduct;
};

export const productTemplate = (product) => {
  const { id, name, type, brand, price, quantity, status } = product;
  const btnStatus = status ? 'btn-true' : 'btn-false';
  const textStatus = status ? 'Available' : 'Sold out';
  return `
      <tr class="product-row" data-id="${id}">
        <td id="product-name-${id}"><span>${name}</span></td>
        <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
        <td id="product-type-${id}">${type}</td>
        <td id="product-quantity-${id}">${quantity}</td>
        <td id="product-brand-${id}">${brand}</td>
        <td id="product-price-${id}">$${price}</td>
        <td>
          <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
          <div class="hidden menu-box" data-id="${id}">
            <button class="editProductBtn" data-product-id="${id}">Edit</button>
            <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
          </div>
        </td>
      </tr>
    `;
};

// export const displayPagination = (currentPage, totalPages) => {
//   const paginationElement = document.querySelector('.pagination-container');
//   const paginationHTML = `
//     <div id="prev-button" aria-label="Previous page" title="Previous page">
//       &lt;
//     </div>
//     ${currentPage === 1 || currentPage === 2 ? '' : `<a href="/?page=${currentPage - 2}" class="pagination-link">${currentPage - 2}</a>`}
//     ${currentPage === 1 ? '' : `<a href="/?page=${currentPage - 1}" class="pagination-link">${currentPage - 1}</a>`}
//     <a href="/?page=${currentPage}" class="pagination-link">${currentPage}</a>
//     ${totalPages > currentPage ? `<a href="/?page=${currentPage + 1}" class="pagination-link">${currentPage + 1}</a>` : ''}
//     ${totalPages > currentPage + 1 ? `<a href="/?page=${currentPage + 2}" class="pagination-link">${currentPage + 2}</a>` : ''}
//     <div id="next-button" aria-label="Next page" title="Next page">
//       &gt;
//     </div>
//   `;
//   paginationElement.innerHTML = paginationHTML;
// };

// export const bindClickPagination = () => {
//   const homepage = document.querySelector('.homepage');
//   homepage.removeEventListener('click', handlePagination);
//   homepage.addEventListener('click', handlePagination);
// };

// const handlePagination = (event) => {
//   const target = event.target;
//   if (!target.classList.contains('pagination-link')) {
//     return;
//   }
//   const page = target.textContent;
//   ProductModel.get({ page: page })
//     .then(data => {
//       ProductView.renderProducts(data);
//     })
//     .catch(error => console.error('Failed to load products:', error));
// };

export const renderNewProduct = (product) => {
  const tableElement = document.querySelector('.table');
  const { id, name, type, brand, price, quantity, status } = product;
  const btnStatus = status ? 'btn-true' : 'btn-false';
  const textStatus = status ? 'Available' : 'Sold out';
  const productListHTML = `
    <tr>
      <td class="wrap-name"><span>${name}</span></td>
      <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
      <td>${type}</td>
      <td>${quantity}</td>
      <td>${brand}</td>
      <td>$${price}</td>
      <td>
          <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
          <div class="hidden menu-box" data-id="${id}">
            <button class="editProductBtn" data-product-id="${id}">Edit</button>
            <button data-product-id="${id}" class="deleteProductBtn">Delete</button>
          </div>
      </td>
    </tr>
  `;
  tableElement.insertAdjacentHTML('beforeend', productListHTML);
  setupToggleEvent(id);
};

export const renderProductFormPage = (data = {}) => {
  const { ADD_PRODUCT_HEADING, EDIT_PRODUCT_HEADING } = MESSAGES;
  const headingPage = Object.keys(data).length === 0 ? ADD_PRODUCT_HEADING : EDIT_PRODUCT_HEADING;
  const { id = '', name = '', price = '', quantity = '', brand = '', type = '' } = data;
  const tableContent = document.getElementById('table-content');
  const productIdAttribute = id ? `data-product-id="${id}"` : '';

  tableContent.innerHTML = `
      <div id="addProductModal" class="add-modal hidden">
        <form class="container modal-content" action="javascript:void(0)" ${productIdAttribute} id="product-form">
          <span id="add-close">&times;</span>
          <h3 class="modal-title">${headingPage}</h3>
          <label for="productName" class="modal-dcrs">Name</label>
          <input value="${name}" data-field="Name" class="input" type="text" id="productName" placeholder="Enter name...">
          <p data-field-error="Name" class="error-message" id="name-error"></p>

          <label for="productType" class="modal-dcrs">Type</label>
          <input value="${type}" data-field="Type" class="input" type="text" id="productType" placeholder="Enter type...">
          <p data-field-error="Type" class="error-message" id="type-error"></p>

          <label for="productQuantity" class="modal-dcrs">Quantity</label>
          <input value="${quantity}" data-field="Quantity" class="input" type="number" id="productQuantity" placeholder="0">
          <p data-field-error="Quantity" class="error-message" id="quantity-error"></p>

          <label for="productPrice" class="modal-dcrs">Price</label>
          <input value="${price}" data-field="Price" class="input" type="number" id="productPrice" placeholder="0">
          <p data-field-error="Price" class="error-message" id="price-error"></p>

          <label for="productBrand" class="modal-dcrs">Brand</label>
          <input value="${brand}" data-field="Brand" class="input" type="text" id="productBrand" placeholder="Enter Brand">
          <p data-field-error="Brand" class="error-message" id="brand-error"></p>

          <div class="button-add-modal">
            <button id="cancelBtnAdd" class="modal-dcrs btn-form-cancel" type="reset">Cancel</button>
            <button id="confirmBtnAdd" class="modal-dcrs-btn btn-form-confirm" type="submit">Confirm</button>
          </div>
        </form>
      </div>
    `;

  // Assume setupToggleEvent sets up the necessary event listeners
  setupToggleEvent();
};

// export const renderEditProduct = (product) => {
//   const { id, name, type, brand, price, quantity, status } = product;
//   const btnStatus = status ? 'btn-true' : 'btn-false';
//   const textStatus = status ? 'Available' : 'Sold out';

//   const productRow = document.querySelector(`tr[data-id="${id}"]`);
//   if (productRow) {
//     productRow.innerHTML = `
//       <td class="wrap-name"><span>${name}</span></td>
//       <td><button class="btn btn-status text-status ${btnStatus}">${textStatus}</button></td>
//       <td>${type}</td>
//       <td>${quantity}</td>
//       <td>${brand}</td>
//       <td>$${price}</td>
//       <td>
//         <img class="toggler-btn" src="${iconAction}" alt="icons-action" data-id="${id}">
//         <div class="hidden menu-box" data-id="${id}">
//         <button class="editProductBtn" data-product-id="${id}">Edit</button>
//         <button class="deleteProductBtn" data-product-id="${id}">Delete</button>
//         </div>
//         </td>`;
//   }
//   setupToggleEvent(id);
// };



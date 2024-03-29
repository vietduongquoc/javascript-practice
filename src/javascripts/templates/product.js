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




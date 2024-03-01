// Định nghĩa cơ sở URL cho API
const BASE_URL = 'http://localhost:3000';


// Hàm để xử lý lấy danh sách sản phẩm
async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET', // Sử dụng phương thức GET
      headers: {
        'Authorization': `Bearer ${API_KEY}` // Đây là header xác thực, nếu API yêu cầu.
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json(); // Chuyển đổi dữ liệu nhận được từ server thành định dạng JSON.
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


// Hàm thêm sản phẩm mới
async function addProduct(productData) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      throw new Error('Something went wrong with adding a new product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

// Hàm cập nhật sản phẩm
// async function updateProduct(productId, updateData) {
//   try {
//     const response = await fetch(`${BASE_URL}/products/${productId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//       },
//       body: JSON.stringify(updateData)
//     });
//     if (!response.ok) {
//       throw new Error('Something went wrong with updating the product');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error updating product:', error);
//     throw error;
//   }
// }

// Hàm xóa sản phẩm
// async function deleteProduct(productId) {
//   try {
//     const response = await fetch(`${BASE_URL}/products/${productId}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${API_KEY}`
//       }
//     });
//     if (!response.ok) {
//       throw new Error('Something went wrong with deleting the product');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     throw error;
//   }
// }

// Xuất các hàm để sử dụng ở nơi khác trong dự án
export { fetchProducts, addProduct, updateProduct, deleteProduct };

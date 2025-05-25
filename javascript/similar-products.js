document.addEventListener('DOMContentLoaded', () => {
  console.log('similar-products.js loaded');
  console.log('productId:', window.productId);

  // Kiểm tra productId
  if (!window.productId) {
    console.error('productId không được định nghĩa trong HTML');
    const similarProductsContainer = document.querySelector('.col-md-4 .border.rounded.p-3.bg-white');
    if (similarProductsContainer) {
      similarProductsContainer.innerHTML = '<h5>Sản phẩm tương tự</h5><p class="text-muted">Không có sản phẩm tương tự.</p>';
    }
    return;
  }

  // Danh sách sản phẩm
  const products = [
    {
      id: 'chi-tiet-dam-vay1',
      name: 'Đầm Hoa Vintage Dự Tiệc',
      link: 'chi-tiet-dam-vay1.html?id=chi-tiet-dam-vay1',
      image: '../picture/dam-vay-picture/dam1(1).png',
      price_new: '399.000 VNĐ',
      price_old: '599.000 VNĐ',
      category: 'Đầm',
    },
    {
      id: 'chi-tiet-dam-vay2',
      name: 'Đầm Tiểu Thư Trễ Vai Xoè Tầng',
      link: 'chi-tiet-dam-vay2.html?id=chi-tiet-dam-vay2',
      image: '../picture/dam-vay-picture/dam2(3).png',
      price_new: '299.000 VNĐ',
      price_old: '400.000 VNĐ',
      category: 'Đầm',
    },
    {
      id: 'chi-tiet-dam-vay3',
      name: 'Set Váy Nữ Gồm Áo Thun Nơ Cổ + Chân Váy Xếp Ly Viền Đen',
      link: 'chi-tiet-dam-vay3.html?id=chi-tiet-dam-vay3',
      image: '../picture/dam-vay-picture/dam3(3).png',
      price_new: '99.000 VNĐ',
      price_old: '199.000 VNĐ',
      category: 'Đầm',
    },
    {
      id: 'chi-tiet-dam-vay4',
      name: 'Váy Đi Biển Trễ Vai',
      link: 'chi-tiet-dam-vay4.html?id=chi-tiet-dam-vay4',
      image: '../picture/dam-vay-picture/dam4(1).png',
      price_new: '136.000 VNĐ',
      price_old: '241.000 VNĐ',
      category: 'Váy',
    },
    {
      id: 'chi-tiet-dam-vay5',
      name: 'Đầm Thư Sinh Hàn Quốc',
      link: 'chi-tiet-dam-vay5.html?id=chi-tiet-dam-vay5',
      image: '../picture/dam-vay-picture/dam5(1).png',
      price_new: '199.000 VNĐ',
      price_old: '299.000 VNĐ',
      category: 'Đầm',
    },
    {
      id: 'chi-tiet-dam-vay6',
      name: 'Đầm Xòe Dự Tiệc',
      link: 'chi-tiet-dam-vay6.html?id=chi-tiet-dam-vay6',
      image: '../picture/dam-vay-picture/dam6(1).png',
      price_new: '399.000 VNĐ',
      price_old: '599.000 VNĐ',
      category: 'Đầm',
    },
    {
      id: 'chi-tiet-dam-vay7',
      name: 'Đầm Xòe Cổ Vuông',
      link: 'chi-tiet-dam-vay7.html?id=chi-tiet-dam-vay7',
      image: '../picture/dam-vay-picture/dam7(1).png',
      price_new: '299.000 VNĐ',
      price_old: '399.000 VNĐ',
      category: 'Đầm',
    },
    {
      id: 'chi-tiet-dam-vay8',
      name: 'Váy Đầm Dự Tiệc Đỏ Sang Trọng',
      link: 'chi-tiet-dam-vay8.html?id=chi-tiet-dam-vay8',
      image: '../picture/dam-vay-picture/dam8(1).png',
      price_new: '399.000 VNĐ',
      price_old: '599.000 VNĐ',
      category: 'Váy',
    },
    {
      id: 'chi-tiet-dam-vay9',
      name: 'Đầm Xòe Cổ Vuông',
      link: 'chi-tiet-dam-vay9.html?id=chi-tiet-dam-vay9',
      image: '../picture/dam-vay-picture/dam9(1).png',
      price_new: '556.000 VNĐ',
      price_old: '695.000 VNĐ',
      category: 'Đầm',      
    }
  ];

  const currentProductId = window.productId;
  const currentProduct = products.find((p) => p.id === currentProductId);
  console.log('Current Product:', currentProduct);

  // Xử lý trường hợp không tìm thấy sản phẩm
  const similarProductsContainer = document.querySelector('.col-md-4 .border.rounded.p-3.bg-white');
  console.log('Container:', similarProductsContainer);
  if (!currentProduct || !similarProductsContainer) {
    if (similarProductsContainer) {
      similarProductsContainer.innerHTML = '<h5>Sản phẩm tương tự</h5><p class="text-muted">Không có sản phẩm tương tự.</p>';
    }
    console.error('Không tìm thấy sản phẩm hoặc container');
    return;
  }

  // Lọc sản phẩm
  const sameCategoryProducts = products.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProductId
  );
  const otherProducts = products.filter((p) => p.id !== currentProductId);
  console.log('Same Category Products:', sameCategoryProducts);
  console.log('Other Products:', otherProducts);

  const selectedProducts = [];
  const maxSuggestions = 2;

  // Hàm chọn ngẫu nhiên
  const pickRandomProduct = (arr) => {
    if (arr.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * arr.length);
    const product = arr[randomIndex];
    arr.splice(randomIndex, 1);
    return product;
  };

  // Chọn sản phẩm cùng danh mục
  while (selectedProducts.length < maxSuggestions && sameCategoryProducts.length > 0) {
    const product = pickRandomProduct(sameCategoryProducts);
    if (product) selectedProducts.push(product);
  }

  // Chọn sản phẩm khác nếu chưa đủ
  while (selectedProducts.length < maxSuggestions && otherProducts.length > 0) {
    const product = pickRandomProduct(otherProducts);
    if (product && !selectedProducts.includes(product)) {
      selectedProducts.push(product);
    }
  }

  console.log('Selected Products:', selectedProducts);

  // Hiển thị sản phẩm tương tự
  if (selectedProducts.length === 0) {
    similarProductsContainer.innerHTML = '<h5>Sản phẩm tương tự</h5><p class="text-muted">Không có sản phẩm tương tự.</p>';
  } else {
    const similarProductsHtml = selectedProducts
      .map(
        (product) => `
        <div class="d-flex gap-2 mb-2 align-items-center">
          <div><a href="${product.link}"><img src="${product.image}" width="60" alt="${product.name}" style="object-fit: cover;"></a></div>
          <div>
            <p class="mb-0" style="font-size: 14px; line-height: 1.2;">${product.name}</p>
            <small class="price-new text-danger">${product.price_new}</small>
            <small class="orginal_price" style="color: gray; text-decoration: line-through; font-size: 12px;">${product.price_old}</small>
          </div>
        </div>
      `
      )
      .join('');

    console.log('HTML to render:', similarProductsHtml);
    similarProductsContainer.innerHTML = `
      <h5 class="mb-3">Sản phẩm tương tự</h5>
      ${similarProductsHtml}
    `;
  }
});
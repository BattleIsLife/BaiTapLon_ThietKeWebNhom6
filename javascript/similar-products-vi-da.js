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
  // Danh sách sản phẩm và logic đề xuất sản phẩm tương tự
    const products = [
      {
        id: 'vi-nam-ong-dia-da-bo',
        name: 'Ví nam Ông Địa da bò',
        link: 'vi-nam-ong-dia-da-bo.html?id=vi-nam-ong-dia-da-bo',
        image: '../../picture/space/vida9.webp',
        price_new: '139.000 VNĐ',
        price_old: '150.000 VNĐ',
        category: 'Ví da',
      },

      {
        id: 'vi-da-bo-sap-in-hinh-3d',
        name: 'Ví da bò sáp in hình 3D',
        link: 'vi-da-bo-sap-in-hinh-3d.html?id=vi-da-bo-sap-in-hinh-3d',
        image: '../../picture/space/vida6.webp',
        price_new: '155.000 VNĐ',
        price_old: '200.000 VNĐ',
        category: 'Ví da',
      },

      {
        id: 'vi-da-nam-longdo-leather-b03',
        name: 'Ví da nam Longdo Leather B03',
        link: 'vi-da-nam-longdo-leather-b03.html?id=vi-da-nam-longdo-leather-b03',
        image: '../../picture/space/vida7.webp',
        price_new: '65.000 VNĐ',
        price_old: '69.000 VNĐ',
        category: 'Ví da',
      },

      {
        id: 'vi-da-nam-fuerdanni-leather',
        name: 'Ví da nam Fuerdanni Leather',
        link: 'vi-da-nam-fuerdanni-leather.html?id=vi-da-nam-fuerdanni-leather',
        image: '../../picture/space/vida1.webp',
        price_new: '54.000 VNĐ',
        price_old: '99.000 VNĐ',
        category: 'Ví da',
      },
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
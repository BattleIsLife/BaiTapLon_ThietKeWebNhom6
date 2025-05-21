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
                id: 'ca-vat-hocsinh',
                name: 'Cà vạt học sinh',
                link: 'ca-vat-hocsinh?id=ca-vat-hocsinh',
                image: '../../picture/space/cavat1.webp',
                price_new: '10.000 VNĐ',
                price_old: '30.000 VNĐ',
                category: 'cà vạt',
            },

            {
                id: 'chi-tiet-sanpham2',
                name: 'Cà vạt tiết sọc caro',
                link: 'chi-tiet-sanpham2.html?id=chi-tiet-sanpham2',
                image: '../../picture/space/cavat2.webp',
                price_new: '15.000 VNĐ',
                price_old: '20.000 VNĐ',
                category: 'cà vạt',
            },
            {
                id: 'chi-tiet-sanpham3',
                name: 'Cà vạt EFAN',
                link: 'chi-tiet-sanpham3.html?id=chi-tiet-sanpham3',
                image: '../../picture/space/cavat3.webp',
                price_new: '53.100 VNĐ',
                price_old: '100.100 VNĐ',
                category: 'cà vạt',
            },
            {
                id: 'chi-tiet-sanpham4',
                name: 'Cà vạt công sở',
                link: 'chi-tiet-sanpham4.html?id=chi-tiet-sanpham4',
                image: '../../picture/space/cavat4.webp',
                price_new: '39.000 VNĐ',
                price_old: '65.000 VNĐ',
                category: 'cà vạt',
            },
            {
                id: 'chi-tiet-sanpham5',
                name: 'Cà vạt Chổi Cưới',
                link: 'chi-tiet-sanpham5.html?id=chi-tiet-sanpham5',
                image: '../../picture/space/cavat5.webp',
                price_new: '15.000 VNĐ',
                price_old: '19.000 VNĐ',
                category: 'cà vạt',
            },
            {
                id: 'chi-tiet-sanpham6',
                name: 'Cà vạt Có khoá',
                link: 'chi-tiet-sanpham6.html?id=chi-tiet-sanpham6',
                image: '../../picture/space/cavat6.webp',
                price_new: '8.700 VNĐ',
                price_old: '15.000 VNĐ',
                category: 'cà vạt',
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
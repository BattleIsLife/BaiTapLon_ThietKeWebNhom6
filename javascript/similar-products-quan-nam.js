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
        id: 'quan-tay-side-tab-mau-den-nam',
        name: 'Quần Tây Sidetab Gắn Dây 3 Sọc Form Slimfit QT065 Màu Đen',
        link: 'quan-tay-side-tab-mau-den-nam.html?id=quan-tay-side-tab-mau-den-nam',
        image: '../picture/clothes/quan/quan-tay-sidetab-gan-day-3-soc-form-slimfit-qt065-mau-den-truoc.jpg',
        price_new: '297.500 VNĐ',
        price_old: '425.000 VNĐ',
        category: 'Quần nam',
      },

      {
        id: 'quan-tay-sidetab-2-ben-form',
        name: 'Quần Tây Sidetab 2 Bên Form Regular QT068 Màu Trắng Kem',
        link: 'quan-tay-sidetab-2-ben-form.html?id=quan-tay-sidetab-2-ben-form',
        image: '../picture/clothes/quan/quan-tay-sidetab-2-ben-form-front.jpg',
        price_new: '332.000 VNĐ',
        price_old: '475.000 VNĐ',
        category: 'Quần nam',
      },

      {
        id: 'quan-jogger',
        name: 'Quần Jogger Kaki Lưng Thun Túi Hộp Form Regular',
        link: 'quan-jogger.html?id=quan-jogger',
        image: '../picture/clothes/quan/quan-jogger.jpg',
        price_new: '199.000 VNĐ',
        price_old: '399.000 VNĐ',
        category: 'Quần nam',
      },

      {
        id: 'quan-short',
        name: 'Quần short nam',
        link: 'quan-short.html?id=quan-short',
        image: '../picture/clothes/quan/quan-short.jpg',
        price_new: '249.000 VNĐ',
        price_old: '379.000 VNĐ',
        category: 'Quần nam',
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
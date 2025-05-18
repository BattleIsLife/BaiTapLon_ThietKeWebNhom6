document.addEventListener('DOMContentLoaded', () => {
  // Lấy ID sản phẩm hiện tại từ tên file HTML
  const currentProductId = window.location.pathname.split('/').pop().replace('.html', '');

  // Tìm sản phẩm hiện tại
  const currentProduct = products.find((p) => p.id === currentProductId);
  if (!currentProduct) return;

  // Lọc sản phẩm cùng danh mục (trừ sản phẩm hiện tại)
  const sameCategoryProducts = products.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProductId
  );

  // Lọc tất cả sản phẩm khác (trừ sản phẩm hiện tại)
  const otherProducts = products.filter((p) => p.id !== currentProductId);

  // Chọn 2 sản phẩm ngẫu nhiên
  const selectedProducts = [];
  const maxSuggestions = 2;

  // Ưu tiên sản phẩm cùng danh mục
  while (
    selectedProducts.length < maxSuggestions &&
    sameCategoryProducts.length > 0
  ) {
    const randomIndex = Math.floor(Math.random() * sameCategoryProducts.length);
    selectedProducts.push(sameCategoryProducts[randomIndex]);
    sameCategoryProducts.splice(randomIndex, 1); // Xóa để tránh trùng
  }

  // Nếu thiếu, bổ sung từ các sản phẩm khác
  while (
    selectedProducts.length < maxSuggestions &&
    otherProducts.length > 0
  ) {
    const randomIndex = Math.floor(Math.random() * otherProducts.length);
    const product = otherProducts[randomIndex];
    if (!selectedProducts.includes(product)) {
      selectedProducts.push(product);
    }
    otherProducts.splice(randomIndex, 1);
  }

  // Cập nhật giao diện
  const similarProductsContainer = document.querySelector(
    '.col-md-4 .border.rounded.p-3.bg-white'
  );
  const similarProductsHtml = selectedProducts
    .map(
      (product) => `
      <div class="d-flex gap-2 mb-2">
        <div><a href="${product.link}"><img class="logo" src="${product.image}" width="60"></a></div>
        <div>
          <p class="mb-0">${product.name}</p>
          <small class="price-new">${product.price_new}</small>
          <small class="orginal_price" style="color: gray; text-decoration: line-through; font-size: small;">${product.price_old}</small>
        </div>
      </div>
    `
    )
    .join('');

  similarProductsContainer.innerHTML = `
    <h5>Sản phẩm tương tự</h5>
    ${similarProductsHtml}
  `;
});
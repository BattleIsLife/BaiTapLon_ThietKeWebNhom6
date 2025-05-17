document.addEventListener('DOMContentLoaded', () => {
  // Lấy ID sản phẩm từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  if (!productId) return;

  const reviewsKey = `reviews_${productId}`; // Khóa LocalStorage riêng cho sản phẩm
  const reviewsContainer = document.getElementById('reviews-container');
  const reviewForm = document.getElementById('review-form');

  // Hàm hiển thị sao
  const renderStars = (rating) => {
    const star = '★';
    const emptyStar = '☆';
    return star.repeat(rating) + emptyStar.repeat(5 - rating);
  };

  // Hàm hiển thị đánh giá
  const displayReviews = () => {
    const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
    reviewsContainer.innerHTML = '';

    if (reviews.length === 0) {
      reviewsContainer.innerHTML = '<p class="text-muted">Chưa có đánh giá nào cho sản phẩm này.</p>';
      return;
    }

    reviews.forEach((review) => {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review-item mb-3 p-3 border rounded';
      reviewElement.innerHTML = `
        <div class="d-flex justify-content-between">
          <div>
            <strong>${review.name}</strong>
            <div class="text-warning">${renderStars(review.rating)}</div>
          </div>
          <small class="text-muted">${review.date}</small>
        </div>
        <p class="mt-2 mb-0">${review.comment}</p>
      `;
      reviewsContainer.appendChild(reviewElement);
    });
  };

  // Xử lý gửi đánh giá
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('reviewer-name').value.trim();
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value.trim();

    if (!name || !rating || !comment) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const review = {
      name,
      rating: parseInt(rating),
      comment,
      date: new Date().toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
    reviews.unshift(review);
    localStorage.setItem(reviewsKey, JSON.stringify(reviews));

    reviewForm.reset();
    displayReviews();
  });

  displayReviews();
});
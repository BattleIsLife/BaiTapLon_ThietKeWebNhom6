document.addEventListener('DOMContentLoaded', () => {
  const productId = 'dam3'; // Adjust for other products
  const storageKey = `reviews_${productId}`;

  loadReviews();

  document.getElementById('review-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const reviewerName = document.getElementById('reviewer-name').value.trim();
    const rating = parseInt(document.getElementById('rating').value);
    const comment = document.getElementById('comment').value.trim();

    if (!reviewerName || !rating || !comment) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const review = {
      id: Date.now(),
      name: reviewerName,
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    saveReview(review);
    addReviewToPage(review);
    event.target.reset();
    alert('Cảm ơn bạn đã gửi đánh giá!');
  });

  function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
    reviews.push(review);
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }

  function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
    reviews.sort((a, b) => b.id - a.id);
    reviews.forEach(review => addReviewToPage(review));
  }

  function addReviewToPage(review) {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    const reviewHeader = document.createElement('div');
    reviewHeader.className = 'review-header';
    const reviewerName = document.createElement('span');
    reviewerName.className = 'reviewer-name';
    reviewerName.textContent = review.name;
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'rating';
    const stars = '★★★★★'.slice(0, review.rating) + '☆☆☆☆☆'.slice(review.rating);
    ratingDiv.innerHTML = stars.split('').map(star => `<span class="star">${star}</span>`).join('');
    reviewHeader.appendChild(reviewerName);
    reviewHeader.appendChild(ratingDiv);
    const comment = document.createElement('p');
    comment.className = 'review-comment';
    comment.textContent = review.comment;
    const date = document.createElement('span');
    date.className = 'review-date';
    date.textContent = review.date;
    reviewCard.appendChild(reviewHeader);
    reviewCard.appendChild(comment);
    reviewCard.appendChild(date);
    reviewsContainer.insertBefore(reviewCard, reviewsContainer.firstChild);
  }
});
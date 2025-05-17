document.addEventListener('DOMContentLoaded', () => {
  // Product-specific localStorage key (e.g., 'reviews_dam3' for this product)
  const productId = 'dam3'; // Adjust based on your product identifier
  const storageKey = `reviews_${productId}`;

  // Load existing reviews from localStorage
  loadReviews();

  // Handle form submission
  document.getElementById('review-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page refresh

    // Get form values
    const reviewerName = document.getElementById('reviewer-name').value.trim();
    const rating = parseInt(document.getElementById('rating').value);
    const comment = document.getElementById('comment').value.trim();

    // Validate input
    if (!reviewerName || !comment) {
      alert('Vui lòng điền đầy đủ tên và bình luận.');
      return;
    }

    // Create review object
    const review = {
      id: Date.now(), // Unique ID based on timestamp
      name: reviewerName,
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    // Save review to localStorage
    saveReview(review);

    // Add review to the page
    addReviewToPage(review);

    // Clear form
    event.target.reset();

    // Show success message
    alert('Cảm ơn bạn đã gửi đánh giá!');
  });

  function saveReview(review) {
    // Get existing reviews or initialize empty array
    let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
    reviews.push(review);
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }

  function loadReviews() {
    // Get reviews from localStorage
    let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
    // Sort reviews by date (newest first)
    reviews.sort((a, b) => b.id - a.id);
    // Add each review to the page
    reviews.forEach(review => addReviewToPage(review));
  }

  function addReviewToPage(review) {
    const reviewsContainer = document.getElementById('reviews-container');
    
    // Create review card
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    
    // Create review header
    const reviewHeader = document.createElement('div');
    reviewHeader.className = 'review-header';
    
    // Reviewer name
    const reviewerName = document.createElement('span');
    reviewerName.className = 'reviewer-name';
    reviewerName.textContent = review.name;
    
    // Rating stars
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'rating';
    const stars = '★★★★★'.slice(0, review.rating) + '☆☆☆☆☆'.slice(review.rating);
    ratingDiv.innerHTML = stars.split('').map(star => `<span class="star">${star}</span>`).join('');
    
    // Append header elements
    reviewHeader.appendChild(reviewerName);
    reviewHeader.appendChild(ratingDiv);
    
    // Review comment
    const comment = document.createElement('p');
    comment.className = 'review-comment';
    comment.textContent = review.comment;
    
    // Review date
    const date = document.createElement('span');
    date.className = 'review-date';
    date.textContent = review.date;
    
    // Append all elements to review card
    reviewCard.appendChild(reviewHeader);
    reviewCard.appendChild(comment);
    reviewCard.appendChild(date);
    
    // Prepend review to container (newest first)
    reviewsContainer.insertBefore(reviewCard, reviewsContainer.firstChild);
  }
});
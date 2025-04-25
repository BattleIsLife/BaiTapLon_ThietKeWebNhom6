// Mở menu
function menuOnClick() {
    document.getElementById("menu_dropdown").classList.toggle("show");
}

document.getElementById("menu_button").addEventListener("click", function(event) {
    event.stopPropagation(); // Ngăn chặn sự kiện lan lên window
    menuOnClick();
});

// Đóng menu khi click sang chỗ khác
window.onclick = function(event) {
    if(event.target.matches('.dropdown_content'))
        return;
    if(!event.target.matches('.dropBtn'))
    {
        var dropdown = document.getElementsByClassName("dropdown_content");
        for (var index = 0; index < dropdown.length; index++) {
            var openDropDown = dropdown[index];
            if(openDropDown.classList.contains('show'))
                openDropDown.classList.remove('show');
        }
    }
}
//hiển thị ảnh khi click vào
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    modalImg.src = imageSrc;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
  // Hiển thị loader khi click vào các link (ngoại trừ link dạng # hoặc javascript)
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
        document.getElementById('page-loader').style.display = 'flex';
      }
    });
  });

  // Ẩn loader sau khi trang đã tải xong
  window.addEventListener('load', () => {
    document.getElementById('page-loader').style.display = 'none';
  });
  /*back to top*/
  const backToTop = document.getElementById("backToTop");

  // Ẩn ban đầu
  backToTop.style.display = "none";

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // hiển thị form khi click vào apply now
  function openForm(jobTitle) {
    document.getElementById('applyModal').style.display = 'flex';
    document.getElementById('jobTitle').textContent = jobTitle;
  }

  function closeForm() {
    document.getElementById('applyModal').style.display = 'none';
  }
  //hiện thị nút hỗ trợ ở góc màn
  const toggleBtn = document.getElementById('toggleMenu');
  const closeBtn = document.getElementById('closeMenu');
  const menu = document.getElementById('menuItems');

  toggleBtn.addEventListener('click', () => {
    menu.style.display = 'flex';
    toggleBtn.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => {
    menu.style.display = 'none';
    toggleBtn.style.display = 'block';
  });
// hiệu ứng chuyển ảnh
let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
    });
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 3000);
  
  window.onload = () => {
    showSlide(currentSlide);
  };

// hiệu ứng click
  document.addEventListener('click', function(e) {
    const icons = ["❤️", "⭐", "🌟", "✨", "💫"];
    const icon = document.createElement("div");
    icon.className = "icon-float";
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = e.pageX + "px";
    icon.style.top = e.pageY + "px";
    document.body.appendChild(icon);

    setTimeout(() => {
      icon.remove();
    }, 1000); // xóa sau 1s
  });

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
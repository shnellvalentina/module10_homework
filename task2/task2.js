const screensizeBtn = document.getElementById("btn_screensize");

screensizeBtn.addEventListener("click", function() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    alert(`Screen size: ${screenWidth} x ${screenHeight}`);
});


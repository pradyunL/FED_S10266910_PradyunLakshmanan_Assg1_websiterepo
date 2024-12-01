// Slideshow part

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (slides.length === 0 || dots.length === 0) {
    console.error("Slides or dots not found!");
    return;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length)
    {
        slideIndex = 1
    }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3200);
}

//Hamburger Menu

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const hamburgerDropdown = document.querySelector(".hamburger-dropdown");

  if (hamburgerIcon && hamburgerDropdown) {
    hamburgerIcon.addEventListener("click", () => {
      hamburgerDropdown.classList.toggle("active");
    });
  }

  document.addEventListener("click", (event) => {
    if (
      !hamburgerDropdown.contains(event.target) &&
      event.target !== hamburgerIcon
    ) {
      hamburgerDropdown.classList.remove("active");
    }
  });
});

  

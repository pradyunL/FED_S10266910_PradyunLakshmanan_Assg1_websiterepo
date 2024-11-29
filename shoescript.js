//dropdown section
document.querySelectorAll('.dropbtn').forEach((button) => {
    button.addEventListener('click', () => {
      const dropdownContent = button.nextElementSibling;
  
      document.querySelectorAll('.dropdown-content').forEach((content) => {
        if (content !== dropdownContent) {
          content.classList.remove('active');
        }
      });
  
      dropdownContent.classList.toggle('active');
    });
  });
  
// Filter part

class Shoe {
    constructor(name, price, gender, sport, size, image) {
      this.name = name;
      this.price = price;
      this.gender = gender;
      this.sport = sport;
      this.size = size;
      this.image = image;
}}

const shoes = [
new Shoe("Bar 1", 120, "Men", "Basketball", "US10", "cross-x-main-image.jpeg"),
new Shoe("Cronaldo Aces", 140, "Men", "Football", "US9", "cross-x-main-image.jpeg"),
new Shoe("Gym Junkie", 80, "Women", "Gym", "US10", "https://via.placeholder.com/200"),
new Shoe("John 2", 110, "Women", "Tennis", "US9", "https://via.placeholder.com/200"),
new Shoe("Track Sprinter", 130, "Men", "Track", "US11", "https://via.placeholder.com/200"),
new Shoe("LeFrog 1s", 150, "Unisex", "Basketball", "US12", "https://via.placeholder.com/200"),
new Shoe("Zoom Cleats", 100, "Unisex", "Football", "US11", "https://via.placeholder.com/200"),
new Shoe("Gym Flats", 75, "Men", "Gym", "US13", "https://via.placeholder.com/200"),
new Shoe("Tennis Smash", 95, "Women", "Tennis", "US5", "https://via.placeholder.com/200"),
new Shoe("Lylefly 4", 120, "Unisex", "Track", "US13", "https://via.placeholder.com/200"),
];

function displayShoes(filteredShoes = shoes) {
const shoesContainer = document.querySelector(".shoes");
shoesContainer.innerHTML = "";
const template = document.getElementById("shoe-template");

filteredShoes.forEach((shoe) => {
    const shoeCard = template.content.cloneNode(true);
    shoeCard.querySelector("img").src = shoe.image;
    shoeCard.querySelector("img").alt = shoe.name;
    shoeCard.querySelector(".shoe-name").textContent = shoe.name;
    shoeCard.querySelector(".shoe-price").textContent = `Price: $${shoe.price}`;
    shoeCard.querySelector(".shoe-gender").textContent = `Gender: ${shoe.gender}`;
    shoeCard.querySelector(".shoe-sport").textContent = `Sport: ${shoe.sport}`;
    shoeCard.querySelector(".shoe-size").textContent = `Size: ${shoe.size}`;
    shoesContainer.appendChild(shoeCard);
});
}

function filterShoes() {
const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map((cb) => cb.value);
const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map((cb) => cb.value);
const selectedSports = Array.from(document.querySelectorAll('input[name="sport"]:checked')).map((cb) => cb.value);
const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map((cb) => cb.value);

const filteredShoes = shoes.filter((shoe) => {
    const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(shoe.gender);
    const priceMatch =
    selectedPrices.length === 0 ||
    selectedPrices.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return shoe.price >= min && shoe.price <= max;
    });
    const sportMatch = selectedSports.length === 0 || selectedSports.includes(shoe.sport);
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(shoe.size);

    return genderMatch && priceMatch && sportMatch && sizeMatch;
});

displayShoes(filteredShoes);
}

document.getElementById("apply-filters").addEventListener("click", filterShoes);

displayShoes();
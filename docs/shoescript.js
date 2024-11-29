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
new Shoe("Bar 1", 120, "Men", "Basketball", "US10", "Bar-1.jpeg"),
new Shoe("Cronaldo Aces", 140, "Men", "Football", "US9", "Cronaldo-Aces.jpeg"),
new Shoe("Gym Junkie", 80, "Women", "Gym", "US10", "Gym-Junkie.png"),
new Shoe("John 2", 110, "Women", "Tennis", "US7", "John-2.png"),
new Shoe("Track Sprinter", 130, "Men", "Track", "US11", "Track-Sprinter.png"),
new Shoe("LeFrog 1s", 150, "Unisex", "Basketball", "US12", "LeFrog-1s.jpeg"),
new Shoe("Zoom Cleats", 100, "Unisex", "Football", "US11", "Zoom-Cleats.jpeg"),
new Shoe("Ripppped", 75, "Men", "Gym", "US13", "Ripppped.png"),
new Shoe("Tennis Smash", 95, "Women", "Tennis", "US5", "Tennis-Smash.png"),
new Shoe("Lylefly 4", 120, "Unisex", "Track", "US13", "Lylefly-4.png"),
];

function displayShoes(filteredShoes = shoes) {
    const shoesContainer = document.querySelector(".shoes-container");
    shoesContainer.innerHTML = "";
    const template = document.getElementById("shoe-template");
    filteredShoes.forEach((shoe) => {
        const roundedItem = document.createElement('div');
        roundedItem.classList.add("rounded-item-displayshoes");

        const img = document.createElement('img');
        img.src = shoe.image;
        img.alt = shoe.name;
        
        const shoeName = document.createElement('h3');
        shoeName.textContent = shoe.name;

        const shoeGender = document.createElement('p');
        shoeGender.textContent = `${shoe.gender} `;

        const shoeSport = document.createElement('p');
        shoeSport.textContent = `${shoe.sport} `;

        const shoeSize = document.createElement('p');
        shoeSize.textContent = `${shoe.size} `;

        const shoePrice = document.createElement('h3');
        shoePrice.textContent = `$${shoe.price} `;

        roundedItem.appendChild(img);
        roundedItem.appendChild(shoeName);
        roundedItem.appendChild(shoeGender);
        roundedItem.appendChild(shoeSport);
        roundedItem.appendChild(shoeSize);
        roundedItem.appendChild(shoePrice);

        shoesContainer.appendChild(roundedItem);
});
}

function filterShoes() {
const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map((cb) => cb.value);
const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map((cb) => cb.value);
const selectedSports = Array.from(document.querySelectorAll('input[name="sport"]:checked')).map((cb) => cb.value);
const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map((cb) => cb.value);

const filteredShoes = shoes.filter((shoe) => {
    const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(shoe.gender);
    const priceMatch = selectedPrices.length === 0 || selectedPrices.some((range) => {
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

// Add to cart part


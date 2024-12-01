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
new Shoe("Bar 1s", 120, "Men", "Basketball", "US10", "/images/Bar-1.jpeg"),
new Shoe("Cronaldo Aces", 140, "Men", "Football", "US9", "/images/Cronaldo-Aces.jpeg"),
new Shoe("Gym Junkies", 80, "Women", "Gym", "US10", "/images/Gym-Junkie.png"),
new Shoe("John 2s", 110, "Women", "Tennis", "US7", "/images/John-2.png"),
new Shoe("Track Sprinters", 130, "Men", "Track", "US11", "/images/Track-Sprinter.png"),
new Shoe("LeFrog 1s", 150, "Unisex", "Basketball", "US12", "/images/LeFrog-1s.jpeg"),
new Shoe("Zoom Cleats", 100, "Unisex", "Football", "US11", "/images/Zoom-Cleats.jpeg"),
new Shoe("Ripppped", 75, "Men", "Gym", "US13", "/images/Ripppped.png"),
new Shoe("Tennis Smashes", 95, "Women", "Tennis", "US5", "/images/Tennis-Smash.png"),
new Shoe("Lylefly 4s", 120, "Unisex", "Track", "US13", "/images/Lylefly-4.png"),
];

function displayShoes(filteredShoes = shoes) {
    const shoesContainer = document.querySelector(".shoes-container");
    shoesContainer.innerHTML = "";

    filteredShoes.forEach((shoe) => {
        const roundedItem = document.createElement('div');
        roundedItem.classList.add("rounded-item-displayshoes");

        const img = document.createElement('img');
        img.src = shoe.image;
        img.alt = shoe.name;
        
        // shoe details
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

        // adding to cart part
        const quantitySelector = document.createElement('div');
        quantitySelector.classList.add('quantity-selector');

        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.addEventListener('click', () => updateQuantity(shoe, -1));

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = '0';

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.addEventListener('click', () => updateQuantity(shoe, 1));

        quantitySelector.appendChild(decreaseBtn);
        quantitySelector.appendChild(quantityDisplay);
        quantitySelector.appendChild(increaseBtn);


        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('add-to-cart');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.addEventListener("click", () => addToCart(shoe, quantityDisplay));

        function updateQuantity(shoe, change) {
          const quantityDisplay = quantitySelector.querySelector('span');
          let currentQuantity = parseInt(quantityDisplay.textContent);
          currentQuantity = Math.max(0, currentQuantity + change);
          quantityDisplay.textContent = currentQuantity;
          shoe.quantity = currentQuantity;
        }
        
        function addToCart(shoe, quantityDisplay) {
          const quantity = parseInt(quantityDisplay.textContent);
          if (quantity > 0) {
            const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
            const existingItem = cartItems.find((item) => item.name === shoe.name);
            if (existingItem) {
              existingItem.quantity += quantity;
            } 
            else {
              cartItems.push({ ...shoe, quantity});
            }
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            console.log("Cart items saved:", cartItems);
            alert(`${quantity} ${shoe.name} added to cart!`);
          } 
          else {
            alert("Please select a quantity greater than 0.");
          }
        }

        roundedItem.appendChild(img);
        roundedItem.appendChild(shoeName);
        roundedItem.appendChild(shoeGender);
        roundedItem.appendChild(shoeSport);
        roundedItem.appendChild(shoeSize);
        roundedItem.appendChild(shoePrice);
        roundedItem.appendChild(quantitySelector);
        roundedItem.appendChild(addToCartBtn);

        shoesContainer.appendChild(roundedItem);
});
}

//filter part
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


//cart part
function renderCart() {
  const cartContainer = document.getElementById("cart-container");

  if (!cartContainer) {
    console.error("Cart container not found!");
    return;
  }

  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.classList.add("empty-cart");
      emptyMessage.textContent = "Your cart is empty. Add some shoes to your cart!";
      cartContainer.appendChild(emptyMessage);
  } else {
      const cartItemsContainer = document.createElement("div");
      cartItemsContainer.classList.add("cart-items");

      let totalPrice = 0;

      cartItems.forEach((item) => {
          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");

          const itemDetails = document.createElement("h4");
          itemDetails.textContent = `${item.name} x${item.quantity}`;

          const itemPrice = document.createElement("p");
          itemPrice.textContent = `$${item.price * item.quantity}`;

          totalPrice += item.price * item.quantity;

          cartItem.appendChild(itemDetails);
          cartItem.appendChild(itemPrice);
          cartItemsContainer.appendChild(cartItem);
      });

      cartContainer.appendChild(cartItemsContainer);

      const cartTotal = document.createElement("div");
      cartTotal.classList.add("cart-total");
      cartTotal.textContent = `Total: $${totalPrice}`;
      cartContainer.appendChild(cartTotal);

  }
}

renderCart();
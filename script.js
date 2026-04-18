const foodItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 299,
    cat: "pizza",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
  },
  {
    id: 2,
    name: "Farmhouse Pizza",
    price: 399,
    cat: "pizza",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  },
  {
    id: 3,
    name: "Paneer Tikka Pizza",
    price: 449,
    cat: "pizza",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    price: 499,
    cat: "pizza",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
  },
  {
    id: 5,
    name: "Cheese Burger",
    price: 199,
    cat: "mains",
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
  },
  {
    id: 6,
    name: "Alfredo Pasta",
    price: 280,
    cat: "mains",
    img: "https://images.unsplash.com/photo-1645112481355-6611f052456e?w=400",
  },
  {
    id: 7,
    name: "Grilled Sandwich",
    price: 149,
    cat: "mains",
    img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
  },
  {
    id: 8,
    name: "Veg Hakka Noodles",
    price: 180,
    cat: "mains",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
  },
  {
    id: 9,
    name: "Cold Coffee",
    price: 120,
    cat: "beverages",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400",
  },
  {
    id: 10,
    name: "Mango Smoothie",
    price: 160,
    cat: "beverages",
    img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400",
  },
  {
    id: 11,
    name: "Fresh Lime Soda",
    price: 90,
    cat: "beverages",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
  },
  {
    id: 12,
    name: "Oreo Shake",
    price: 150,
    cat: "beverages",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
  },
  {
    id: 13,
    name: "Chocolate Cake",
    price: 150,
    cat: "desserts",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
  },
  {
    id: 14,
    name: "Red Velvet Pastry",
    price: 180,
    cat: "desserts",
    img: "https://images.unsplash.com/photo-1586788680434-30d324671ff1?w=400",
  },
  {
    id: 15,
    name: "Ice Cream Sundae",
    price: 210,
    cat: "desserts",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
  },
  {
    id: 16,
    name: "Gulab Jamun",
    price: 80,
    cat: "desserts",
    img: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=400",
  },
];

let cartCount = 0;
let wishlistCount = 0;

function renderMenu(filter = "all") {
  const grid = document.getElementById("menuGrid");
  const items =
    filter === "all" ? foodItems : foodItems.filter((i) => i.cat === filter);
  grid.innerHTML = items
    .map(
      (item) => `
        <div class="food-card">
            <div class="wishlist-btn" onclick="toggleWishlist(this)"><i class="fas fa-heart"></i></div>
            <img src="${item.img}" alt="${item.name}">
            <div class="card-info">
                <h3>${item.name}</h3>
                <div class="price-row">
                    <p class="price">₹${item.price}</p>
                    <div class="counter"><span onclick="updateQty(this, -1)">-</span><b class="qty">0</b><span onclick="updateQty(this, 1)">+</span></div>
                </div>
                <button class="btn-primary" style="width: 100%;" onclick="addToCart(this)">Add to Cart</button>
            </div>
        </div>
    `,
    )
    .join("");
}

function updateQty(btn, change) {
  const qtyEl = btn.parentElement.querySelector(".qty");
  let q = parseInt(qtyEl.innerText);
  if (q + change >= 0) qtyEl.innerText = q + change;
}

function toggleWishlist(btn) {
  btn.classList.toggle("active");
  wishlistCount += btn.classList.contains("active") ? 1 : -1;
  document.getElementById("wishlistBadge").innerText = wishlistCount;
}

function addToCart(btn) {
  const qty = parseInt(btn.parentElement.querySelector(".qty").innerText);
  if (qty > 0) {
    cartCount += qty;
    document.getElementById("cartBadge").innerText = cartCount;
    btn.parentElement.querySelector(".qty").innerText = "0";
  }
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderMenu(btn.dataset.cat);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    renderMenu();
  }, 800);
};

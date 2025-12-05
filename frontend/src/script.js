// =========================
// Navbar toggle
// =========================
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// =========================
// Product / API helpers
// =========================
const API_BASE_URL = "http://127.0.0.1:8000";
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/api/products`;

// Fetch all products from backend
async function fetchAllProducts() {
  try {
    const res = await fetch(PRODUCTS_ENDPOINT);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json(); // should be an array
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

// Price formatting helper
function formatPrice(price) {
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }
  const num = Number(price);
  if (Number.isNaN(num)) return "$0.00";
  return `$${num.toFixed(2)}`;
}

// =========================
// Create product card
// (used by home + shop)
// =========================
function createProductCard(product) {
  const { _id, category, name, image, price } = product;

  const card = document.createElement("div");
  card.classList.add("pro");

  // Inner HTML matches your original static cards so CSS applies correctly
  card.innerHTML = `
    <img src="${image || "src/img/products/f1.jpg"}" alt="${
    name || "Product image"
  }" />
    <div class="des">
      <span>${category || "brand"}</span>
      <h5>${name || "Description Item"}</h5>
      <div class="star">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </div>
      <h4>${formatPrice(price)}</h4>
    </div>
    <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
  `;

  // Clicking anywhere on the card goes to the single-product page
  card.addEventListener("click", () => {
    if (_id) {
      window.location.href = `sproduct.html?id=${_id}`;
    } else {
      window.location.href = "sproduct.html";
    }
  });

  return card;
}

// =========================
// Home page: Featured products
// (index.html)
// =========================
const homeProductList = document.getElementById("product-list");

if (homeProductList) {
  (async () => {
    const products = await fetchAllProducts();

    // Take 8 "featured" products — currently lowest price first
    const featured = [...products]
      .sort((a, b) => (a.price || 0) - (b.price || 0))
      .slice(0, 8);

    featured.forEach((product) => {
      const card = createProductCard(product);
      homeProductList.appendChild(card);
    });
  })();
}

// =========================
// Shop page: All products + pagination
// (shop.html)
// =========================
const shopProductList = document.getElementById("shop-product-list");
const paginationContainer = document.getElementById("pagination");

if (shopProductList && paginationContainer) {
  const PRODUCTS_PER_PAGE = 16;
  let currentPage = 1;
  let allProducts = [];

  (async () => {
    allProducts = await fetchAllProducts();
    renderPage(1);
  })();

  function renderPage(page) {
    currentPage = page;
    shopProductList.innerHTML = "";

    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    const pageItems = allProducts.slice(startIndex, endIndex);
    pageItems.forEach((product) => {
      const card = createProductCard(product);
      shopProductList.appendChild(card);
    });

    renderPagination();
  }

  function renderPagination() {
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = "#shop-products"; // scroll back up to product grid
      link.textContent = i.toString();

      if (i === currentPage) {
        link.classList.add("active-page");
      }

      link.addEventListener("click", (e) => {
        e.preventDefault();
        renderPage(i);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      paginationContainer.appendChild(link);
    }
  }
}

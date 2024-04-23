const favoritesList = document.querySelector("#favorites-list");
const searchButton = document.querySelector("#search-btn");
const results = document.querySelector(".results");
let startIndex = 0;
const maxResults = 21;

document.addEventListener("DOMContentLoaded", () => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  displayFavorites(savedFavorites);
  handleSearch("best sale");
});

searchButton.addEventListener("click", () => {
  startIndex = 0;
  const searchKey = document.querySelector("#book-search").value;
  handleSearch(searchKey); 
});


async function handleSearch(searchKey) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    if (!response.ok) throw new Error("An error occurred while fetching data.");
    const data = await response.json();
    displayResults(data.items, data.totalItems);
    displayPagination(data.totalItems);
  } catch (error) {
    displayError(error.message);
  }
}

function displayResults(items, totalItems) {
  results.innerHTML = items.map(item => `
    <div class="book-item">
      <h3>${item.volumeInfo.title}</h3>
      <img src="${item.volumeInfo.imageLinks?.thumbnail || "No image available"}" />
      <p>${truncateText(item.volumeInfo.description || "No description available", 30)}</p>
      <a href="${item.volumeInfo.infoLink}" target="_blank" class="read-more-link">ნახეთ მეტი</a>
      <button class="add-favorite-btn">სასურველი წიგნი</button>
    </div>
  `).join("");
  results.querySelectorAll(".add-favorite-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => addToFavorites(items[index].volumeInfo.title));
  });
}

function displayPagination(totalItems) {
  const totalPages = Math.min(Math.ceil(totalItems / maxResults), 5);
  const pagesContainer = document.querySelector(".pages");
  pagesContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = `Page ${i}`;
    button.dataset.page = i;
    button.classList.add("page-btn");
    pagesContainer.appendChild(button);
    button.addEventListener("click", () => navigateToPage(i));
  }
}

function addToFavorites(title) {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  savedFavorites.push(title);
  localStorage.setItem("favorites", JSON.stringify(savedFavorites));
  displayFavorites(savedFavorites);
}

function displayFavorites(favorites) {
  favoritesList.innerHTML = favorites.map(favorite => `
    <li>${favorite}<button class="remove-favorite-btn">Remove</button></li>
  `).join("");
  favoritesList.querySelectorAll(".remove-favorite-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => removeFromFavorites(favorites[index]));
  });
}

function removeFromFavorites(title) {
  let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  savedFavorites = savedFavorites.filter(item => item !== title);
  localStorage.setItem("favorites", JSON.stringify(savedFavorites));
  displayFavorites(savedFavorites);
}

function displayError(message) {
  results.innerHTML = `<p class="error-message">${message}</p>`;
}

function truncateText(text, limit) {
  const words = text.split(" ");
  return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : text;
}

function navigateToPage(pageNumber) {
  startIndex = (pageNumber - 1) * maxResults;
  handleSearch();
}








document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.getElementById("register-btn");
  const registrationForm = document.getElementById("registration-form");

  registerButton.addEventListener("click", () => {
    
      registrationForm.style.transition = "transform 0.5s ease-in-out";
      registrationForm.style.transform = "translateY(0)";
  });
});




let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    const slideWidth = slides[0].clientWidth;
    const offset = -slideIndex * slideWidth;
    document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
}

setInterval(showSlides, 5000);


document.addEventListener("DOMContentLoaded", function() {
  const authButtons = document.querySelector('.auth-buttons');
  const slideMenuToggle = document.querySelector('.slide-menu-toggle');
  const slideMenu = document.querySelector('.slide-menu');
  
  
  function toggleAuthButtons() {
    if (window.innerWidth < 700) {
        authButtons.style.display = 'none'; 
        slideMenuToggle.style.display = 'block'; 
    } else {
        authButtons.style.display = 'flex'; 
        slideMenuToggle.style.display = 'none'; 
    }
  }

  toggleAuthButtons();

  window.addEventListener('resize', toggleAuthButtons);

  slideMenuToggle.addEventListener('click', function() {
    slideMenu.classList.toggle('active');
  });

  document.addEventListener('click', function(event) {
    if (!slideMenu.contains(event.target) && event.target !== slideMenuToggle) {
      slideMenu.classList.remove('active');
    }
  });
});


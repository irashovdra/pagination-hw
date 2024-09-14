const API_KEY = "45974706-6041dd0d5c0ed992c409444d0";
const API_URL = "https://pixabay.com/api/";
let currentPage = 1;
const perPage = 12;

const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

function fetchImages(page = 1) {
  const url = `${API_URL}?key=${API_KEY}&editors_choice=true&page=${page}&per_page=${perPage}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.hits.length > 0) {
        displayImages(data.hits);
      } else {
        loadMoreBtn.textContent = "No more images";
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

function displayImages(images) {
  images.forEach((image) => {
    const imageItem = document.createElement("div");
    imageItem.classList.add("image-item");
    imageItem.innerHTML = `
            <img src="${image.webformatURL}" alt="${image.tags}">
            <p>${image.tags}</p>
        `;
    gallery.appendChild(imageItem);
  });
}

loadMoreBtn.addEventListener("click", function () {
  currentPage++;
  fetchImages(currentPage);
});

fetchImages();

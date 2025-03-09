let searchBox = document.querySelector("#searchBox");
let searchBtn = document.querySelector("#searchBtn");
let resultImg = document.querySelector(".resultImg");
let moreBtn = document.querySelector("#moreBtn");
let query = "";
let page = 1;

let apiKeys = "SuCFTuKTWSRuQAwza8ieOBD6ZatF3Uh3c88Lie0rPA3sfgjx5PilEYEN";

// donwload image

function downloadImage(imageUrl, filename) {
  fetch(imageUrl)
    .then((response) => response.blob()) // Convert image to Blob
    .then((blob) => {
      const url = URL.createObjectURL(blob); // Create a local URL for the Blob
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Release memory
    })
    .catch((error) => console.error("Error downloading image:", error));
}

async function searchImages() {
  console.log("ruuing");

  query = searchBox.value;

  if (query === "") {
    query = "nature";
  }
  const url = `https://api.pexels.com/v1/search/?page=${page}&per_page=10&query=${query}`;

  let response = await fetch(url, {
    headers: { Authorization: apiKeys },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  let data = await response.json();

  let results = data.photos;
  if (page == 1) {
    resultImg.innerHTML = "";
  }

  results.forEach((result) => {
    console.log(result)
    let imgs = document.createElement("div");
    imgs.classList.add("imgs");

    let imgBox = `<img src=${result.src.tiny}>
                    <div class="user">
                        <i class="fas fa-camera"></i>
                        <span>${result.alt}</span>
                    </div>
                    <div class="details">
                        <div class="view">View</div>

                        <div class="download" onclick=download("${result.src.tiny}")>
                            <i class="fas fa-download"></i>
                        </div>
                    </div>`;

    imgs.innerHTML = imgBox;
    resultImg.appendChild(imgs);
    searchBox.value = "";
  });
}

// enter key: search result
searchBox.addEventListener("keyup", (e) => {
  page = 1;
  if (e.key == "Enter") {
    searchImages();
    searchBox.value = "";
   
  }
});

// result on load
window.onload = () => searchImages();
searchBtn.addEventListener("click", () => {
  searchImages();
});

// more image on click
moreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

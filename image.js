let searchBox = document.querySelector("#searchBox");
let searchBtn = document.querySelector("#searchBtn");
let resultImg = document.querySelector(".resultImg");
let moreBtn = document.querySelector("#moreBtn");

let query = "";
let page = 1;

let apiKeys = "SuCFTuKTWSRuQAwza8ieOBD6ZatF3Uh3c88Lie0rPA3sfgjx5PilEYEN";

async function searchImages() {
  console.log("running");

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

  results.map((result) => {
    // console.log(result)
    var result ;
    let imgs = document.createElement("div");
    imgs.classList.add("imgs");

    var imgBox = `<img src="${result.src.original}">
                    <div class="user">
                        <i class="fas fa-camera"></i>
                        <span>${result.alt}</span>
                    </div>
                    <div class="details">
                        <div class="view" >View</div>

                       <div class="download">
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



// these will not work on online loaded image
let preview = document.querySelector(".preview");

let imgs = document.querySelectorAll(".imgs img");
imgs.forEach((view) => {
  view.addEventListener("click", (e) => {
    preview.style.display = "flex";
    console.log(e.target.src);
  });
});

let close = document.querySelector(".close");
close.addEventListener("click", () => {
  preview.style.display = "none";
  preview.style.transition = "1s ease-in";
})

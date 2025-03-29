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
    query = "animal";
  }
  const url = `https://api.pexels.com/v1/search/?page=${page}&per_page=30&query=${query}`;

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
    console.log(result);
    var result;
    let imgs = document.createElement("div");
    imgs.classList.add("imgs");

    var imgBox = `<img src="${result.src.medium}">
                    <div class="user">
                        <i class="fas fa-camera"></i>
                        <span>${result.alt}</span>
                    </div>
                    <div class="details">
                        <div class="view" >View</div>

                       <div class="download" >
                            <a href="${result.src.large}" download="${result.src.large}">
                            <i class="fas fa-download"></i>
                        </a>
                        </div>
                    </div>`;

    imgs.innerHTML = imgBox;
    resultImg.appendChild(imgs);
    searchBox.value = "";


    // preview image
    let img = imgs.querySelectorAll(".view");
    img.forEach((view) => {
      view.addEventListener("click", () => {
        let preview = document.createElement("div");
        preview.classList.add("preview");
        preview.innerHTML = ` 
    <div class="pleft">
    <img src="${result.src.portrait}" alt="image preview">
    </div>
    <div class="pright">
    <div class="scat">image Id: ${result.id}</div>
    <h3>Info: <span>${result.alt}</span></h3>
    <h3>Photographer: <span>${result.photographer}</span></h3>
    <button ><a href="${result.src.large}" download>Full Screen &#128639;</a></button>
    <div class="close">&#10060</div>
    
    </div>`;
        let prevbox = document.querySelector(".prevbox");
        prevbox.appendChild(preview);
        prevbox.style.display = "flex";

        let close = preview.querySelector(".close");
        close.addEventListener("click", () => {
          preview.style.display = "none";
          preview.style.transition = "1s ease-in";
        });
      });
      
    });
    
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

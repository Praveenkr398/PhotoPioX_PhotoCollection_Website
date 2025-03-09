let tabs = document.querySelector('.tabs')
let gallery = document.querySelectorAll('.photo')
let navItem =  document.querySelectorAll('.navlist ul li a.active')


document.querySelectorAll(".tab").forEach(link => {
    link.addEventListener("click", function(event) {
        // event.preventDefault(); // Default action रोकें

        document.querySelectorAll(".tab").forEach(nav => nav.classList.remove("activeTab"));
        this.classList.add("activeTab");

        // बिना रीलोड किए URL अपडेट करने के लिए (Optional)
        history.pushState(null, "", this.getAttribute("href"));
    });
});


// code for filter gallery images
tabs.addEventListener("click",event=>{
    // console.log(event.target.dataset.category)
    if(event.target.dataset.category !== undefined){
   filterSearch(event.target.dataset.category)
    }
    tabs.classList.remove('activeTab')
})

const  filterSearch = (value) =>{
    gallery.forEach( (currValue) =>{
        console.log(currValue.dataset.category)
        if(currValue.dataset.category === value || value == 'all'){
            currValue.style.display = 'block'
        }
        else{
            currValue.style.display = 'none'
        }
     })
}




// navigation active on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navItems a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 80) {
            current = section.getAttribute("id");
            
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// scroll to top function

function scrolltoTop(){
    window.scrollTo({top:0, behavior: 'smooth'})
}

document.addEventListener("DOMContentLoaded", function() {
    window.location.hash = "#home";
});


let loading = true

let defaultBackgroundColor = document.body.style.backgroundColor

let map = []; // Declare map in the outer scope

let totalImages = 170; // Total number of images to load
let loadedImages = 0; // Counter for loaded images

const loader = document.querySelector(".loader");


fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/champion.json")
    .then((response) => response.json())
    .then((json) => {
        
        map = Object.keys(json.data).map((key) => json.data[key])
  
        map.forEach(element => {

            const container = document.createElement("div")

            const img = document.createElement("img")
            element.img = img
            img.src = "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/" + element.image.full
 
            img.style.opacity = "1" // stop button from needing to be clicked twice to change opacity
            img.setAttribute("id", element.name)

            // track number of loaded images
            img.addEventListener("load", () => {
                loadedImages++;

                // Check if all images are loaded
                if (loadedImages === totalImages) {
                    loading = false;
                    document.body.style.backgroundColor = defaultBackgroundColor;
                    loader.classList.add("loader-hidden")
                }
            });

            img.addEventListener("click", clicked)
            img.addEventListener("mousedown", (event) => {event.preventDefault()})


            
            const p = document.createElement("p")
            element.p = p
            p.textContent = element.name
            
            function clicked() {
                if (img.style.opacity == "1") {
                    
                    setOpacity(0.5, element.img, element.p)
                    element.owned = false
                    localStorage.setItem(element.name, element.owned)
                }
                else {
                    setOpacity(1, element.img, element.p)
                    element.owned = true
                    localStorage.setItem(element.name, element.owned)
                }
            }
            
            container.appendChild(img)
            container.appendChild(p)

            

            document.querySelector(".grid").appendChild(container)

            customChar(element.name)




            

            element.owned = localStorage.getItem(element.name) === "true"
            if (localStorage.getItem(element.name) == null) {
                element.owned = true
                localStorage.setItem(element.name, "true")
            }

            if (!element.owned) {
                setOpacity(0.5, img, p)
            }

            if (element.owned) {
                setOpacity(1, img, p)
            } 

            console.log(element.name)
            console.log(loading)
        });

});

function showUnOwned() {
    var notOwned = []
    map.forEach(element => {
        if (element.owned == false) {
            notOwned.push(" " + element.name)
        }
    });
    console.log("You don't own:"  + notOwned)
}

function clearStorage() {
    if (confirm("Are you sure?")) {
        console.log("approved storage clear")
        map.forEach(element => {
            localStorage.clear()
            setOpacity(1, element.img, element.p)
        })
    }
    else {
        console.log("dénied storage clear")
    }
}

function filterAll() {
    if (confirm("Are you sure?")) {
        map.forEach(element => {
            localStorage.setItem(element.name, "false")
            setOpacity(0.5, element.img, element.p)
        })
    }
}

function setOpacity(num, img, p) {
    img.style.opacity = num;
    p.style.opacity = num;
}

function customChar(previousChar) {
    if (previousChar == "Gwen") {
            console.log("test test test")

            const container = document.createElement("div")

            const img = document.createElement("img")
            img.src = "images/GyroP.webp"
 
            img.addEventListener("click", (event) => { changeSrc(img, "images/Johnny.jpg", "images/GyroP.webp", p)})
            img.addEventListener("mousedown", (event) => {event.preventDefault()})
            img.style.height = "122px"
            img.style.width = "122px"
            img.classList.add("customChar")
            
            const p = document.createElement("p")
            p.textContent = "Gyro"

            container.appendChild(img)
            container.appendChild(p)
            document.querySelector(".grid").appendChild(container)
        }   
    }

function changeSrc(image, newSrc, originalSrc, p) {
    if (image.src.includes(originalSrc)) {
        image.src = newSrc
        p.textContent = "Johnny"
    }
    else {
        image.src = originalSrc
        p.textContent = "Gyro"
    }
    
}








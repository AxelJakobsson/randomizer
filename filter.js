let loading = true

let defaultBackgroundColor = document.body.style.backgroundColor

let map = [];

let totalImages = 170; 
let loadedImages = 0; 

const movingSlider = document.querySelector(".slider")

let filterAllButton = document.querySelector(".filterButton")
let filterAllButtonCoordinates = filterAllButton.getBoundingClientRect();

const loader = document.querySelector(".loader");


fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/champion.json")
    .then((response) => response.json())
    .then((json) => {
        map = Object.keys(json.data).map((key) => json.data[key])
  
        map.forEach(element => {

            const container = document.createElement("div") // div containing text and image

            const img = document.createElement("img")
            element.img = img
            img.src = "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/" + element.image.full
 
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
            p.classList.add("customCharacterText")

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

function search() {
    const customCharacter = document.querySelector(".customChar")
    const customCharacterText = document.querySelector(".customCharacterText")
    let searchValue = document.getElementById("searchValue")
    let search = searchValue.value
    console.log(search)
 
    if (search !== "") {
        customCharacter.style.display = "none"
        customCharacterText.style.visibility = "hidden"
    }
    else {
        customCharacter.style.display = "block"
        customCharacterText.style.visibility = "visible"
    }
    map.forEach(element => {
        
        if (!element.name.includes(search)) {
            element.img.style.display = "none";
            element.p.style.visibility = "hidden";
        }
        else {
            element.img.style.display = "block";
            element.p.style.visibility = "visible"; 
        }
    })
}

function moveMouse(event) {
    if (event.clientX > 26 && event.clientX < filterAllButtonCoordinates.right) {
        movingSlider.style.left = event.clientX-26 + "px";
    }

}








const darkModeImage = document.getElementById("darkModeImage")
const darkModeToggle_light = "images/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
const darkModeToggle_dark = "images/dark_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"

let loading = true

let defaultBackgroundColor = document.body.style.backgroundColor

let map = [];

let totalImages = 170; 
let loadedImages = 0; 

const movingSlider = document.querySelector(".slider")

let searchButton = document.querySelector("#searchValue")
let searchButtonCoordinates = searchButton.getBoundingClientRect();

const loader = document.querySelector(".loader");

if (!localStorage.getItem("darkMode")){
    console.log("no darkmode")
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        document.body.classList.add("dark-mode")
        localStorage.setItem("darkMode", true)
        darkModeImage.src = darkModeToggle_light
        console.log("dark mode")
    }
    else {
        document.body.classList.remove("dark-mode")
        localStorage.setItem("darkMode", false)
        darkModeImage.src = darkModeToggle_dark
        console.log("light mode")
    }
}

if (localStorage.getItem("darkMode") == "true") {
    document.body.classList.add("dark-mode")
    darkModeImage.src = darkModeToggle_light
    console.log("localstorage dark")
}
else if (!localStorage.getItem("darkMode") == "false"){
    document.body.classList.remove("dark-mode")
    darkModeImage.src = darkModeToggle_dark
    console.log("localstorage white")
}



fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/champion.json")
    .then((response) => response.json())
    .then((json) => {
        map = Object.keys(json.data).map((key) => json.data[key])
  
        map.forEach(element => {

            const container = document.createElement("div") // div containing text and image
            container.className = element.name.replace(/[ '.&]/g, "") + "_div"
            


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
        });
});

function clearStorage() {
    if (confirm("Are you sure?")) {
        if (document.body.classList.contains("dark-mode")) {
            darkModeOn = true
        }
        else {
            darkModeOn = false
        }
        console.log("approved storage clear")
        map.forEach(element => {
            localStorage.clear()
            setOpacity(1, element.img, element.p)
        })
        if (darkModeOn == true) {
            localStorage.setItem("darkMode", true)
        }
        else {
            localStorage.setItem("darkMode", false)
        }

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
            const container = document.createElement("div")
            container.classList.add("customCharacterDiv")

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
    const customCharacterDiv = document.querySelector(".customCharacterDiv")
    const customCharacter = document.querySelector(".customChar")
    const customCharacterText = document.querySelector(".customCharacterText")
    let searchValue = document.getElementById("searchValue")
    let search = searchValue.value.toLowerCase()
    console.log(search)
 
    if (search !== "") {
        customCharacter.style.display = "none"
        customCharacterText.style.visibility = "hidden"
        customCharacterDiv.style.display = "none"
    }
    else {
        customCharacter.style.display = "block"
        customCharacterText.style.visibility = "visible"
        customCharacterDiv.style.display = "block"
    }
    map.forEach(element => {
        let elementDiv = document.querySelector("." + element.name.replace(/[ '.&]/g, "") + "_div"); // replace spaces, ', ., and & with "", /g to make it global and affect all
        
        if (!element.name.toLowerCase().includes(search)) {
            element.img.style.display = "none";
            element.p.style.visibility = "hidden";
            elementDiv.style.display = "none"
        }
        else {
            element.img.style.display = "block";
            element.p.style.visibility = "visible"; 
            elementDiv.style.display = "block"
        }
        console.log("end")
    })
}

function moveMouse(event) {
    if (event.clientX > 26 && event.clientX < searchButtonCoordinates.right) {
        movingSlider.style.left = event.clientX-26 + "px";
    }
}

function switchDarkMode() {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode")
        localStorage.setItem("darkMode", false)
        darkModeImage.src = darkModeToggle_dark
    }
    else {
        document.body.classList.add("dark-mode")
        localStorage.setItem("darkMode", true)
        darkModeImage.src = darkModeToggle_light
    }
    console.log("Dark mdoe")
    console.log(localStorage.getItem("darkMode"))
}
<<<<<<< HEAD


let map = []; // Declare map in the outer scope

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

            element.owned = localStorage.getItem(element.name) === "true"
            if (localStorage.getItem(element.name) == null) {
                element.owned = true
                localStorage.setItem(element.name, "true")
            }
            console.log(element.name + " " + element.owned)

            if (!element.owned) {
                setOpacity(0.5, img, p)
            }

            if (element.owned) {
                setOpacity(1, img, p)
            } 
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
=======
window.onload = (event) => {
    if (window.location.pathname.endsWith("filter.html")){
        console.log("filter.html")





    fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/champion.json")
    .then((response) => response.json())
    .then((json) => {
        var i = 0;
            
        var map = Object.keys(json.data).map((key) => json.data[key])
            
        console.log("map", map)

        map.forEach(element => {
            const placeholder = document.createElement("div")
            const p = document.createElement("p")
            const image = document.createElement("img")
            image.addEventListener("click", clicked)

            function clicked() {
                console.log("Clicked on " + element.name)
            }

            image.src = "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/" + element.image.full;
            p.textContent = element.name;



            document.getElementById("container1").appendChild(placeholder);
            placeholder.appendChild(image)
            placeholder.appendChild(p)
        });


    })
    }

>>>>>>> f1e23744f6458dbac93930c61f0763ad21787628
}



<<<<<<< HEAD






=======
>>>>>>> f1e23744f6458dbac93930c61f0763ad21787628

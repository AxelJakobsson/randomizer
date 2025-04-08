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

}




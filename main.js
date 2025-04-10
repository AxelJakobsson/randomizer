var validChamps = []
let num = -1
let previousRolledChampion = "a"
let selectedChampion = "a"

input = document.querySelector(".number")
input.addEventListener("keyup", function() {
    num = input.value
    console.log("number" + num)
})

function random_button() {
    fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/champion.json")
    .then((response) => response.json())
    .then((json) => {

        validChamps = []
        
        var map = Object.keys(json.data).map((key) => json.data[key])

        map.forEach(element => {
            element.owned = localStorage.getItem(element.name) === "true"
            if (localStorage.getItem(element.name) == null) {
                element.owned = true
                localStorage.setItem(element.name, "true")
            }

            if (element.owned){
                validChamps.push(element.name)
            }
        });

        console.log(validChamps)
        if (validChamps.length === 0) {
            alert("All champions are filtered out")
            return;
        }

        if (selectedChampion == previousRolledChampion) {
            console.log("duplicate")
        }

        retries = 0
        while (selectedChampion == previousRolledChampion && retries < 10) {
            var random = Math.floor(Math.random() * validChamps.length)
            selectedChampion = validChamps[random]
            mapNum = 0
            i = 1
            retries ++
            console.log(retries)
        }

        for (i = 0; i < map.length; i++) {
            if(map[i].name == selectedChampion){
                break;
            }
        }

        console.log("num" + num)
        if (num == -1) {
            searchPic = "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/" + map[i].image.full;
        }
        else {
            searchPic = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + selectedChampion + "_" + num +".jpg"
        }
        

        document.getElementById("champion_name").innerHTML = "<b> " + map[i].name + "</b>"
        document.getElementById("champion_image").src = searchPic;
        document.getElementById("champion_image").style.display = "inline";

        previousRolledChampion = selectedChampion
})
}
// https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/Akali.png

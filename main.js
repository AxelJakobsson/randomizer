var validChamps = []

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

            if (element.owned == false){
                console.log(element.name)
            }
            else {
                validChamps.push(element.name)
            }
        });

        console.log(validChamps)
        if (validChamps.length === 0) {
            alert("All champions are filtered out")
            return;
        }

        var random = Math.floor(Math.random() * validChamps.length)
        console.log(random)
        console.log(validChamps[random])

        selectedChampion = validChamps[random]
        mapNum = 0
        i = 1
        for (i = 0; i < map.length; i++) {
            if(map[i].name == selectedChampion){
                break;
            }
        }

        const searchPic = "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/" + map[i].image.full;
        document.getElementById("champion_name").innerHTML = "<b> " + map[i].name + "</b>"
        document.getElementById("champion_image").src = searchPic;
})
}
// https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/Akali.png

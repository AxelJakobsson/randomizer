function random_button() {
    fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/champion.json")
    .then((response) => response.json())
    .then((json) => {
        
        var map = Object.keys(json.data).map((key) => json.data[key])
        
        console.log("map", map)

        const random = Math.floor(Math.random() * map.length)
        
        console.log(map[random])
        console.log(map[random].name)
        console.log(map[random].image)
        console.log(random)

        document.getElementById("champion_name").innerHTML = map[random].name;
        const searchPic = "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/" + map[random].image.full;
        document.getElementById("champion_image").src = searchPic;
})
}

console.log("Hello World!")
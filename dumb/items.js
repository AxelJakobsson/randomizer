let legendaryIds = []

const randomButton1 = document.getElementById("random_button1")

fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/item.json")
        .then((response) => response.json())
        .then((json) => {
            

        legendaryIds = Object.entries(json.data)
        .filter(([id, item]) => {
            console.log(id, item.maps, item.name);
            return item.depth === 3
            && item.maps
            && item.maps["11"] === true;  
        })
        .map(([id]) => id);

// 30 == arena, 33 == swarm, 21 == aram, 11 == summoners rift
            console.log(legendaryIds);

        const preloadedImages = [];

        legendaryIds.forEach(id => {
        const img = new Image();
        img.src = `https://ddragon.leagueoflegends.com/cdn/15.7.1/img/item/${id}.png`;
        preloadedImages.push(img);
        });
        
            randomizeItem()
        })





function randomizeItem() {
  if (legendaryIds.length === 0) {
    console.log("Legendary items not loaded yet.");
    return;
  }
  const randomValue = legendaryIds[Math.floor(Math.random() * legendaryIds.length)];
  const searchPic = `https://ddragon.leagueoflegends.com/cdn/15.7.1/img/item/${randomValue}.png`;
  document.getElementById("champion_image").src = searchPic;
}

randomButton1.addEventListener("click", randomizeItem);
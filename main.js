var validChamps = []
var validChampsFromRoles= []
let roles = []
let num = -1
let previousRolledChampion = "a"
let selectedChampion = "a"
let previousRandom = 0

topRoleSelected = true
jungleRoleSelected = true
midRoleSelected = true
bottomRoleSelected = true
supportRoleSelected = true

currentlySpinning = false

const topButton = document.getElementById("topRole")
const jungleButton = document.getElementById("jungleRole")
const midButton = document.getElementById("midRole")
const bottomButton = document.getElementById("bottomRole")
const supportButton = document.getElementById("supportRole")

const allRoleButton = document.getElementById("allRole")

let roleSelectedChampions = []
lastX = 0

var roleTop = ["Aatrox", "Akshan", "Ambessa", "Aurora", "Camille", "Cho'Gath", "Darius", "Dr. Mundo", "Fiora", "Gangplank", "Garen", "Gnar", "Gragas", "Gwem", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Jayce", "K'Sante", "Kayle", "Kennen", "Kled", "Malphite", "Maokai", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Riven", "Rumble", "Sett", "Shen", "Shyvana", "Singed", "Sion", "Tahm Kench", "Teemo", "Trundle", "Tryndamere", "Urgot", "Vayne", "Volibear", "Warwick", "Yorick"]
var roleJungle = ["Ambessa", "Amumu", "Bel'Veth", "Briar", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Graves", "Gwen", "Hecarim", "Ivern", "Jarvan IV", "Karthus", "Kayn", "Kha'Zix", "Kindred", "Lee Sin", "Lillia", "Maokai", "Master Yi", "Naafiri", "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Poppy", "Rammus", "Rek'Sai", "Rengar", "Sejuani", "Shaco", "Shyvana", "Skarner", "Taliyah", "Talon", "Trundle", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "Wukong", "Xin Zhao", "Zac"]
var roleMid = ["Ahri", "Akali", "Akshan", "Ambessa", "Anivia", "Annie", "Aurelion Sol", "Aurora", "Azir", "Cassiopeia", "Ekko", "Fizz", "Galio", "Heimerdinger", "Hwei", "Kassadin", "Katarina", "LeBlanc", "Lissandra", "Lux", "Malzahar", "Mel", "Naafiri", "Neeko", "Orianna", "Pantheon", "Qiyana", "Quinn", "Ryze", "Singed", "Swain", "Sylas", "Syndra", "Taliyah", "Talon", "Twisted Fate", "Veigar", "Vel'Koz", "Vex", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Ziggs", "Zoe"]
var roleBottom = ["Aphelios", "Ashe", "Brand", "Caitlyn", "Corki", "Draven", "Ezreal", "Jhin", "Jinx", "Kai'Sa", "Kalista", "Kog'Maw", "Lucian", "Miss Fortune", "Nilah", "Samira", "Seraphine", "Sivir", "Smolder", "Swain", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", , "Yasuo", "Zeri", "Ziggs"]
var roleSupport = ["Alistar", "Amumu", "Bard", "Blitzcrank", "Brand", "Braum", "Janna", "Karma", "Leona", "Lulu", "Lux", "Maokai", "Milio", "Morgana", "Nami", "Nautilus", "Neeko", "Pantheon", "Poppy", "Pyke", "Rakan", "Rell", "Renata Glasc", "Senna", "Seraphine", "Sett", "Shaco", "Sona", "Soraka", "Swain", "Tahm Kench", "Taric", "Tresh", "Vel'Koz", "Xerath", "Yuumi", "Zilean", "Zyra"]



const movingSlider = document.querySelector(".slider")
const supportButtonCoordinates = supportButton.getBoundingClientRect();

const darkModeImage = document.getElementById("darkModeImage")
const darkModeToggle_light = "images/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
const darkModeToggle_dark = "images/dark_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"

const mql = window.matchMedia("(width <= 700px)");


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

console.log(topButton.style.display)
function mobileMediaQuery(e) {
    if (e.matches) {
        console.log("below 700px")
        allRoleButton.style.display = "block"
    }
    else {
        console.log("over 700px")
        allRoleButton.style.display = "none"
    }
}

mql.addEventListener("change", mobileMediaQuery);

let container; 
let handleClickOutside;


function allRoleButtonClicked() {
    const existingPopup = document.querySelector("#rolePopup");

    if (existingPopup) {
        console.log("already exists")
        existingPopup.style.display = "flex"
        if (handleClickOutside) {
            setTimeout(() => { // slight delay to avoid immediate trigger
                document.addEventListener("click", handleClickOutside);
            }, 0);
        }
        return;
    }


    console.log("hi")
    container = document.createElement("div")
    container.style.backgroundColor = "var(--header-background-color)"
    container.style.border = "2px solid hsl(3, 100%, 90%)"
    container.id = "rolePopup";

    container.style.width = "20rem";
    container.style.height = "40rem";
    container.style.position = "absolute";

    container.style.display = "flex"
    container.style.flexDirection = "column"

    container.style.top = "52%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)"; // centers it
    

    const roles = ["Top", "Jungle", "Mid", "Bottom", "Support"];
        roles.forEach(role => {
        const button = document.createElement("button");
        button.textContent = role;
        button.id = role.toLowerCase() + "Role";
        button.setAttribute("data-popup", "true");
        button.className = "roleButtons";

        // apply styles via JS instead of an inline CSS block
        button.style.height = "4rem";
        button.style.minWidth = "4rem";
        button.style.width = "12rem"
        button.style.color = "var(--header-button-text-color)";
        button.style.backgroundColor = "var(--header-button-color)";
        button.style.border = "none";
        button.style.borderRadius = "6.5%";
        button.style.padding = "0.1rem";
        button.style.fontSize = "1rem";
        button.style.margin = "auto";

        button.addEventListener("click", () => clickedRole(button.id)); 
        container.appendChild(button);
    })
    document.body.appendChild(container);

    const others = document.querySelectorAll("body *:not(#rolePopup):not(.roleButtons)");
    others.forEach(el => {
        el.style.filter = "blur(0.8px)";
    });

function handleClickOutside(event) {
        if (!container.contains(event.target)) {
            // Remove popup
            container.style.display = "none"

            // Remove blur
            document.querySelectorAll("body *").forEach(el => {
                el.style.filter = "";
            });

            // Remove this listener
            document.removeEventListener("click", handleClickOutside);
        }
    }

    // Attach click listener to document
    setTimeout(() => { // slight delay to avoid immediate trigger
        document.addEventListener("click", handleClickOutside);
    }, 0);
}


allRoleButton.addEventListener("click", allRoleButtonClicked)






function clickedRole(role) {

    

    if (role == "topRole") {
        if (topRoleSelected) {
            console.log("a")
            topRoleSelected = false;
            topButton.style.opacity = "0.7";
            document.querySelector('#topRole[data-popup="true"]').style.opacity = "0.7"
        } else {
            topRoleSelected = true;
            topButton.style.opacity = "1";
            document.querySelector('#topRole[data-popup="true"]').style.opacity = "1"
        }
    }
    if (role == "jungleRole") {
        if (jungleRoleSelected) {
            jungleRoleSelected = false;
            jungleButton.style.opacity = "0.7";
            document.querySelector('#jungleRole[data-popup="true"]').style.opacity = "0.7"
        } else {
            jungleRoleSelected = true;
            jungleButton.style.opacity = "1";
            document.querySelector('#jungleRole[data-popup="true"]').style.opacity = "1"
        }
    }
    if (role == "midRole") {
        if (midRoleSelected) {
            midRoleSelected = false;
            midButton.style.opacity = "0.7";
            document.querySelector('#midRole[data-popup="true"]').style.opacity = "0.7"
        } else {
            midRoleSelected = true;
            midButton.style.opacity = "1";
            document.querySelector('#midRole[data-popup="true"]').style.opacity = "1"
        }
    }
    if (role == "bottomRole") {
        if (bottomRoleSelected) {
            bottomRoleSelected = false;
            bottomButton.style.opacity = "0.7";
            document.querySelector('#bottomRole[data-popup="true"]').style.opacity = "0.7"
        } else {
            bottomRoleSelected = true;
            bottomButton.style.opacity = "1";
            document.querySelector('#bottomRole[data-popup="true"]').style.opacity = "1"
        }
    }
    if (role == "supportRole") {
        if (supportRoleSelected) {
            supportRoleSelected = false;
            supportButton.style.opacity = "0.7";
            document.querySelector('#supportRole[data-popup="true"]').style.opacity = "0.7"
        } else {
            supportRoleSelected = true;
            supportButton.style.opacity = "1";
            document.querySelector('#supportRole[data-popup="true"]').style.opacity = "1"
        }
    }
}

function random_button() {  
    console.log(currentlySpinning)
    if (!currentlySpinning) { // Start the randomizer if there isnt already one ongoing
        currentlySpinning = true

        fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/champion.json")
        .then((response) => response.json())
        .then((json) => {

            validChamps = []
            let amountOfRolls = 45
            
            var map = Object.keys(json.data).map((key) => json.data[key])

            map.forEach(element => {
                element.owned = localStorage.getItem(element.name) === "true"
                if (localStorage.getItem(element.name) == null) {
                    element.owned = true
                    localStorage.setItem(element.name, "true")
                }

                if (element.owned){
                    if (topRoleSelected || jungleRoleSelected || midRoleSelected || bottomRoleSelected || supportRoleSelected) {
                        if (topRoleSelected) {
                            if (roleTop.includes(element.name)) {
                                validChamps.push(element.name)
                            }
                        }
                        if (jungleRoleSelected) {
                            if (roleJungle.includes(element.name)) {
                                validChamps.push(element.name)
                            }
                        }
                        if (midRoleSelected) {
                            if (roleMid.includes(element.name)) {
                                validChamps.push(element.name)
                            }
                        }
                        if (bottomRoleSelected) {
                            if (roleBottom.includes(element.name)) {
                                validChamps.push(element.name)
                            }
                        }
                        if (supportRoleSelected) {
                            if (roleSupport.includes(element.name)) {
                                validChamps.push(element.name)
                            }
                        }
                    }
                    else {
                        validChamps.push(element.name)
                    }
                }
            });

            console.log(validChamps)
            if (validChamps.length === 0) {
                alert("no valid champions")
                return;
            }

            if (roles.length > 0) {
                console.log(roles)
                console.log("Not empty!")
                for (let i = 0; i < roleSelectedChampions.length; i++) {
                    if (validChamps.includes(roleSelectedChampions[i])) {
                        console.log("It fully worked!")
                    }
                    else {
                        console.log("didnt work!")
                        console.log("validchamps:"  + validChamps)
                        print("roleselectedchampions:" + roleSelectedChampions[i])
                    }
                }

                retries = 0
                while (selectedChampion == previousRolledChampion && retries < 10) {
                    var random = Math.floor(Math.random() * validChamps.length)
                    selectedChampion = validChamps[random]
                    mapNum = 0
                    i = 1
                    retries ++


                }

                for (i = 0; i < map.length; i++) {
                    if(map[i].name == selectedChampion){
                        break;
                    }
                }
                console.log(selectedChampion)
                console.log("didnt work!")
            }

            else {
                retries = 0
                while (selectedChampion == previousRolledChampion && retries < 10) {
                    var random = Math.floor(Math.random() * validChamps.length)
                    selectedChampion = validChamps[random]
                    mapNum = 0
                    i = 1
                    retries ++
                }

                for (i = 0; i < map.length; i++) {
                    if(map[i].name == selectedChampion){
                        break;
                    }
                }
            }

            let alreadyRolled = 0
            let sleepTimer = 50

            function rollChampion() {
                // sleepTimer **= 1.002
                if (alreadyRolled < amountOfRolls) {

                    var random = Math.floor(Math.random() * validChamps.length);
                    console.log(validChamps.length)
                    if (validChamps.length > 1) { // make sure it doesnt break if only 1 champion is valid
                        while (random == previousRandom) { // make sure that it doesnt roll the same champion in a row so it looks better when spinning
                        random = Math.floor(Math.random() * validChamps.length);
                        }
                    }
                    

                    for (i = 0; i < map.length; i++) {
                        if (map[i].name == validChamps[random]) {
                            break;
                        }
                    }
                    previousRandom = random;

                    searchPic = "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/" + map[i].image.full;
                    document.getElementById("champion_name").innerHTML = "<b> ... </b>";

                    document.getElementById("champion_image").src = searchPic;
                    document.getElementById("champion_image").style.display = "inline";

                    alreadyRolled++;

                    setTimeout(rollChampion, sleepTimer);
                } else {
                    const random = Math.floor(Math.random() * validChamps.length);
                    const selectedChampion = validChamps[random];

                    if (num == -1) {
                        searchPic = "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/" + map[i].image.full;
                    } else {
                        searchPic = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + selectedChampion + "_" + num + ".jpg";
                    }
                    document.getElementById("champion_name").innerHTML = "<b> " + map[i].name + "</b>";
                    document.getElementById("champion_image").src = searchPic;
                    document.getElementById("champion_image").style.display = "inline";

                    previousRolledChampion = selectedChampion;


                    currentlySpinning = false // allow for another spin to be allowed
                    // trigger confetti 
                    console.log("Triggering confetti...");
                    tsParticles.load("tsparticles", {
                        duration: 3 * 1000,
                        animationEnd: Date.now() + 3 * 1000,
                        defaults: { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
                    });

                    function randomInRange(min, max) {
                        return Math.random() * (max - min) + min;
                    }

                    const duration = 2 * 1000;
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                    const interval = setInterval(function () {
                        const timeLeft = animationEnd - Date.now();

                        if (timeLeft <= 0) {
                            clearInterval(interval);
                            return;
                        }

                        const particleCount = 50 * (timeLeft / duration);

                        // since particles fall down, start a bit higher than random
                        confetti(
                            Object.assign({}, defaults, {
                                particleCount,
                                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                            })
                        );
                        confetti(
                            Object.assign({}, defaults, {
                                particleCount,
                                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                            })
                        );
                    }, 250);
            }
        }
        rollChampion();
    });
    }

else {
    console.log("already spinning")
}
}
    

function moveMouse(event) {
    if (event.clientX > 26 && event.clientX < supportButtonCoordinates.right - 10) {
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

// https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/Akali.png



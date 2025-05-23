const darkModeImage = document.getElementById("darkModeImage")
const darkModeToggle_light = "images/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
const darkModeToggle_dark = "images/dark_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"



const help3_text = document.querySelector(".help3")

const help3_displayTop = document.querySelector(".displayTop")
const help3_displayJungle = document.querySelector(".displayJungle")
const help3_displayMiddle = document.querySelector(".displayMiddle")
const help3_displayBottom = document.querySelector(".displayBottom")
const help3_displaySupport = document.querySelector(".displaySupport")

var roleTop = ["Aatrox", "Akshan", "Ambessa", "Aurora", "Camille", "Cho'Gath", "Darius", "Dr. Mundo", "Fiora", "Gangplank", "Garen", "Gnar", "Gragas", "Gwem", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Jayce", "K'Sante", "Kayle", "Kennen", "Kled", "Malphite", "Maokai", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Riven", "Rumble", "Sett", "Shen", "Shyvana", "Singed", "Sion", "Tahm Kench", "Teemo", "Trundle", "Tryndamere", "Urgot", "Vayne", "Volibear", "Warwick", "Yorick"]
var roleJungle = ["Ambessa", "Amumu", "Bel'Veth", "Briar", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Graves", "Gwen", "Hecarim", "Ivern", "Jarvan IV", "Karthus", "Kayn", "Kha'Zix", "Kindred", "Lee Sin", "Lillia", "Maokai", "Master Yi", "Naafiri", "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Poppy", "Rammus", "Rek'Sai", "Rengar", "Sejuani", "Shaco", "Shyvana", "Skarner", "Taliyah", "Talon", "Trundle", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "Wukong", "Xin Zhao", "Zac"]
var roleMiddle = ["Ahri", "Akali", "Akshan", "Ambessa", "Anivia", "Annie", "Aurelion Sol", "Aurora", "Azir", "Cassiopeia", "Ekko", "Fizz", "Galio", "Heimerdinger", "Hwei", "Kassadin", "Katarina", "LeBlanc", "Lissandra", "Lux", "Malzahar", "Mel", "Naafiri", "Neeko", "Orianna", "Pantheon", "Qiyana", "Quinn", "Ryze", "Singed", "Swain", "Sylas", "Syndra", "Taliyah", "Talon", "Twisted Fate", "Veigar", "Vel'Koz", "Vex", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Ziggs", "Zoe"]
var roleBottom = ["Aphelios", "Ashe", "Brand", "Caitlyn", "Corki", "Draven", "Ezreal", "Jhin", "Jinx", "Kai'Sa", "Kalista", "Kog'Maw", "Lucian", "Miss Fortune", "Nilah", "Samira", "Seraphine", "Sivir", "Smolder", "Swain", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", , "Yasuo", "Zeri", "Ziggs"]
var roleSupport = ["Alistar", "Amumu", "Bard", "Blitzcrank", "Brand", "Braum", "Janna", "Karma", "Leona", "Lulu", "Lux", "Maokai", "Milio", "Morgana", "Nami", "Nautilus", "Neeko", "Pantheon", "Poppy", "Pyke", "Rakan", "Rell", "Renata Glasc", "Senna", "Seraphine", "Sett", "Shaco", "Sona", "Soraka", "Swain", "Tahm Kench", "Taric", "Tresh", "Vel'Koz", "Xerath", "Yuumi", "Zilean", "Zyra"]


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



for (let i = 0; i < roleTop.length; i++) {
    help3_displayTop.innerHTML += `<p>${roleTop[i] + ""}</p>`
}

for (let i = 0; i < roleJungle.length; i++) {
    help3_displayJungle.innerHTML += `<p>${roleJungle[i] + ""}</p>`
}

for (let i = 0; i < roleMiddle.length; i++) {
    help3_displayMiddle.innerHTML += `<p>${roleMiddle[i] + ""}</p>`
}

for (let i = 0; i < roleBottom.length; i++) {
    help3_displayBottom.innerHTML += `<p>${roleBottom[i]}</p>`
}

for (let i = 0; i < roleSupport.length; i++) {
    help3_displaySupport.innerHTML += `<p>${roleSupport[i] + ""}</p>`
}


function openClass(number) {
    let openHelp = document.querySelector(".help" + number)
    console.log(openHelp.style.display)
    console.log(openHelp.style.display)
    console.log(openHelp.style.display)
    console.log(openHelp.style.display)
    console.log(openHelp.style.display)
    if (!openHelp.style.display) {
        openHelp.style.display = "none"
    }
    if (openHelp.style.display == "block") {
            openHelp.style.display = "none"
            console.log("hiding")
    }
    else {
        openHelp.style.display = "block"
    }
}
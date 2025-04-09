const input = document.querySelector(".input_text"),
       h2 = document.querySelector("h2")
input.addEventListener("keyup", display)

function display() {
    h2.textContent = input.value
    localStorage.setItem("h2_text", input.value)
}

window.onload = (event) => {
   h2.textContent = localStorage.getItem("h2_text");
  };
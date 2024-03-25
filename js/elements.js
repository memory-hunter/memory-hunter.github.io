let hoverSound = document.getElementById("hover-sound");
let clickSound = document.getElementById("click-sound");
let entrySound = document.getElementById("entry-sound");
let loopSound = document.getElementById("loop-sound");

window.onload = function () {
  entrySound.play();
};

entrySound.onended = function () {
  loopSound.play();
};

let menuEntries = document.getElementsByClassName("menu-entry");
for (let i = 0; i < menuEntries.length; i++) {
  menuEntries[i].addEventListener("mouseover", function () {
    hoverSound.volume = 0.4;
    hoverSound.play();
  });
  menuEntries[i].addEventListener("click", function (e) {
    hoverSound.volume = 0.4;
    clickSound.play();
  });
}

document.querySelectorAll(".menu-entry").forEach((entry) => {
  entry.addEventListener("click", (event) => {
    const overlayId = event.target.getAttribute("data-overlay");
    // fade in
    document.getElementById(overlayId).style.display = "block";
    document.getElementById(overlayId).style.opacity = 0;
    (function fade() {
      var val = parseFloat(document.getElementById(overlayId).style.opacity);
      if (!((val += 0.05) > 1)) {
        document.getElementById(overlayId).style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  });
});

document.querySelectorAll(".close-button").forEach((button) => {
  button.addEventListener("click", () => {
    (function fade() {
      var val = parseFloat(button.parentElement.style.opacity);
      if ((val -= 0.05) > 0) {
        button.parentElement.style.opacity = val;
        requestAnimationFrame(fade);
      } else {
        button.parentElement.style.display = "none";
      }
    })(); 
  });
});

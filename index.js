const body = document.getElementById("body");
let didUserInteract = false;
let activeTectide = 0;
let tectusImages = 0;

function createTectus() {
    if (activeTectide >= 5) return;
    console.log(tectusImages);

    const riseMountinsAudio = new Audio("public/rise-mountains.mp3");

    const tectus = document.createElement("img");
    tectus.setAttribute("src", "public/tectus.webp");
    tectus.setAttribute("id", "tectus");

    riseMountinsAudio.addEventListener("ended", () => {
        activeTectide--;
        createTectus();
        createTectus();
        if (body.clientWidth < 500) {
            if (tectusImages >= 50) {
                body.removeChild(tectus);
                tectusImages--;
            }
        } else {
            if (tectusImages >= 200) {
                body.removeChild(tectus);
                tectusImages--;
            }
        }
    });

    const delay = Math.random() * 3000;
    setTimeout(() => {
        riseMountinsAudio.play();

        let topPosition = Math.floor(Math.random() * body.clientHeight - 150);
        let leftPosition = Math.floor(Math.random() * body.clientWidth - 150);

        tectus.style.top = topPosition + "px";
        tectus.style.left = leftPosition + "px";
        body.appendChild(tectus);
        activeTectide++;
        tectusImages++;
    }, delay);
}

function userInteracted() {
    const whatIsThisAudio = new Audio("public/what-is-this.mp3");
    whatIsThisAudio.play();
    whatIsThisAudio.addEventListener("ended", () => {
        createTectus();
    });
}

body.addEventListener("click", () => {
    if (didUserInteract === true) return;
    didUserInteract = true;
    userInteracted();
});

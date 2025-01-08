const body = document.getElementById("body");
const area = document.querySelector(".area");
let activeTectide = 0;
let tectusImages = 0;

function createTectus() {
    if (activeTectide >= 5) return;
    activeTectide++;
    const riseMountinsAudio = new Audio("public/rise-mountains.mp3");

    riseMountinsAudio.addEventListener("ended", () => {
        activeTectide--;
        createTectus();
        createTectus();

        const firstTectus = area.firstChild;
        if (body.clientWidth < 500) {
            if (tectusImages >= 50) {
                area.removeChild(firstTectus);
                tectusImages--;
            }
        } else {
            if (tectusImages >= 200) {
                area.removeChild(firstTectus);
                tectusImages--;
            }
        }
    });

    const delay = Math.random() * 3000;
    setTimeout(() => {
        riseMountinsAudio.play();

        const tectus = document.createElement("img");
        tectus.setAttribute("src", "public/tectus.webp");
        tectus.setAttribute("class", "tectus");

        const topPosition = Math.floor(Math.random() * body.clientHeight - 150);
        const leftPosition = Math.floor(Math.random() * body.clientWidth - 150);
        tectus.style.top = topPosition + "px";
        tectus.style.left = leftPosition + "px";

        area.appendChild(tectus);
        tectusImages++;
    }, delay);
}

function userInteracted() {
    body.removeEventListener("click", userInteracted);

    const whatIsThisAudio = new Audio("public/what-is-this.mp3");
    whatIsThisAudio.play();
    whatIsThisAudio.addEventListener("ended", () => {
        createTectus();
    });
}

body.addEventListener("click", userInteracted);

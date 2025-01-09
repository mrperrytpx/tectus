const body = document.querySelector("body");
const area = document.querySelector(".area");

let audioContext = null;
let audioBuffer = null;

async function loadAudio(url) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const response = await fetch(url);
    const audioData = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(audioData);
}

function getAudioSource(buffer) {
    if (!audioBuffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    return source;
}

let activeTectide = 0;
let tectusImages = 0;

function createTectus() {
    if (activeTectide >= 4) return;
    activeTectide++;

    const delay = Math.random() * 3000;
    setTimeout(() => {
        const riseMountainsAudio = getAudioSource(audioBuffer);
        riseMountainsAudio.start();

        riseMountainsAudio.onended = () => {
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

            riseMountainsAudio.disconnect();
            riseMountainsAudio.onended = null;
        };

        const topPosition = Math.floor(
            Math.random() * (body.clientHeight - 150)
        );
        const leftPosition = Math.floor(
            Math.random() * (body.clientWidth - 150)
        );

        const tectus = document.createElement("img");
        tectus.src = "public/tectus.webp";
        tectus.className = "tectus";
        tectus.style.top = topPosition + "px";
        tectus.style.left = leftPosition + "px";

        area.appendChild(tectus);
        tectusImages++;
    }, delay);
}

function userInteracted() {
    body.removeEventListener("click", userInteracted);
    loadAudio("public/rise-mountains.mp3");

    const whatIsThisAudio = new Audio("public/what-is-this.mp3");
    whatIsThisAudio.play();
    whatIsThisAudio.addEventListener("ended", createTectus);
}

body.addEventListener("click", userInteracted);

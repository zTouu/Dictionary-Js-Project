const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"; //dictionary API url

const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inputword = document.getElementById("inputword").value;
    fetch(`${url}${inputword}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inputword}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            sound.setAttribute("src", data[0].phonetics[0].audio); //Already fixed, the old codes was => "sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);"
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });

});

function playSound(){
    sound.play();
}

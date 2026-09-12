/*console.log("lets write javascript");

let currentSong = new Audio();
let songs;
let currfolder;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currfolder = folder;
    let a = await fetch(`Assets/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

   

    //SHOW ALL THE SONGS IN THE PLAYLIST
    let songUL = document.querySelector(".songList ").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="Assets/images/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Vaijavi</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="Assets/images/play.svg" alt=" ">
                            </div>
         </li>`;
    }

    //ATTACH AN EVENT LISTENER TO EACH SONG
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
       e.addEventListener("click", element => {
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
       });
    });
 return songs 
}
const playMusic = (track, pause = false) => {
    console.log("Playing:", track);
console.log("Current src:", currentSong.src);
     //let audio = new Audio("/Assets/songs/" +track)
    currentSong.src = `Assets/${currfolder}/` + track;

    if (!pause) {
        currentSong.play();
        play.src = "Assets/images/pause.svg";
      
    }
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    let a = await fetch("Assets/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    console.log(div)
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

       if (
    e.href.includes("/Assets/songs/cs") ||
    e.href.includes("/Assets/songs/party_songs") ||
    e.href.includes("/Assets/songs/K_PoP") ||
    e.href.includes("/Assets/songs/Sad_Songs")||
    e.href.endsWith("/Assets/songs/ncs")||
    e.href.endsWith("/Assets/songs/Hindi_lofi_Mix") ||
    e.href.endsWith("/Assets/songs/Relax_Mind_Lofi")||
    e.href.endsWith("/Assets/songs/Bollywood_hindi")
) {
         let folder = e.href.split("/").filter(Boolean).pop(); 
         // Skip parent folders
          if (folder === "songs" && folder === "Assets") { 
            continue;
          }


            let a = await fetch(`Assets/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                             <div class="play">
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 20V4L19 12L5 20Z" fill="#000" stroke="#141B34" stroke-width="1.5"
                              stroke-linejoin="round">
                        </svg>
                      </div> <img src="Assets/songs/${folder}/cover.jpg">
                     <h2>${response.title}</h2>
                      <p>${response.description}</p>
                   </div>`
        }
    }
    //LOAD THE PLAYLIST WHEN CLICKED TO CARD
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log(item, item.currentTarget.dataset)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0])
        });
    });

}
async function main() {
    //GET THE LIST OF SONG
    await getSongs("songs/ncs");
    playMusic(songs[0], true)

    //DISPLAY ALL YHE ALBUMS ON THE PAGE
    displayAlbums()

    //ATTACH AN EVENT LISTENER TO PLAY, NEXT AND PREVIOUS
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "Assets/images/pause.svg";
        } else {
            currentSong.pause();
            play.src = "Assets/images/play.svg";
        }
    });

    // listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    //ADD AN EVENT LISTENER TO SEEKBAR
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    //ADD AN EVENT LISTENER FOR HAMBURGER
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    //ADD AN EVENT LISTENER FOR CLOSE BUTTON
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    //ADD AN EVENT LISTENER FOR PREVIOUS BUTTON
    previous.addEventListener("click", () => {
        console.log("PREVIOUS CLICKED")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(songs, index)
       // if ([index - 1] >= length) {
           // playMusic(songs[index - 1])
        //}
        if (index > 0) {
    playMusic(songs[index - 1]);
}
    })

    //ADD AN EVENT LISTENER FOR NEXT BUTTON
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("NEXT CLICKED")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(songs, index)
        //if ([index + 1] < songs.length) {
           // playMusic(songs[index + 1])
       // }
       if (index < songs.length - 1) {
    playMusic(songs[index + 1]);
}

    })

    //ADD AN EVENT TO VOLUME
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, " / 100")
        currentSong.volume = parseInt(e.target.value) / 100
    })

    //ADD AN EVENT LISTENER TO VOLUME
    document.querySelector(".volume>img").addEventListener("click", e=>{ 
        if(e.target.src.includes("volume.svg")){
          e.target.src =  e.target.src.replace("volume.svg","mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
          e.target.src =  e.target.src.replace("mute.svg","volume.svg")
            currentSong.volume = 0.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    })

}



main();
*/

console.log("lets write javascript");

let currentSong = new Audio();
let songs;
let currfolder;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currfolder = folder;

    let res = await fetch(`Assets/${folder}/songs.json`);
    songs = await res.json();

    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML += `
        <li>
            <img class="invert" src="Assets/images/music.svg">
            <div class="info">
                <div>${song}</div>
                <div>Vaijavi</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="Assets/images/play.svg">
            </div>
        </li>`;
    }

    Array.from(songUL.getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {
            playMusic(li.querySelector(".info div").innerHTML.trim());
        });
    });

    return songs;
}

   

    //SHOW ALL THE SONGS IN THE PLAYLIST
  /*  let songUL = document.querySelector(".songList ").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="Assets/images/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Vaijavi</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="Assets/images/play.svg" alt=" ">
                            </div>
         </li>`;
    }

    //ATTACH AN EVENT LISTENER TO EACH SONG
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
       e.addEventListener("click", element => {
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
       });
    });
 return songs 
}*/
const playMusic = (track, pause = false) => {
    console.log("Playing:", track);
console.log("Current src:", currentSong.src);
     //let audio = new Audio("/Assets/songs/" +track)
    currentSong.src = `Assets/${currfolder}/` + track;

    if (!pause) {
        currentSong.play();
        play.src = "Assets/images/pause.svg";
      
    }
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    const albums = [
        "ncs","cs","party_songs","K_PoP",
        "Sad_Songs","Hindi_lofi_Mix",
        "Relax_Mind_Lofi","Bollywood_hindi"
    ];

    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";

    for (const folder of albums) {
        let response = await (
            await fetch(`Assets/songs/${folder}/info.json`)
        ).json();

        cardContainer.innerHTML += `
        <div data-folder="${folder}" class="card">
            <div class="play">▶</div>
            <img src="Assets/songs/${folder}/cover.jpg">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`;
    }

    Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.addEventListener("click", async () => {
            songs = await getSongs(`songs/${card.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
}
async function main() {
    //GET THE LIST OF SONG
    await getSongs("songs/ncs");
    playMusic(songs[0], true)

    //DISPLAY ALL YHE ALBUMS ON THE PAGE
    displayAlbums()

    //ATTACH AN EVENT LISTENER TO PLAY, NEXT AND PREVIOUS
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "Assets/images/pause.svg";
        } else {
            currentSong.pause();
            play.src = "Assets/images/play.svg";
        }
    });

    // listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    //ADD AN EVENT LISTENER TO SEEKBAR
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    //ADD AN EVENT LISTENER FOR HAMBURGER
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    //ADD AN EVENT LISTENER FOR CLOSE BUTTON
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    //ADD AN EVENT LISTENER FOR PREVIOUS BUTTON
    previous.addEventListener("click", () => {
        console.log("PREVIOUS CLICKED")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(songs, index)
       // if ([index - 1] >= length) {
           // playMusic(songs[index - 1])
        //}
        if (index > 0) {
    playMusic(songs[index - 1]);
}
    })

    //ADD AN EVENT LISTENER FOR NEXT BUTTON
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("NEXT CLICKED")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(songs, index)
        //if ([index + 1] < songs.length) {
           // playMusic(songs[index + 1])
       // }
       if (index < songs.length - 1) {
    playMusic(songs[index + 1]);
}

    })

    //ADD AN EVENT TO VOLUME
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, " / 100")
        currentSong.volume = parseInt(e.target.value) / 100
    })

    //ADD AN EVENT LISTENER TO VOLUME
    document.querySelector(".volume>img").addEventListener("click", e=>{ 
        if(e.target.src.includes("volume.svg")){
          e.target.src =  e.target.src.replace("volume.svg","mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
          e.target.src =  e.target.src.replace("mute.svg","volume.svg")
            currentSong.volume = 0.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    })

}



main();





window.addEventListener("load", () => {
    adicionarFiltro("busca-album", "album");
    adicionarFiltro("busca-musica", "musica");

    var selectMusica = document.querySelector("#musica");

    var player = document.querySelector("#player-de-musica");
    var btnPlayPlause = document.querySelector("#play-pause");
    var btnNext = document.querySelector("#next");
    var btnPrevious = document.querySelector("#previous");
    var seekbar = document.querySelector("#seekbar");
    var volume = document.querySelector("#player-volume");

    var playIcon = "<span class='material-icons'>play_circle</span>";
    var pauseIcon = "<span class='material-icons'>pause_circle</span>";

    var playing = false;

    function play_pause() {
        if (playing) {
            playing = false;
            player.pause();
            btnPlayPlause.innerHTML = playIcon;
        } else {
            playing = true;
            player.play();
            btnPlayPlause.innerHTML = pauseIcon;
        }
    }

    function updateMusica() {
        var arquivoMusica = selectMusica.children[selectMusica.selectedIndex].getAttribute("musica");
        player.src = "/musicas/" + arquivoMusica;

        setTimeout(() => {
            playing = false;
            play_pause();
        }, 20);
    }

    document.querySelector("#album").addEventListener("change", function (evento) {
        if (this.selectedIndex >= 0) {
            console.log(this.value);
            document.querySelector("#id_album").value = this.value;
            document.querySelector("#album-form").submit();
        }
    });

    selectMusica.addEventListener("change", function() {
        updateMusica();
    });

    btnPlayPlause.addEventListener("click", function () {        
        play_pause();        
    });

    btnNext.addEventListener("click", function () {
        var currentIndex = selectMusica.selectedIndex;
        var nextOption = selectMusica.children[currentIndex + 1];
        if (nextOption) {
            selectMusica.value = nextOption.value;
            updateMusica();
        }
    });

    btnPrevious.addEventListener("click", function() {
        var currentIndex = selectMusica.selectedIndex;
        var nextOption = selectMusica.children[currentIndex - 1];
        if (nextOption) {
            selectMusica.value = nextOption.value;
            updateMusica();
        }
    });

    player.addEventListener("loadedmetadata", function(){        
        seekbar.max = Math.abs(this.duration);
        document.querySelector("#tempo-total").innerText = fancyTimeFormat(this.duration);
    });

    player.addEventListener("timeupdate", function(){        
        seekbar.value = this.currentTime;
        document.querySelector("#tempo-atual").innerText = fancyTimeFormat(this.currentTime);        
    });

    seekbar.addEventListener("change", function() {
        player.currentTime = this.value;
    });

    player.addEventListener("ended", function() {
        player.currentTime = 0;
        
        if (!isRepeat) {
            var currentIndex = selectMusica.selectedIndex;
            var options = Array.from(selectMusica.children);
            var nextOption;
            
            if (isShuffle) {
                // Seleciona uma música aleatória diferente da atual
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * options.length);
                } while (randomIndex === currentIndex && options.length > 1);
                nextOption = options[randomIndex];
            } else {
                nextOption = selectMusica.children[currentIndex + 1];
            }
            
            if (nextOption) {
                selectMusica.value = nextOption.value;
                updateMusica();
            }
        }
        
        play_pause();
    });

    var volumeNo = "<span class='material-icons'>volume_off</span>";
    var volumeFull = "<span class='material-icons'>volume_up</span>";
    var volumeLow = "<span class='material-icons'>volume_down</span>";
    var volumeLowest = "<span class='material-icons'>volume_mute</span>";
    var volumeIcon = document.querySelector("#volume-icon");

    volume.addEventListener("change", function() {
        player.volume = this.value;
        
        if (this.value > 0.7) {
            volumeIcon.innerHTML = volumeFull;
        } else if (this.value > 0.2) {
            volumeIcon.innerHTML = volumeLow;
        } else if (this.value > 0.01) {
            volumeIcon.innerHTML = volumeLowest;
        } else {            
            volumeIcon.innerHTML = volumeNo;
        }
    });

    const eventChange = new Event("change");

    volumeIcon.addEventListener("click", function() {
        if (volume.value > 0) {
            volume.value = 0;
        } else {
            volume.value = 1;
        }

        volume.dispatchEvent(eventChange);
    });

    // setInterval(() => {
    //     console.log('a ', player.currentTime);
    //     console.log('b ', player.duration);
    // }, 500);

    // Novos elementos
    const btnRepeat = document.querySelector("#repeat");
    const btnShuffle = document.querySelector("#shuffle");
    const btnSpeed = document.querySelector("#playback-speed");
    
    // Novas variáveis de controle
    let isRepeat = false;
    let isShuffle = false;
    const speedLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];
    let currentSpeedIndex = 2; // Começa em 1x (índice 2)
    
    // Controle de repetição
    btnRepeat.addEventListener("click", function() {
        isRepeat = !isRepeat;
        this.classList.toggle("active-control");
        player.loop = isRepeat;
    });
    
    // Controle de reprodução aleatória
    btnShuffle.addEventListener("click", function() {
        isShuffle = !isShuffle;
        this.classList.toggle("active-control");
    });
    
    // Controle de velocidade
    btnSpeed.addEventListener("click", function() {
        currentSpeedIndex = (currentSpeedIndex + 1) % speedLevels.length;
        const newSpeed = speedLevels[currentSpeedIndex];
        player.playbackRate = newSpeed;
        this.textContent = newSpeed + "x";
    });
});

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
  }
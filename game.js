const how_many_photos = 3;
const board_size = 600;
var game_difficulty;
var img_number = 0;
var ruch = []
var win = []

var tab = ["security", "izak", "dog", "lewo", "prawo"]
var klik = 0;
var m = false;
var sliding = 0;

create_slider_layout();
create_buttons();
var timer1 = new _timer();
timer1.show();

function create_slider_layout(){
    var main = document.createElement("div")
        main.id = "main"
    var slider_panel = document.createElement("div")
        slider_panel.id = "slider_panel"
    var slide = document.createElement("div")
        slide.id = "slide"
        slide.style.left = 200 + "px";
        slide.className = "zdj"
    var slide2 = document.createElement("div")
        slide2.id = "slide2"
    var photo = document.createElement("div")
        photo.id = "photo0"
        photo.className = "zdj_wybor"
        photo.style.backgroundImage = "url('images/photo0.png')";
        photo.style.left = 200 + "px";
    slide2.appendChild(photo)
    slide.appendChild(slide2)
    slider_panel.appendChild(slide)
    for (let i = 0; i < 2; i++) {
        let arrow = document.createElement("div")
        arrow.style.backgroundImage = "url('images/arrow" + i + ".png')";
        arrow.style.backgroundSize = 200 + "px";
        arrow.style.left = 200 * i * 2 + "px";
        arrow.style.cursor = "pointer";
        arrow.className = "arrows"
        arrow.id = "zdj" + i
        arrow.addEventListener("click", function(){slider_shifting(i)})
        slider_panel.appendChild(arrow);
    }
    main.appendChild(slider_panel)
    document.body.appendChild(main)
    document.getElementById("slide2").scrollLeft = 200;
}

function slider_shifting(arrow_i){
    if (document.getElementById("plansza")) {
        document.getElementById("plansza").remove();
    }
    prev_img_number = img_number;
    img_number += -1+2*arrow_i;
    img_number = img_number == -1? how_many_photos-1 : (img_number==how_many_photos? 0 : img_number);
    let max_scroll_left = arrow_i==0? 0 : 400;
    var next_photo = document.createElement("div");
        next_photo.id = "photo"+ img_number;
        next_photo.className = "zdj_wybor";
        next_photo.style.backgroundImage = "url('images/photo" + img_number + ".png')";
        next_photo.style.left = (arrow_i*400) + "px";
    document.getElementById("slide2").appendChild(next_photo);
    var animation1 = setInterval(shifting, 1);
    function shifting() {
        if (parseInt(document.getElementById("slide2").scrollLeft) == max_scroll_left) {
            clearInterval(animation1)
            document.getElementById("photo"+prev_img_number).remove();
            document.getElementById("photo"+img_number).style.left = 200 + "px";
            document.getElementById("slide2").scrollLeft = 200;
            document.getElementById("slider_panel").style.pointerEvents="auto"
        }
        else {
            document.getElementById("slide2").scrollLeft += -2+(4*arrow_i);
            document.getElementById("slider_panel").style.pointerEvents="none";
        }
    }
}

function create_buttons(){
    var butt = document.createElement("div")
        butt.id = "butt"
    document.getElementById("main").appendChild(butt)

    for (let i = 0; i < 4; i++) {
        let bt = document.createElement("button")
            bt.id = "bt" + (i + 3)
            bt.innerText = (i + 3) + "x" + (i + 3)
            bt.onclick = function(){create_board(i+3)}
        document.getElementById("butt").appendChild(bt)
    }
}

function create_board(tiles_qty){
    if(document.getElementById("plansza")){
        document.getElementById("plansza").remove();
    }
    var board = document.createElement("div")
    board.id = "plansza"
    board.style.width = 600 + "px"
    document.getElementById("main").appendChild(board)
    let size = board_size/tiles_qty;
    for (let i = 0; i < tiles_qty; i++) {
        ruch[i] = []
        win[i] = []
        for (let j = 0; j < tiles_qty; j++) {
            var tile = document.createElement("div")
                tile.id = "puzel" + i + "_" + j
                tile.className = "puzel"
                tile.style.width = size + "px"
                tile.style.height = size + "px"
                tile.style.left = j * size + "px"
                tile.style.top = i * size + "px"
            if (i==0 && j==tiles_qty-1) {
                tile.style.background = "black"
                tile.id = "black"
            }
            else {
                tile.style.backgroundImage = "url('images/photo" + img_number + ".png')";
                tile.style.backgroundPositionX = "-" + (j * size) + "px"
                tile.style.backgroundPositionY = "-" + (i * size) + "px"
            }
            ruch[i][j] = tile.id
            win[i][j] = tile.id
            document.getElementById("plansza").appendChild(tile)
        }
    }
    mixing_puzzles(tiles_qty);
}

//start_timer();
function _timer(){
    let mili,sec,min,hour,liczinterval,licznik;

    this.show = function(){
        if(liczinterval){
            clearInterval(liczinterval);
        }
        if(document.getElementById("graficzny_licznik")){
            document.getElementById("graficzny_licznik").remove();
        }
        var timer = document.createElement("div")
        timer.id = "graficzny_licznik"
        document.getElementById("main").appendChild(timer)
        for (var i = 0; i < 11; i++) {
            var slot = document.createElement("div")
            slot.className = "graficzny"
            slot.id = "cyferka" + i
            let bg_img = (i==1 || i==4) ? "colon" : (i==7? "dot" : "c0");
            slot.style.backgroundImage = "url('images/timer/"+bg_img+".gif')"
            if(i==1 || i==4 || i==7){
                slot.style.width = 9 + "px";
            }
            document.getElementById("graficzny_licznik").appendChild(slot)
        }
    }
    this.start = function(){
        var time_start = new Date(Date.now())
        liczinterval = setInterval(function () {
            time = new Date((new Date(Date.now())) - time_start);
            mili = time.getMilliseconds().toString().padStart(3,'0');
            sec = time.getSeconds().toString().padStart(2,'0');
            min = time.getMinutes().toString().padStart(2,'0');
            hour = (time.getHours() - 1).toString();
            licznik = hour + ':' + min + ':' + sec + '.' + mili
            console.log(licznik);
            for (var i = 0; i < licznik.length; i++) {
                if (licznik[i] != ':' && licznik[i] != '.') {
                    document.getElementById("cyferka" + i).style.background = "url('images/timer/c" + licznik[i] + ".gif')"
                }
            }
        },1)
    }
    this.stop = function(){
        clearInterval(liczinterval)
        return licznik
    }
}

function mixing_puzzles(tiles_qty){
    let  kierunek, oldkierunek, pion, poziom, warunek;
    let  n=0, size=board_size/tiles_qty, x=0,  y=tiles_qty-1;
    document.body.style.pointerEvents = "none";
    var mixing = setInterval(function () {
        warunek = false;
        while (warunek == false) {
            kierunek = Math.round(Math.random() * 3);
            pion = kierunek==0? -1 : (kierunek==1? 1 : 0);
            poziom = kierunek==2? -1 : (kierunek==3? 1 : 0);
            if (x+poziom!=tiles_qty && x+poziom!=-1 && y+pion!=tiles_qty && y+pion!=-1) {
                if (kierunek+oldkierunek!=5 && kierunek+oldkierunek!=1) {
                    warunek=true;
                }
            }
        }
        ruch[x][y] = ruch[x + poziom][y + pion]
        ruch[x + poziom][y + pion] = "black"
        var swap = document.getElementById(ruch[x][y])
            swap.style.left = (y * size) + "px"
            swap.style.top = (x * size) + "px"
        var schwarz = document.getElementById("black")
            schwarz.style.left = ((y + pion) * size) + "px"
            schwarz.style.top = ((x + poziom) * size) + "px"
        y = y + pion
        x = x + poziom
        oldkierunek = kierunek
        n++;
        if(n==tiles_qty*tiles_qty*10){
            clearInterval(mixing);
            document.body.style.pointerEvents = "auto";
        }
    },20);
}
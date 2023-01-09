const how_many_photos = 3;
const board_size = 600;
let puzzle_board, win_check, img_number = 0;

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
    timer1.show();
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
    timer1.show();
    win_check = [], puzzle_board = [];
    if(document.getElementById("plansza")){
        document.getElementById("plansza").remove();
    }
    var board = document.createElement("div")
    board.id = "plansza"
    board.style.width = 600 + "px"
    document.getElementById("main").appendChild(board)
    let size = board_size/tiles_qty;
    for (let i = 0; i < tiles_qty; i++) {
        win_check[i] = []
        for (let j = 0; j < tiles_qty; j++) {
            var tile = document.createElement("div")
                tile.id = "puzel" + i + "_" + j
                tile.className = "puzel"
                tile.style.width = size + "px"
                tile.style.height = size + "px"
                tile.style.left = j * size + "px"
                tile.style.top = i * size + "px"
                tile.style.cursor = "pointer"
            if (i==0 && j==tiles_qty-1) {
                tile.style.background = "black"
                tile.id = "black"
            }
            else {
                tile.style.backgroundImage = "url('images/photo" + img_number + ".png')";
                tile.style.backgroundPositionX = "-" + (j * size) + "px"
                tile.style.backgroundPositionY = "-" + (i * size) + "px"
            }
            win_check[i][j] = tile.id
            document.getElementById("plansza").appendChild(tile)
        }
    }
    puzzle_board = win_check;
    win_check =  JSON.stringify(win_check);
    mixing_puzzles(tiles_qty);
}

function _timer(){
    let mili,sec,min,hour,count_interval,counter;

    this.show = function(){
        if(count_interval){
            clearInterval(count_interval);
        }
        if(document.getElementById("graphic_counter")){
            document.getElementById("graphic_counter").remove();
        }
        var timer = document.createElement("div")
        timer.id = "graphic_counter"
        document.getElementById("main").appendChild(timer)
        for (let i = 0; i < 11; i++) {
            let bg_img = (i==1 || i==4) ? "colon" : (i==7? "dot" : "c0");
            let slot = document.createElement("div")
                slot.className = "graficzny"
                slot.id = "cyferka" + i
                slot.style.backgroundImage = "url('images/timer/"+bg_img+".gif')"
            if(i==1 || i==4 || i==7){
                slot.style.width = 9 + "px";
            }
            document.getElementById("graphic_counter").appendChild(slot)
        }
    }
    this.start = function(){
        var time_start = new Date(Date.now())
        count_interval = setInterval(function () {
            time = new Date((new Date(Date.now())) - time_start);
            mili = time.getMilliseconds().toString().padStart(3,'0');
            sec = time.getSeconds().toString().padStart(2,'0');
            min = time.getMinutes().toString().padStart(2,'0');
            hour = (time.getHours() - 1).toString();
            counter = hour + ':' + min + ':' + sec + '.' + mili
            for (var i = 0; i < counter.length; i++) {
                if (counter[i] != ':' && counter[i] != '.') {
                    document.getElementById("cyferka" + i).style.background = "url('images/timer/c" + counter[i] + ".gif')"
                }
            }
        },1)
    }
    this.stop = function(){
        clearInterval(count_interval)
        return counter
    }
}

function mixing_puzzles(tiles_qty){
    let  direction, old_direction, vert, horiz, check;
    let  how_many_times=tiles_qty*tiles_qty*10, size=board_size/tiles_qty, black = {x: 0, y: tiles_qty-1};
    document.body.style.pointerEvents = "none";
    var mixing = setInterval(function () {
        check = false;
        while (check == false) {
            direction = Math.round(Math.random() * 3);
            vert = direction==0? -1 : (direction==1? 1 : 0);
            horiz = direction==2? -1 : (direction==3? 1 : 0);
            if (black.x+horiz!=tiles_qty && black.x+horiz!=-1 && black.y+vert!=tiles_qty && black.y+vert!=-1) {
                if (direction+old_direction!=5 && direction+old_direction!=1) {
                    check=true;
                }
            }
        }
        black = tiles_swap(black, black.x+horiz, black.y+vert, size)
        old_direction = direction
        how_many_times--;
        if(how_many_times<=0){
            clearInterval(mixing);
            gameplay(tiles_qty, {x: black.x, y: black.y});
            timer1.start();
        }
    },20);
}

function gameplay(tiles_qty, black){
    let clickable_tiles, size = board_size/tiles_qty;
    document.body.style.pointerEvents = "auto";
    document.getElementById("plansza").onclick = function(ev){
        clickable_tiles = [];
        if (black.x < tiles_qty - 1) {
            clickable_tiles.push({x: black.x + 1, y: black.y})
        }
        if (black.x > 0) {
            clickable_tiles.push({x: black.x - 1, y: black.y})
        }
        if (black.y < tiles_qty - 1) {
            clickable_tiles.push({x: black.x, y: black.y + 1})
        }
        if (black.y > 0) {
            clickable_tiles.push({x: black.x, y: black.y - 1})
        }
        for(let i = 0; i<clickable_tiles.length; i++){
            if(ev.target.id == puzzle_board[clickable_tiles[i].x][clickable_tiles[i].y]){
                black = tiles_swap(black, clickable_tiles[i].x, clickable_tiles[i].y, size)
                check_for_win()
                break;
            }
        }
    }
}

function tiles_swap(pos_black, x, y, size){
    puzzle_board[pos_black.x][pos_black.y] = puzzle_board[x][y];
    puzzle_board[x][y] = "black";
    var swap = document.getElementById(puzzle_board[pos_black.x][pos_black.y])
        swap.style.left = pos_black.y * size + "px"
        swap.style.top = pos_black.x * size + "px"
    var schwarz = document.getElementById("black")
        schwarz.style.left = y * size + "px"
        schwarz.style.top = x * size + "px"
    pos_black.x = x
    pos_black.y = y
    return pos_black;
}

function check_for_win(){
    if(JSON.stringify(puzzle_board)==win_check){
        document.getElementById("plansza").style.pointerEvents = "none";
        prompt("YOU WON! Your time: "+timer1.stop()+",guest");
        ///todo cookies, tabela
    }
}

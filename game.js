const how_many_photos = 3;
var tab = ["security", "izak", "dog", "lewo", "prawo"]
var ruch = []
var win = []
var n = 0;
var klik = 0;
var game_difficulty = null; //kiedys rozmiar
var licznik
var img_number = 0;
var m = false;
var sliding = 0;

create_layout();

function create_layout(){
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

function slider_shifting(i){
    if (game_difficulty != null) {
        document.getElementById("plansza").remove();
        game_difficulty = null;
    }
    prev_img_number = img_number;
    img_number += -1+2*i;
    img_number = img_number == -1? how_many_photos-1 : img_number;
    img_number = img_number == how_many_photos? 0 : img_number;
    let max_scroll_left = i==0? 0 : 400;
    var next_photo = document.createElement("div");
    next_photo.id = "photo"+ img_number;
    next_photo.className = "zdj_wybor";
    next_photo.style.backgroundImage = "url('images/photo" + img_number + ".png')";
    next_photo.style.left = (i*400) + "px";
    console.log(next_photo.style.left)
    document.getElementById("slide2").appendChild(next_photo);
    var animate = setInterval(frame, 1);
    function frame() {
        if (parseInt(document.getElementById("slide2").scrollLeft) == max_scroll_left) {
            clearInterval(animate)
            document.getElementById("photo"+prev_img_number).remove();
            document.getElementById("photo"+img_number).style.left = 200 + "px";
            document.getElementById("slide2").scrollLeft = 200;
            document.getElementById("slider_panel").style.pointerEvents="auto"
        }
        else {
            console.log(max_scroll_left+ ' - '+ document.getElementById("slide2").scrollLeft )
            document.getElementById("slide2").scrollLeft += -2+(4*i);
            document.getElementById("slider_panel").style.pointerEvents="none";
        }
    }
}

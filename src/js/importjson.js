document.getElementById('rankingsfile').addEventListener('change', readURL, true);

var isUploaded = false;

function readURL(){
    isUploaded = true;
    console.log(isUploaded);
}

function importJson(file) {

    const array = [];
    var temp = [];

    for(var i in file) {
        array.push([i,file[i]]);
    }

    temp = array[0]
    const team_names = temp[1];

    temp = array[1]
    const text_colours = temp[1];

    temp = array[2]
    const bg_colours = temp[1];

    temp = array[3]
    const logo_urls = temp[1];

    var wrapper = document.getElementById("wrapperid");
    wrapper.innerHTML = "";
    var overflow = document.getElementById("overflowwrapper");
    overflow.innerHTML = "";

    for (var i = 0; i < team_names.length; i++) {

        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        const itemLogo = document.createElement("div");
        itemLogo.className = "item-logo";
        const itemText = document.createElement("div");
        itemText.className = "item-text";

        itemDiv.appendChild(itemLogo)
        itemDiv.appendChild(itemText)
        itemText.innerText = team_names[i];
        itemText.style.color = text_colours[i];
        itemLogo.style.backgroundImage = logo_urls[i];
        itemDiv.style.backgroundColor = bg_colours[i];

        if (i < 10){
            wrapper.appendChild(itemDiv);
        }
        else {
            overflow.appendChild(itemDiv);
        }
    }
}

function loadDefault() {
    $.getJSON("./assets/default.json", function(json) {
        importJson(json);
    });
}

function addRankings() {
    var file = document.getElementById("rankingsfile").files[0];
    path = file["path"];

    console.log(path);

    $.getJSON(path, function(json) {
        importTeamJson(json);
    });

    $(".import-container").removeClass('show');
    $(".import-container").addClass('hidden');
}

document.onload = loadDefault()

var button = document.querySelector('#importSubmit');
button.addEventListener('click', (event) => {
    addRankings();
});
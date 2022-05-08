function importJSON(file) {
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

    var wrapper = document.getElementById("wrapperid")

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
        itemLogo.style.backgroundImage = "url(" + logo_urls[i] + ")";    
        itemDiv.style.backgroundColor = bg_colours[i];

        wrapper.appendChild(itemDiv);
    }
}

function loadDefault() {
    $.getJSON("./assets/default.json", function(json) {
        importJSON(json);
    });
}

document.onload = loadDefault()
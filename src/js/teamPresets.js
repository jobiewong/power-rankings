var ele = document.getElementById('sel')
var logoScale = 75;

// Logo slider
let slider = document.getElementById("presetSlider");
var sliderPreview = document.getElementById('slider-preview');

slider.addEventListener('input', e => {
    sliderPreview.innerHTML = e.target.value + "%";
    logoScale = e.target.value;
})

// Functions

function importTeamJson(file) {
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

    for (var i = 0; i < team_names.length; i++) {
        // Populate select element with data

        parse_data = team_names[i] + "_" + text_colours[i] + "_" + bg_colours[i] + "_" + logo_urls[i]

        ele.innerHTML = ele.innerHTML +
            '<option value="' + parse_data + '">' + team_names[i] + '</option>';
    }
}

function deleteChild(e) {
    
    //e.firstElementChild can be used.
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function loadTeamJson() {
    $.getJSON("./assets/team_database.json", function(json) {
        importTeamJson(json);
    });
}

function show(ele) {
    // Retrieve data from selected team

    doc = document.getElementById("select-result")
    deleteChild(doc)

    parsed = ele.value.split("_");

    team_name = parsed[0];
    tex_col = parsed[1];
    bg_col = parsed[2];
    url = parsed[3];

    const itemDiv = document.createElement("div");
    itemDiv.className = "previewItem";
    const itemLogo = document.createElement("div");
    itemLogo.className = "previewLogo";
    const itemText = document.createElement("div");
    itemText.className = "previewText";

    const msg = document.createElement("div");
    msg.setAttribute("id", "msg");
    doc.appendChild(msg);


    itemDiv.appendChild(itemText)
    itemText.innerText = team_name;
    itemText.style.color = tex_col;
    itemDiv.style.backgroundColor = bg_col;

    logourl = "url(assets/preset_logos/" + url + ")"
    itemLogo.style.backgroundImage = logourl;

    doc.appendChild(itemLogo);
    doc.appendChild(itemDiv);

    msg.innerHTML = '<p><b>Selected Team: </b>' + team_name + '</p>' +
        '<p><b>Text Colour: </b>' + tex_col + '</p>' + 
        '<p><b>Background Colour: </b>' + bg_col + '</p>';
}

function addTeamPreset() {
    team_name = parsed[0];
    tex_col = parsed[1];
    bg_col = parsed[2];
    url = parsed[3];

    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    const itemLogo = document.createElement("div");
    itemLogo.className = "item-logo";
    const itemText = document.createElement("div");
    itemText.className = "item-text";

    itemDiv.appendChild(itemLogo)
    itemDiv.appendChild(itemText)
    itemText.innerText = team_name;
    itemText.style.color = tex_col;
    itemDiv.style.backgroundColor = bg_col;

    logourl = "url(assets/preset_logos/" + url + ")"
    itemLogo.style.backgroundImage = logourl;

   
    logoSize = ((logoScale/100) * 60) + "px"
    itemLogo.style.backgroundSize = logoSize;


    document.getElementById("overflowwrapper").appendChild(itemDiv);

    slider.value = "75";
    sliderPreview.innerHTML = "75%";

    $(".settings-container").removeClass('show');
    $(".settings-container").addClass('hidden');
}

document.onload = loadTeamJson()
var button = document.getElementById("SubmitPreset");
button.addEventListener('click',function(){addTeamPreset(ele)},false);
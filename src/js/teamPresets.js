var ele = document.getElementById('sel')

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
        ele.innerHTML = ele.innerHTML +
            '<option value="' + bg_colours[i] + '">' + team_names[i] + '</option>';
    }
}

function loadTeamJson() {
    $.getJSON("./assets/team_database.json", function(json) {
        importTeamJson(json);
    });
}

// function show(ele) {
//     // GET THE SELECTED VALUE FROM <select> ELEMENT AND SHOW IT.
//     var msg = document.getElementById('msg');
//     msg.innerHTML = 'Selected Bird: <b>' + ele.options[ele.selectedIndex].text + '</b> </br>' +
//         'ID: <b>' + ele.value + '</b>';
// }

document.onload = loadTeamJson()
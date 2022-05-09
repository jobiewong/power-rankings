var save = document.getElementById('exportbutton');

save.addEventListener('click', (event) => {
    console.log("click");

    function generateJSON() {
        var data = {
           name: [],
           tcolour: [],
           bgcolour: [],
           logo: [] 
        }

        $(".item").each(function(){
            child_text = $(this).children(".item-text").text();
            child_text_colour = $(this).children(".item-text").css("color");
            child_bg_colour = $(this).css("background-color");
            child_logo = $(this).children(".item-logo").css('background-image');

            split_url = child_logo.split('src');
            split_url = split_url[1].split('\"');
            split_url = split_url[0].substring(1)
            
            data["name"].push(child_text);
            data["tcolour"].push(child_text_colour);
            data["bgcolour"].push(child_bg_colour);
            data["logo"].push(split_url);
        })

        file = JSON.stringify(data, null, 4);
        
        return file;
    }

    file = generateJSON()

	var myBlob = new Blob([file], {type: "application/json"});

    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "rankings.json";

    anchor.click();
    window.URL.revokeObjectURL(url);
    // document.removeChild(anchor);
});

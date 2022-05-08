var save = document.getElementById('exportbutton');

save.addEventListener('click', (event) => {

    let file = $(".container").html();

	var myBlob = new Blob([file], {type: "text/plain"});

    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "rankings.txt";

    anchor.click();
    window.URL.revokeObjectURL(url);
    document.removeChild(anchor);
});

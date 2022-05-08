document.getElementById('rankingsfile').addEventListener('change', readURL, true);
    function readURL(){
        var file = document.getElementById("rankingsfile").files[0];
        var reader = new FileReader();
        reader.onloadend = function(){
            document.getElementById('importPreview')
                        .textContent=reader.result;
            rankingsfile = reader.result;
        }

        reader.readAsText(this.files[0]);
    }

    function deleteChildren(){
        var e = document.querySelector(".container");
        e.innerHTML = "";

        var s = document.querySelector(".sortClass");
        s.remove();
    }

    function addRankings(file) {

        var importString = file;

        var htmlObject = document.createElement('div');
        htmlObject.className = "remove-this";
        htmlObject.innerHTML = importString;

        var head = document.querySelector("head")
        var sortableScript = document.createElement('script');

        sortableScript.setAttribute('src','js/saveLoadSort.js');
        sortableScript.className = "sortClass";
        head.appendChild(sortableScript);

        deleteChildren();
        document.getElementById("containermain").appendChild(htmlObject);

        var cnt = $(".remove-this").contents();
        $(".remove-this").replaceWith(cnt);

        $(".import-container").removeClass('show');
        $(".import-container").addClass('hidden');
    }

    var button = document.querySelector('#importSubmit');
    button.addEventListener('click',function(){addRankings(rankingsfile)},false);
document.getElementById('logofile').addEventListener('change', readURL, true);
          function readURL(){
            var file = document.getElementById("logofile").files[0];
            var reader = new FileReader();
            reader.onloadend = function(){
                logoFile = "url(" + reader.result + ")";        
            }
            if(file){
                reader.readAsDataURL(file);
              }else{
              }
          }

          function addTeam(file) {
          var t_input = document.getElementById("tname"); 
          var teamname = t_input.value.trim(); 

          var c_input = document.getElementById("tcolour"); 
          var textcolour = c_input.value.trim(); 

          var bg_input = document.getElementById("bcolour"); 
          var backgroundcolour = bg_input.value.trim(); 
       
          const itemDiv = document.createElement("div");
          itemDiv.className = "item";
          const itemLogo = document.createElement("div");
          itemLogo.className = "item-logo";
          const itemText = document.createElement("div");
          itemText.className = "item-text";

          itemDiv.appendChild(itemLogo)
          itemDiv.appendChild(itemText)
          itemText.innerText = teamname;
          itemText.style.color = textcolour;
          itemDiv.style.backgroundColor = backgroundcolour;
          itemLogo.style.backgroundImage = file;

          document.getElementById("overflowwrapper").appendChild(itemDiv);

          $(".settings-container").removeClass('show');
          $(".settings-container").addClass('hidden');
        }

        var button = document.querySelector('input[type="button"]');
        button.addEventListener('click',function(){addTeam(logoFile)},false);
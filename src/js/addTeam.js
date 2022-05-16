logoFile = "";

document.getElementById('logofile').addEventListener('change', readURL, true);

var logoScaleAdd = 100;

// Logo slider
let sliderAdd = document.getElementById("addSlider")
var sliderPreviewAdd = document.getElementById('slider-preview-two')

sliderAdd.addEventListener('input', e => {
  sliderPreviewAdd.innerHTML = e.target.value + "%";
  logoScaleAdd = e.target.value
})

//////

function readURL(){
  var file = document.getElementById("logofile").files[0];
  var file_path = file.path;

  var reader = new FileReader();
  reader.onloadend = function(){
    logoFile = "url('file///" + file_path + "')";
    logoFile = logoFile.replace(/\\/g, "/");
    // logoFile = file_path;
  
  }
  if(file){
      reader.readAsDataURL(file);
    }
  else{
    }
}

function addTeam(file) {
  console.log(file)

  var t_input = document.getElementById("tname"); 
  var teamname = t_input.value.trim(); 

  var c_input = document.getElementById("tcolour"); 
  var textcolour = c_input.value.trim(); 

  var bg_input = document.getElementById("bcolour"); 
  var backgroundcolour = bg_input.value.trim(); 

  var url_input = document.getElementById("logourl");
  var logourl = url_input.value.trim(); 

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

  if(file){
    itemLogo.style.backgroundImage = file;
  }
  else if(logourl.length > 0) {
    console.log(logourl);
    logourl = "url(" + logourl + ")"
    itemLogo.style.backgroundImage = logourl;
  }

  logoSize = ((logoScaleAdd/100) * 60) + "px"

  itemLogo.style.backgroundSize = logoSize;

  document.getElementById("overflowwrapper").appendChild(itemDiv);

  sliderAdd.value = "100";
  sliderPreviewAdd.innerHTML = "100%";

  $(".settings-container").removeClass('show');
  $(".settings-container").addClass('hidden');
}

var button = document.getElementById("Submit");
button.addEventListener('click',function(){addTeam(logoFile)},false);
let url=window.origin
function load_img(path){
  const profile=document.querySelector(".profile-pic")
  
  profile.style.backgroundImage = `url('${path.pa}')`
  profile.style.backgroundSize = "cover";
  profile.style.backgroundPosition = "center"
  //profile.innerHTML=`<img src="${path.pa}" height="40px">`
  
}

  fetch(`${url}/load-api`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer`
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch user data: ' + response.statusText);
    }
  })
  .then(data => {
    load_img(data);
  })
  .catch(error => {
    console.error('Error fetching user data:', error);
  });




async function set_data(result){
try {
  const response = await fetch(`${url}/api-setreports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "result": result }),
  });
} catch (error) {
  console.error("Error:", error);
}
}
function startAnimation(){
    document.getElementById("image").classList.add("image-pre")
    let result="negative"
    set_data(result)
    setInterval(() => {

        document.getElementById("image").classList.remove("image-pre")
        const res=document.querySelector("#rest")
        res.innerHTML="Result: Negative"
        res.style.color="green"

    }, 6000);
}
function closeScanPopup() {
  document.getElementById("scan-popup").style.display = "none";
}
function openScanPopup() {
  document.getElementById("scan-popup").style.display = "block";
}

function previewImage() {
  var preview = document.getElementById("image");
  var file = document.getElementById("image-upload").files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    preview.src = reader.result;
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
function toggleProfileDropdown() {
  var dropdown = document.getElementById("profileDropdown");
  dropdown.style.display === "none" ? dropdown.style.display = "block" : dropdown.style.display = "none";
}
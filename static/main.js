let url = window.origin;

function load_img(path) {
  const profile = document.querySelector(".profile-pic");
  profile.style.backgroundImage = `url('${path.pa}')`;
  profile.style.backgroundSize = "cover";
  profile.style.backgroundPosition = "center";
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

async function set_data(result) {
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
function fetchPrediction(){
  fetch(`${url}/prediction`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer`
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch prediction data: ' + response.statusText);
    }
  })
  .then(data => {
    if (data.res == 1) {
      updateResult("Positive",0)
    } else {
      updateResult("Negative",1)
    }
  })
  .catch(error => {
    console.error('Error fetching prediction data:', error);
  });
};

function updateResult(resss,c){
  const res = document.querySelector("#rest");
  res.innerHTML = "Result: " + resss;
  res.style.color = c == 1 ? "green" : "red";
  set_data(resss);
}
async function startAnimation() {
  document.getElementById("image").classList.add("image-pre");
  var file = document.getElementById("image-upload").files[0];

  if (file) {
    var formData = new FormData();
    formData.append("image", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${url}/machinelearning`, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Image uploaded successfully");

      } else {
        console.error("Error uploading image");
      }
    };
    xhr.send(formData);
  } else {
    console.error("No file selected");
  }
  
setTimeout(()=>{
  fetchPrediction()
  document.getElementById("image").classList.remove("image-pre");
},3000)
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
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function toggleProfileDropdown() {
  var dropdown = document.getElementById("profileDropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

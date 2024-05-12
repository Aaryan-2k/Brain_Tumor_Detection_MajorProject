const url=window.origin
function toggleEdit(fieldId) {
  const field = document.getElementById(fieldId);
  const editButton = field.parentElement.nextElementSibling.querySelector('.edit-button');

  if (field.readOnly) {
    // Enter edit mode
    field.readOnly = false;
    editButton.textContent = 'Save';
  } else {
    // Save changes and exit edit mode
    field.readOnly = true;
    editButton.textContent = 'Edit';
  }
}


fetch(`${url}/user-profile`, {
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
    const fname=document.querySelector("#fname")
    const lname=document.querySelector("#lname")
    const tel=document.querySelector("#tel")
    const gmail=document.querySelector("#gmail")
    fname.innerHTML=`<span>${data.fname}</span>`
    lname.innerHTML=`<span>${data.lname}</span>`
    tel.innerHTML=`<span>${data.tel}</span>`
    gmail.innerHTML=`<span>${data.gmail}</span>`

  })
  .catch(error => {
    console.error('Error fetching user data:', error);
  });
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
    function toggleProfileDropdown() {
        var dropdown = document.getElementById("profileDropdown");
        dropdown.style.display === "none" ? dropdown.style.display = "block" : dropdown.style.display = "none";
      }
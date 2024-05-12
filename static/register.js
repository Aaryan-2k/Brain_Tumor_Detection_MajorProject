form_valid_email=false
for_pass_valid=false
let url=window.origin
function submit_form(event){
  event.preventDefault();
    console.log("submitting")
    const pass=document.getElementById("p10").value
    const cpass=document.getElementById("p11").value
    const status=document.querySelector("p")
    password_box=document.querySelector("#p10")
    password_box1=document.querySelector("#p11")
    if (form_valid_email==false){
        return false
    }
    if (cpass!=pass){
        status.innerHTML = "<label>password does not match</label>";
        status.style.color = "red";
        password_box.style.border = "1px solid red";
        password_box1.style.border = "1px solid red";


        return false
    }
    document.getElementById("myform").submit();
    
}

async function check_email(email){
    console.log("Checking email");
    try {
      const response = await fetch(`${url}/api-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email": email }),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Error:", error);
      return false;

}
}

var email=document.getElementById('email-id')
  document.getElementById('email-id').addEventListener('blur', async function () {
  email_box = document.getElementById("email-id");
  const status=document.querySelector("p")
  console.log("yo")
  if (email.value.length === 0) {
  } else {
    const isUsernameAvailable = await check_email(email.value);
    if (!isUsernameAvailable) {
      form_valid_username=false
      status.innerHTML = "<label>email already exists!</label>";
      status.style.color = "red";
      email_box.style.border = "1px solid red";
    } else {
      email_box.style.border = "1px solid green";
      status.innerHTML = "";
      status.style.color = "green";
      form_valid_email=true
    }
  }
});
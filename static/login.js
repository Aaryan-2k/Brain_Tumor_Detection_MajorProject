let url=window.origin


async function is_valid(email,password){
    console.log("Checking email");
    try {
      const response = await fetch(`${url}/api-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email": email,"password":password }),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Error:", error);
      return false;
}
}
async function submit_form(event){
    event.preventDefault();
      const email=document.getElementById("eml").value
      const pass=document.getElementById("pswd").value
      const status=document.querySelector("p")
      const user_valid=await is_valid(email,pass)
      if (!user_valid){
        status.innerHTML = "<label>Invalid Credentials</label>";
        status.style.color = "red";
      }
    else{
        document.getElementById("myform").submit();
    }
      }
     
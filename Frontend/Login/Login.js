
const response = document.querySelector(".login-form").addEventListener("submit" , async (e)=>{
    e.preventDefault()
      const email = document.getElementById("email").value  ; 
      const password = document.getElementById("password").value ; 

      console.log(email) ; 
      console.log(password) ;
}) 
console.log(response.value)


let data = null ;
document.querySelector(".register-form").addEventListener("submit" , (e)=>{
  e.preventDefault() ; 

 const cpass =  document.getElementById("confirm-password").value ; 
  const pass = document.getElementById("password").value ; 
 const email =  document.getElementById("email").value ; 
  const name = document.getElementById("name").value ; 

data= {
    cpass , pass , email ,name 
  } 

 console.log(data) ; 
  }) 

  console.log(data)
 
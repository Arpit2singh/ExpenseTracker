let data = null ; 
document.querySelector(".form-section").addEventListener("submit" , (e)=>{
    e.preventDefault() ;
 const date =  document.getElementById("date").value ; 
 const savings =  document.getElementById("savings").value ; 
 const expenses =  document.getElementById("expenses").value ; 
 const income =  document.getElementById("income").value ; 
 const goal =  document.getElementById("goal").value ; 

 data = {date , savings , expenses , income , goal} ; 

 console.log(data) ; 

    
})
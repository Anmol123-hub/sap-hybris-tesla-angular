import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-logindealer',
  templateUrl: './logindealer.component.html',
  styleUrls: ['./logindealer.component.css']
})
export class LogindealerComponent implements OnInit {
  showEmailError:Boolean = false
  showDbError:Boolean = false
  showPassError:Boolean = false
  data = {
    email:String,
    pass:String
  }
  constructor(){

  }
  ngOnInit(): void {
    const email = window.localStorage.getItem("email")
    if (email === '' || email == null) {
      console.log("Please login");
      
    }
    else if (email !== '' || email != null) {
      window.location = "/admin" as any
    }
    
    else{
    const pass_field:any = document.querySelector('.pass-key');
      const showBtn:any = document.querySelector('.show');
      showBtn.addEventListener('click', function(){
       if(pass_field.type === "password"){
         pass_field.type = "text";
         showBtn.textContent = "HIDE";
         showBtn.style.color = "#3498db";
       }else{
         pass_field.type = "password";
         showBtn.textContent = "SHOW";
         showBtn.style.color = "#222";
       }
      })  
    }
    
  }

  checkEmail(e:any){
    if ( !e.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      this.showEmailError = true
      this.showDbError=false
     
    }
    else {
      this.showEmailError = false
      this.showDbError=false
    }
  }

  checkPass(e:any){
    if(e.target.value === ''){
      this.showPassError=true
      this.showDbError=false
    }
    else{
      this.showPassError=false
      this.showDbError=false
    }
  }

  async checkCredentials(e:any){
    // console.log(e.target.email.value)
    if(e.target.email.value==="" || e.target.password.value===""||this.showEmailError||this.showPassError){
      alert("Please fill all the details")
    }
     else{
      this.data={
        email:e.target.email.value,
        pass:e.target.password.value

      }
      await fetch("http://localhost:2525/checkdealer",{
        method:"POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
        
        
      }).then((text)=>{
 
        if(text==="found"){
          this.showDbError=false          
          window.localStorage.setItem("email",String(this.data.email  ))
          window.location="/admin" as any
        }
        else{
          this.showDbError=true
        }
       
      })
    }
    
  }

}

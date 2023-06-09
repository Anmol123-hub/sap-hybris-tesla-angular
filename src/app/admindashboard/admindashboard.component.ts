import { Component, OnInit } from '@angular/core';
import { Dealernames } from '../content/interface/dealername';
import { CustomerDetails } from './interface/customerData';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  data = {
    Email: ""
  }
  checkTheData:Boolean = true
  dealerName: String = ''
  dealerDetails: Dealernames[] = [{
    dealerName: '',
    dealerId:0
  }]
  customer:CustomerDetails[] =[{
    custId:0,
    firstname:'',
    lastname:'',
    contact:0,
    carModel:'',
    date:'',
    time:'',
    email:'',
    request:''
  }]
  customer1:CustomerDetails[] =[{
    custId:0,
  }]
  constructor(private router: Router) {
  }
  async ngOnInit() {
    const email = window.localStorage.getItem("email")
    if (email === '' || email === null) {
      window.location = "/login" as any
    }
    else {
      this.data = {
        Email: email 
      }
      await fetch("/getdealerdeatils", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data)
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();


      }).then((text) => {
        this.dealerDetails = JSON.parse(text)
      })
      const data1={
        id:this.dealerDetails[0].dealerId
      }
      await fetch("/getcustomerrequests", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data1)
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
      }).then((text) => {
        this.customer = JSON.parse(text)
        if(text === "[]"){
          this.checkTheData=false
        }
        
      })
      await fetch("/getaccepetdrequets", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data1)
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
      }).then((text) => {
        this.customer1 = JSON.parse(text)     
      })
    }
  }
  logout() {
  //   const extras: NavigationExtras = { skipLocationChange: true };
  // this.router.navigateByUrl('/', extras);
    window.localStorage.removeItem("email")
    window.location = "/" as any
  }
  acceptRequest(id:any){
    const data = {
      status:"accept",
      custId:id
    }
    fetch("/updatestatus",{
      method:"post",
      cache:"no-cache",
      headers:{ "Content-Type": "application/json" },
      body:JSON.stringify(data)
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.text();
    }).then((text)=>{
      window.location = "/admin" as any
      
    })
  }
  change(url:any){
    window.location=url
  }
  rejectRequest(id:any){
    const data = {
      status:"reject",
      custId:id
    }
    fetch("/updatestatus",{
      method:"post",
      cache:"no-cache",
      headers:{ "Content-Type": "application/json" },
      body:JSON.stringify(data)
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.text();
    }).then((text)=>{
      window.location = "/admin" as any
      
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Dealernames } from '../content/interface/dealername';
import { CustomerDetails } from './interface/customerData';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  data = {
    Email: ""
  }
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
  constructor() {
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
      await fetch("http://localhost:2525/getdealerdeatils", {
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
      await fetch("http://localhost:2525/getcustomerrequests", {
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
        console.log(this.customer);
        
      })
    }
  }
  logout() {
    window.localStorage.removeItem("email")
    window.location = "/" as any
  }
  acceptRequest(id:any){
    const data = {
      custId:id
    }
    fetch("http://localhost:2525/updatestatus",{
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
      console.log(text);
      
    })
  }

}

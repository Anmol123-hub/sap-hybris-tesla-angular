import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from '../admindashboard/interface/customerData';
import { Dealernames } from '../content/interface/dealername';
import axios from "axios"

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  accepted:number = 0
  rejected:number = 0
  pending:number = 0
  dealerDetails: Dealernames[] = [{
    dealerName: '',
    dealerId: 0
  }]
  data = {
    Email: ""
  }
  dealerData:Dealernames[] = [{
    dealerId:0,
    dealerName:'',
    dealerEmail:'',
    dealerPass:'',
    dealerAddress:'',
    dealerCity:''
  }]
  customer: CustomerDetails[] = [{
    custId: 0,
    firstname: '',
    lastname: '',
    contact: 0,
    carModel: '',
    date: '',
    time: '',
    email: '',
    request: ''
  }]
  checkTheData: Boolean = true
  constructor() { }
  async ngOnInit() {
    const email = window.localStorage.getItem("email")
    if (email === '' || email === null) {
      window.location = "/login" as any
    }
    else {
      this.data = {
        Email: email
      }
      await axios.get("/getdealerdetails").then((db) => {


        this.dealerDetails = db.data

      })

      await axios.get("/getallcustomer").then((db) => {
        this.customer = db.data

      })
      this.customer.map((val,idx)=>{
        if(val.request === "pending"){
          this.pending+=1
        }
        if(val.request === "reject"){
          this.rejected+=1
        }
        if(val.request === "accepted"){
          this.accepted+=1
        }
      })
    }
  }
  showDealers(id:any){
    this.dealerDetails.map((val,idx)=>{
      if(val.dealerId == id){
        this.dealerData[0] = val
      }
    })
    
  }
  logout() {
    window.localStorage.removeItem("email")
    window.location = "/" as any
  }

}

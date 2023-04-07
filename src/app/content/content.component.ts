import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DealerListServiceService } from './service/dealer-list-service.service';
import { Dealernames } from './interface/dealername';
import { Dealerdetails } from './interface/dealerDetails';
declare var window: any;



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  failureModel: any;
  submitModel:any;
  congratulationModel:any
  dealerData:Dealernames[] = []


  images = ["../../assets/images/models.jpg", "../../assets/images/model3.jpg", "../../assets/images/modelx.jpg", "../../assets/images/modely.jpg"]
  cities = ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad", "Pune", "Surat", "Central Delhi"]
  pinDetails: any;
  showDealerInfo:Boolean=false
  dealer:Dealerdetails[] =[]
  finalAddress: any;
  data = {
    first:"",
    last:"",
    contact:0,
    email:"",
    pincode:0,
    dealerId:0,
    date:"",
    time:"",
    car:""
  }
  
  checkDealerSelect:Boolean = false
  dealerIdSelect:Number=0
  checkAll: Boolean = false
  showFirstnameError: Boolean = false
  showDateError:Boolean = false
  showTimeError:Boolean = false
  showLastnameError: Boolean = false
  showEmailError: Boolean = false
  showPincodeError: Boolean = false
  showContanctError: Boolean = false
  pinCode: string = '';
  checkTenDigit = /^[6-9]\d{9}$/;
  state = '';
  p: number = 0
  btnDisabled: boolean = false
  block = '';
  district = '';
  city = '';
  show = true
  combined:String=""

  constructor(private render: Renderer2, private httpClient: HttpClient,private dealerService:DealerListServiceService) { }

  ngOnInit(): void {
    this.failureModel = new window.bootstrap.Modal(
      document.getElementById('exampleModal1')
    );
    this.submitModel = new window.bootstrap.Modal(
      document.getElementById('exampleModal2')
    );
    this.congratulationModel = new window.bootstrap.Modal(
      document.getElementById('exampleModal3')
    );
    this.dealerService.getDealers().subscribe((pro:Dealernames[])=>{
      this.dealerData = pro 
    })
    
  }



  currentImage: string = this.images[0]
  currentCar:String='Model S'
  ChangeThePicture(event: any, number: number) {
    this.currentImage = this.images[number]
    if(number == 1){
      this.currentCar='Model 3'
    }
    else if(number == 2){
      this.currentCar = 'Model X'
    }
    else if(number == 3){
      this.currentCar = 'Model Y'
    }
    else if(number==0){
      this.currentCar='Model S'
    }
    this.render.addClass(document.getElementById("image"), "animate");
    
    
    setInterval(() => {
      this.render.removeClass(document.getElementById("image"), "animate");
    }, 2000)
  }

  checkTheNumber(event: any) {
    if (isNaN(Number(event.target.value)) || !event.target.value.match(this.checkTenDigit)) {
      this.showContanctError = true
      this.checkAll = true
    }
    else {
      this.showContanctError = false
      this.checkAll = false
    }

  }


  getAdd(event: any) {
    this.p = 0
    this.dealer=[]
    this.showDealerInfo=false
    this.checkDealerSelect=false

    this.pinCode = String(event.target.value)
    if (this.pinCode == "") {
      this.state = ""
      this.district = ""
      this.city = ""
    }
    else if (this.pinCode.match(/^\d{6}$/)) {
      this.httpClient
        .get(`https://api.postalpincode.in/pincode/${this.pinCode}`)
        .subscribe((val) => {
          const [address] = val as any;
          this.finalAddress = address;
          const postOffices = this.finalAddress.PostOffice;
          if (postOffices.length > 0) {
            this.state = postOffices[0].State;
            this.district = postOffices[0].District;
            for (let i = 0; i < this.cities.length; i++) {
              if (this.cities[i] === this.district) {
                this.p = 1
                this.checkAll = true
                this.btnDisabled = false
                this.showPincodeError=false
                this.showDealerInfo=true

                break;
              }

            }

            if(this.p==1){
              this.dealerData.map((val,idx)=>{
                if(val.dealerCity === this.district||val.dealerCity === this.state){
                  this.dealer.push({id:val.dealerId,name:val.dealerName,address:val.dealerAddress})
                }
              })
              
            }
            else if (this.p == 0) {
              this.failureModel.show();
              this.btnDisabled = true
              this.checkAll = false
              this.showDealerInfo=false

              this.checkDealerSelect=false
              this.showPincodeError=false
            }
          }
        });
    }
    else{
      this.showPincodeError=true
      this.checkAll=false
    }
  }
  checkFirstname(e: any) {
    if (e.target.value === '' || !isNaN(Number(e.target.value))) {
      this.showFirstnameError = true
      this.checkAll = true
    }
    else {
      this.showFirstnameError = false
      this.checkAll = false
    }
  }
  checkLastname(e: any) {
    if (e.target.value === '' || !isNaN(Number(e.target.value))) {
      this.showLastnameError = true
      this.checkAll = true
    }
    else {
      this.showLastnameError = false
      this.checkAll = false
    }
  }
  checkEmail(e: any) {
    if (e.target.value === '' || !e.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      this.showEmailError = true
      this.checkAll = true
    }
    else {
      this.showEmailError = false
      this.checkAll = false
    }
  }

  checkDate(e:any){
    if(e.target.value==''){
      this.showDateError=true
    }
    else{
      this.showDateError=false
    }

  }
  checkTime(e:any){
    if(e.target.value==''){
      this.showTimeError=true
    }
    else{
      this.showTimeError=false
    }

  }
  pageReload(){
    location.reload()
  }

  saveDealerId(dealerId:any){
    this.dealerIdSelect = Number(dealerId)
    this.checkDealerSelect=true
  }

  todayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  currentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }


   formHandle(e: any) {
    if(e.target.first.value!=="" && e.target.last.value!==""&& e.target.contact.value!==""&& e.target.email.value!==""
    && e.target.zip.value!==""&&e.target.date.value!==""&&e.target.time.value!==""&&!this.showFirstnameError
    &&!this.showLastnameError&&!this.showEmailError&&!this.showDateError
    &&!this.showContanctError&&!this.showPincodeError&&!this.showTimeError&&this.dealerIdSelect!=0){
      this.data={
        first:e.target.first.value,
        last:e.target.last.value,
        contact:Number(e.target.contact.value),
        email:e.target.email.value,
        pincode:Number(e.target.zip.value),
        dealerId:Number(this.dealerIdSelect),
        date:e.target.date.value,
        time:e.target.time.value,
        car:String(this.currentCar)
      }
      this.submitModel.show();
    
    }
    else{
      alert("Please enter all required fields")
    }
  }
  
  async saveDb(){
    await fetch("/customerrequest",{
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
      if (text ==="Updated")
      this.congratulationModel.show();
      
    })
  }

}

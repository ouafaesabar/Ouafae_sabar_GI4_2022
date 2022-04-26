import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonicAuthService } from '../ionic-auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {User} from '../user'
import { NavigationParamService } from '../navigation-param.service';


@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire-formation.page.html',
  styleUrls: ['./formulaire-formation.page.scss'],
})
export class FormulaireFormationPage implements OnInit {
 

  
  user: User;
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  uid: string;
  userDetail: any;
  name: string;
  email: string;
  phone : number;
  copie : Array<string>;


    
  
    constructor(
      private router: Router,
      private ionicAuthService: IonicAuthService,
      private fb: FormBuilder,
      public firestore: AngularFirestore,
      public activatedroute : ActivatedRoute,
      private navParam : NavigationParamService
    ) { 
    }
  
    ngOnInit() {
     
      this.userDetail = this.navParam.getNavData();
      console.log(this.userDetail);
      this.name = this.userDetail.name;
      this.email = this.userDetail.email;
      this.phone = this.userDetail.phone;
      console.log(this.name);
      console.log(this.email);
      this.userForm = this.fb.group({
        name : new FormControl({value: this.name, disabled : true}),
        email: new FormControl({value: this.email, disabled : true}),
        phone: new FormControl(
         
          {value: this.phone === null ? "" : this.phone, disabled : false}),
        formation : new FormControl,
      });
    }
    AjouterInfos(value){
      this.userDetail.phone = value.phone;
      if(this.userDetail.formation.includes(value.formation)) alert('déja inscrit');
      else this.userDetail.formation.push(value.formation)
      this.ionicAuthService.saveDetails(this.userDetail);
    }
  
}



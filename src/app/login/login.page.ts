import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { NavigationParamService } from '../navigation-param.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  userForm: FormGroup;
  userid : string;
  userDetail : any;

  successMsg: string = '';
  errorMsg: string = '';
  

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Adresse Email est demandé.' 
      },
      { 
        type: 'pattern', 
        message: 'Adresse Email n est pas valide.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Mot de passe est demandé .' 
      },
      { 
        type: 'minlength', 
        message: 'Longueur du mot de passe doit etre 6 caracteres.' 
      }
    ]
  };

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    private navParam : NavigationParamService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
    
  }
  

  signIn(value) {
    this.ionicAuthService.signinUser(value)
      .then((response) => {
        this.ionicAuthService.userDetails().subscribe((response) => {
          if (response !== null) {
            this.userid = response.uid;
           this.ionicAuthService.getDetails(this.userid).subscribe((user) =>{
               this.userDetail = user;
               this.navParam.setNavData(this.userDetail);
           this.errorMsg = "";
                 this.router.navigateByUrl('dashboard');

          }, error => {
          console.log(error);
        });
       }}, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
    }
      )}

  

  goToSignup() {
    this.router.navigateByUrl('registration');
  }

}
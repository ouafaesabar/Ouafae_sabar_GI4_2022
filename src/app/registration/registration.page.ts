import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { User } from '../user'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  userForm: FormGroup;
  user : User = {
    uid : ' ',
    name : ' ',
    email : ' ',
    phone : ' ',
    formation : null,
  };
  successMsg: string = '';
  errorMsg: string = '';
  uid: string;
  

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
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name : new FormControl,
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

  signUp(value) {
    this.ionicAuthService.createUser(value)
      .then((response) => {
        this.ionicAuthService.userDetails().subscribe(response => {
          if (response !== null) {
            this.uid = response.uid;
            console.log(this.uid);
            console.log(value.name);
            console.log(value.email);
            this.user.name = value.name;
            this.user.email = value.email;
            this.user.uid = this.uid;
            this.ionicAuthService.saveDetails(this.user);
            
          } else {
            this.router.navigateByUrl('');
          }
        }, error => {
          console.log(error);
        })
        if(response.user.uid){
          
        }
          this.errorMsg = "";
        this.successMsg = "New user created.";
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }

}
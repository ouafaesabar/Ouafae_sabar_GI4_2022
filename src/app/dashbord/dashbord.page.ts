import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { NavigationParamService } from '../navigation-param.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashbord.page.html',
  styleUrls: ['./dashbord.page.scss'],
})

export class DashboardPage implements OnInit {
  userDetail: any;
  formations: Observable<any[]>;
  copie :Array<string>;
  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    public firestore: AngularFirestore,
    public activatedroute : ActivatedRoute,
    private afAuth: AngularFireAuth,
    private navParam : NavigationParamService

  ) {
    this.formations = firestore.collection('Formations').valueChanges({ idField: 'propertyId' });
 
  }

  ngOnInit() {
    console.log(this.formations)
    this.userDetail = this.navParam.getNavData();
    console.log(this.userDetail)

    
  }
  
  
  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
  remplirFormulaire(){
    this.router.navigateByUrl('formulaire-formation');
    } 
  }   
  
  

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        //this.userDetails = undefined;
        localStorage.removeItem('user');
      }, err => {
        //this.showMessage("danger", err.message);
      });
  }
}

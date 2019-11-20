import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logout()
      .then(res => {
        //this.userDetails = undefined;
        localStorage.removeItem('user');
      }, err => {
        //this.showMessage("danger", err.message);
      });
  }

}

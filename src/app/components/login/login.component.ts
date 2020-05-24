import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {} as User;

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  tryLogin() {
    this.loginService.login(this.user.name, this.user.password)
      .subscribe(
        r => {
          if (1 == 1) {
            sessionStorage.setItem('userId', r.id.toString());
            sessionStorage.setItem('userName', r.name);
            this.router.navigateByUrl[('/profile')];
          }
        },
        r => {
          alert(r.error.error);
        });
  }

}

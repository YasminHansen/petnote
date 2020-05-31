import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {} as User;
  validateEmail;
  invalidEmail;
  validateEmailError;
  validatePassword;
  validatePasswordError;
  invalidUF;

  constructor(private registerService: RegisterService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  emailValidator(mail) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      this.invalidEmail = false;
      return (true)
    }
    this.invalidEmail = true;
    return (false)
  }

  ufValidator(uf)
  {
    if(/\D/.test(uf)){
      this.invalidUF = false;
      return true;
    }
    this.invalidUF = true;
    return false;
  }

  register(user: User){
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.city = user.city;
    this.user.uf = user.uf;

    if(this.validateEmail !== this.user.email && this.validatePassword !== this.user.password){
        this.validateEmailError = true;
        this.validatePasswordError = true;
        return;
    }

    else if(this.validateEmail !== this.user.email){
      this.validateEmailError = true;
      return;
    }

    else if(this.validatePassword !== this.user.password){
      this.validatePasswordError = true;
      return;
    }

    if(this.invalidEmail == true)
    {
      return;
    }

    this.registerService.register(this.user.name, this.user.email, this.user.password, this.user.city, this.user.uf)
    .subscribe(
      r => {
        alert(`Bem-vindo, ${r.name}!`);
        this.router.navigate(['/']);
      },
      r => {
        alert(r.error.error);
      }
    )
  }
}
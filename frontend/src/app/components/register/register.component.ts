import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {} as User;

  constructor(private registerService: RegisterService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }


  register(user: User){
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.city = user.city;
    this.user.uf = user.uf;

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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { 

  }

  register(name: string, email: string, password: string, city: string, uf: string): Observable<User>{
    return this.http.post<User>('https://petnote-backend.herokuapp.com/user', {
      name: name,
      email: email,
      password: password,
      city: city,
      uf: uf
    });
  }
}
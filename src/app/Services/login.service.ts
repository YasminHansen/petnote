import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from 'src/app/Models/user'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<User>{
    return this.http.post<User>('https://petnote-backend.herokuapp.com/session', {
      email: email,
      password: password
    });
  }
}
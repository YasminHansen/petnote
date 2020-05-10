import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../Models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { 

  }

  getPets(userId: string): Observable<Pet>{
    return this.http.get<Pet>('http://localhost:3333/profile', {
      headers: {
        Authorization: userId,
      }
    });
  }
  deletePet(petId: number, userId: string): Observable<Pet>{
    return this.http.delete<Pet>('http://localhost:3333/pets/' + petId , {
      headers: {
        Authorization: userId,
      }
    });
  }
}

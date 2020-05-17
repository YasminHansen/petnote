import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../Models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { 

  }

  getPets(): Observable<Pet>{
    return this.http.get<Pet>('http://localhost:3333/profile', {
      headers: {
        Authorization: sessionStorage.getItem('userId'),
      }
    });
  }
  deletePet(petId: number): Observable<Pet>{
    return this.http.delete<Pet>('http://localhost:3333/pets/' + petId , {
      headers: {
        Authorization: sessionStorage.getItem('userId'),
      }
    });
  }

  
  createPet(name: string, age: number, weight: string, gender: number, castrated: number, disease: string, photo_link: string): Observable<Pet>{
    
    return this.http.post<Pet>('http://localhost:3333/pets',{

        name: name,
        age: age,
        weight: weight,
        gender: gender,
        castrated: castrated,
        disease: disease,
        photo_link: photo_link,
    },{
      headers: {
        Authorization: sessionStorage.getItem('userId')
      },
    });
  }
}

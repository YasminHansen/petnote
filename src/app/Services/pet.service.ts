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
    return this.http.get<Pet>('https://petnote-backend.herokuapp.com/profile', {
      headers: {
        Authorization: sessionStorage.getItem('userId'),
      }
    });
  }
  deletePet(petId: number): Observable<Pet>{
    return this.http.delete<Pet>('https://petnote-backend.herokuapp.com/pets/' + petId , {
      headers: {
        Authorization: sessionStorage.getItem('userId'),
      }
    });
  }
  editPet(petId: number, name: string, age: number, gender: number, weight: string, castrated: number, disease: string, photo_link: string): Observable<Pet>{
    return this.http.post<Pet>('https://petnote-backend.herokuapp.com/pets/edit', {
        id: petId,
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
  
  createPet(name: string, age: number, weight: string, gender: number, castrated: number, disease: string, photo_link: string): Observable<Pet>{
    
    return this.http.post<Pet>('https://petnote-backend.herokuapp.com/pets',{

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

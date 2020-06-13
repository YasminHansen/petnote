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
        Authorization: localStorage.getItem('userId'),
      }
    });
  }
  deletePet(petId: number): Observable<Pet>{
    return this.http.delete<Pet>('https://petnote-backend.herokuapp.com/pets/' + petId , {
      headers: {
        Authorization: localStorage.getItem('userId'),
      }
    });
  }
  editPet(petId: number, name: string, age: number, gender: string, weight: string, castrated: string, disease: string, specie: string, photo: any): Observable<Pet>{
    return this.http.post<Pet>('https://petnote-backend.herokuapp.com/pets/edit', {
        id: petId,
        name: name,
        age: age,
        weight: weight,
        gender: gender,
        castrated: castrated,
        specie: specie,
        disease: disease,
        photo: photo,
    },{
      headers: {
        Authorization: localStorage.getItem('userId')
      },
    });
  }
  
  createPet(name: string, age: number, weight: string, gender: string, castrated: string, disease: string, specie: string, photo: any): Observable<Pet>{
    
    return this.http.post<Pet>('https://petnote-backend.herokuapp.com/pets',{

        name: name,
        age: age,
        weight: weight,
        gender: gender,
        castrated: castrated,
        disease: disease,
        specie: specie,
        photo: photo,
    },{
      headers: {
        Authorization: localStorage.getItem('userId')
      },
    });
  }
}

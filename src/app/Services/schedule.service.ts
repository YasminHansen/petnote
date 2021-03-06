import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../Models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) {

   }

   getCommitment(): Observable<Schedule>{
     return this.http.get<Schedule>('https://petnote-backend.herokuapp.com/schedule', {
        headers: {
          Authorization: localStorage.getItem('userId'),
        }
     });
   }

   createCommitment(day: number, month: number, year: number, hour: number, minute: number, 
    description: string, place: string): Observable<Schedule>{
     return this.http.post<Schedule>('https://petnote-backend.herokuapp.com/schedule', {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute: minute,
        description: description,
        place: place,
     }, {
        headers: {
          Authorization: localStorage.getItem('userId')
        },
      });
   }
   deleteCommitment(scheduleId): Observable<Schedule>{
     return this.http.delete<Schedule>('https://petnote-backend.herokuapp.com/schedule/' + scheduleId, {
       headers:{
         Authorization: localStorage.getItem('userId'),
       }
     });
   }
   editCommitmnet(commitmentId: number, day: number, month: number, year: number, hour: number, 
    minute: number, description: number, place: number): Observable<Schedule>{
      return this.http.post<Schedule>('https://petnote-backend.herokuapp.com/schedule/edit', {
        id: commitmentId,
        day: day,
        year: year,
        hour: hour,
        minute: minute,
        description: description,
        place: place
        });
    }
}

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
     return this.http.get<Schedule>('http://localhost:3333/schedule', {
        headers: {
          Authorization: sessionStorage.getItem('userId'),
        }
     });
   }

   createCommitment(day: number, month: number, year: number, hour: number, minute: number, 
    description: string, place: string): Observable<Schedule>{
     return this.http.post<Schedule>('http://localhost:3333/schedule', {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute: minute,
        description: description,
        place: place,
     }, {
        headers: {
          Authorization: sessionStorage.getItem('userId')
        },
      });
   }
   deleteCommitment(scheduleId): Observable<Schedule>{
     return this.http.delete<Schedule>('http://localhost:3333/schedule/' + scheduleId, {
       headers:{
         Authorization: sessionStorage.getItem('userId'),
       }
     });
   }
   editCommitmnet(commitmentId: number, day: number, month: number, year: number, hour: number, 
    minute: number, description: number, place: number): Observable<Schedule>{
      return this.http.post<Schedule>('http://localhost:3333/schedule/edit', {
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

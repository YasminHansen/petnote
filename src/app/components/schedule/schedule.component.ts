import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDatepicker, NgbDatepickerNavigateEvent, NgbDatepickerMonth, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from 'src/app/Models/schedule';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, NgbDatepickerNavigateEvent {
  userName;
  schedules = [] as any; 
  schedule;
  currentMonth;
  currentYear;
  scheduleAux;
  d = new Date();
  list: NgbDateStruct[] = [];
  date: NgbDateStruct = { year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() };


  constructor(
    private router: Router,
    private scheduleService: ScheduleService,
    private calendar: NgbCalendar
      ) {

  }
  current: { year: number; month: number; };
  next: { year: number; month: number; };
  preventDefault: () => void;

  ngOnInit(): void {
      this.scheduleService.getCommitment().subscribe(
        r => {
          this.schedules = r;
          this.scheduleAux = this.schedules.filter((schedule) => {
            return schedule.month == this.d.getMonth() + 1; 
          })
        },
        r => {
          alert(r.error.error);
        });
        this.userName = sessionStorage.getItem('userName');
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  setDate(date: NgbDateStruct){
   this.date = date;
  }

  dateNavigate($event: NgbDatepickerNavigateEvent) {
    this.currentMonth = $event.next.month;
    this.currentYear = $event.next.year;

    this.scheduleAux = this.schedules.filter((schedule) => {
      return schedule.month == this.currentMonth; 
    })
    
  }

  setDay(day){
    this.date.day = day;
  }
}
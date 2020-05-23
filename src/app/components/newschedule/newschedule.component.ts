import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from 'src/app/Models/schedule';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-newschedule',
  templateUrl: './newschedule.component.html',
  styleUrls: ['./newschedule.component.scss']
})
export class NewscheduleComponent implements OnInit {
  list: NgbDateStruct[] = [];
  d = new Date();
  date: NgbDateStruct = { year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() };
  time = { hour: 13, minute: 30};
  schedule = {} as Schedule;

  constructor(
    private router: Router, private scheduleService: ScheduleService) {

  }

  ngOnInit(): void {
  }
  
  // setDate(date: NgbDateStruct){

  //   this.list.push(date);
  // }

  commitmentRegister(schedule: Schedule){
    schedule.day = this.date.day;
    schedule.month = this.date.month;
    schedule.year = this.date.year;
    schedule.hour = this.time.hour;
    schedule.minute = this.time.minute;
        
    this.scheduleService.createCommitment(
      schedule.day, schedule.month, schedule.year,
      schedule.hour, schedule.minute,
      schedule.description, schedule.place).subscribe(
        r => {
          (`Compromisso cadastrado com sucesso`);
          this.router.navigate(['/agenda']);
        },
        r => {
          alert(r.error.error);
        }
      )
  }
}

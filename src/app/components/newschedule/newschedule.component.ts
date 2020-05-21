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
  date: NgbDateStruct = { year: 1789, month: 7, day: 14 };
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
        
    this.scheduleService.createCommitment(
      schedule.day, schedule.month, schedule.year,
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDatepicker, NgbDatepickerNavigateEvent, NgbDatepickerMonth, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from 'src/app/Models/schedule';
import { ScheduleService } from 'src/app/Services/schedule.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
  reloadPag = true;
  d = new Date();
  list: NgbDateStruct[] = [];
  date: NgbDateStruct = { year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() };
  modalOptions:NgbModalOptions;
  closeResult: string;
  enableSave = false;
  IsTextBoxDisabled = true;
  time = { hour: 13, minute: 30};


  constructor(
    private router: Router,
    private scheduleService: ScheduleService,
    private calendar: NgbCalendar,
    private modalService: NgbModal
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
        this.userName = localStorage.getItem('userName');
  }

  reload() {
    if (this.reload) {
      this.router.navigateByUrl('/agenda', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/agenda']);
        this.reloadPag = false;
      });
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  setDate(date: NgbDateStruct){
   this.date = date;
  }

  dateNavigate($event: NgbDatepickerNavigateEvent) {
    this.currentMonth = $event.next.month;
    this.currentYear = $event.next.year;

    this.scheduleAux = this.schedules.filter((schedule) => {
      return schedule.month == this.currentMonth && schedule.year == this.currentYear; 
    })
    
  }

  setDay(day){
    this.date.day = day;
  }

  edit(){
      this.scheduleService.editCommitmnet(this.schedule.id, this.schedule.day, this.schedule.month,
                                          this.schedule.year, this.schedule.hour, this.schedule.minute,
                                          this.schedule.description, this.schedule.place).subscribe(
      r =>{

      },
      r =>{
        alert(r.error.error);
      }
    );
  }

  delete(schedule: any){
    this.scheduleService.deleteCommitment(schedule.id).subscribe(
      r =>{
        
      },
      r =>{
        alert(r.error.error);
      }
    );
    this.reload();
    this.router.navigate(['/']);
  }

  open(content, schedule) {
    this.schedule = schedule;
    this.modalService.open(content, this.modalOptions).result.then((result) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  enableInput(){
    this.IsTextBoxDisabled = false;
    this.enableSave = true;
  }

  private getDismissReason(reason: any): string {
    this.IsTextBoxDisabled = true;
    this.enableSave = false;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
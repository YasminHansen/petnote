import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(
    private router: Router, ) {

  }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}

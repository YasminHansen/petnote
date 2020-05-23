import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NeedAuthGuard } from './NeedAuth';
import { ProfileComponent } from './components/profile/profile.component';
import { NewpetComponent } from './components/newpet/newpet.component';
import { RegisterComponent } from './components/register/register.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NewscheduleComponent } from './components/newschedule/newschedule.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cadastrar-pet', component: NewpetComponent },
  { path: 'cadastro', component: RegisterComponent},
  { path: 'agenda', component: ScheduleComponent},
  { path: 'cadastrar-compromisso', component: NewscheduleComponent},
];


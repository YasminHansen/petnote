import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { map } from  'rxjs/operators';


@Injectable({  
  providedIn: 'root'  
})  
export class UploadService { 
	SERVER_URL: string = "https://file.io/?expires=2m";  
	constructor(private httpClient: HttpClient) {

  }
  upload(formData) {

    return this.httpClient.post<any>(this.SERVER_URL, formData ,{  
        reportProgress: true,  
        observe: 'events'
      });  
  }
}



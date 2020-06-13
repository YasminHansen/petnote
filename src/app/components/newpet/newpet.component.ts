import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PetService } from 'src/app/Services/pet.service';
import { Pet } from 'src/app/Models/pet';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UploadService } from 'src/app/Services/upload.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { ImageService } from 'src/app/Services/image.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-newpet',
  templateUrl: './newpet.component.html',
  styleUrls: ['./newpet.component.scss']
})
export class NewpetComponent implements OnInit {
  selectControl:FormControl = new FormControl();
  pet = {} as Pet;
  image = new Image();
  selectedFile: ImageSnippet;


  selectedGender = "Selecionar";
  selectedCastrated = "Selecionar";
  validateGender;
  validateCastrated;
  
  // @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  constructor(private petService: PetService, private router: Router, private uploadService: UploadService, private imageService: ImageService) { }

  ngOnInit(): void {
  }

  petRegister(pet: Pet){

    if(this.selectedCastrated == "Selecionar"){
      this.validateCastrated = true;
      return;
    }else{
      this.validateCastrated = false;
    }
    
    if(this.selectedGender == "Selecionar"){
      this.validateGender = true;
      return;
    } else{
      this.validateGender = false;
    }

    if(this.selectedGender == "Fêmea"){
      pet.gender = "Fêmea";
    }
    else{
      pet.gender = "Macho";
    }


    if(this.selectedCastrated == "Não"){
      pet.castrated = "Não";
    }
    else{
      pet.castrated = "Sim";
    }

    this.petService.createPet(
      pet.name, pet.age, pet.weight, 
      pet.gender, pet.castrated, pet.disease,
      pet.specie, pet.photo).subscribe(
        r => {
          alert(`Pet cadastrado com sucesso!`);
          this.router.navigate(['/profile']);
        },
        r => {
          alert(r.error.error);
        }
      )
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.image.src = this.selectedFile.src;
      this.pet.photo = this.image.src;
    });
    
    reader.readAsDataURL(file);
    //  this.myFile = this.dataURItoBlob(this.selectedFile.src);
    
  }

  //  myFile:Blob=this.processFile();

  // uploadFile(file) {  
  //   const formData = new FormData();  
  //   formData.append('file', file.data);  
  //   file.inProgress = true;  
  //   this.uploadService.upload(formData).pipe(  
  //     map(event => {  
  //       switch (event.type) {  
  //         case HttpEventType.UploadProgress:  
  //           file.progress = Math.round(event.loaded * 100 / event.total);  
  //           break;  
  //         case HttpEventType.Response:  
  //           this.pet.photo = event.body.link;
  //           return event;  
  //       }  
  //     }),  
  //     catchError((error: HttpErrorResponse) => {  
  //       file.inProgress = false;  
  //       return of(`${file.data.name} upload failed.`);  
  //     })).subscribe((event: any) => {  
  //       if (typeof (event) === 'object') {  
  //         console.log(event.body);  
  //       }  
  //     });  
  // }

  // uploadFiles() {  
  //   this.fileUpload.nativeElement.value = '';  
  //   this.files.forEach(file => {  
  //   this.uploadFile(file);  
  //   });  
  // }


  // onClick() {  
  //   const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
  //   for (let index = 0; index < fileUpload.files.length; index++)  
  //   {  
  //    const file = fileUpload.files[index];  
  //    this.files.push({ data: file, inProgress: false, progress: 0});  
  //   }  
  //     this.uploadFiles();  
  //   };  
  //   fileUpload.click();
  // }

  // buscarimagem(){

  // }
}



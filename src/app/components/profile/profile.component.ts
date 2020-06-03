import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Pet } from 'src/app/Models/pet';
import { PetService } from 'src/app/Services/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  pets = {} as Pet;
  pet;
  gender;
  castrated;
  userName;
  enableSave = false;
  IsTextBoxDisabled = true;
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;
  reloadPag = true;


  constructor(
    private modalService: NgbModal,
    private petService: PetService,
    private router: Router,
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit(): void { 


    setTimeout(() => {
      this.userName = sessionStorage.getItem('userName');
      this.petService.getPets().subscribe(
        r => {
          this.pets = r;          
        },
        r => {
          alert(r.error.error);
        }
      );   
    }, 0);
  }

  
  reload() {
    if (this.reload) {
      this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/profile']);
        this.reloadPag = false;
      });
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);

  }
  enableInput(){
    this.IsTextBoxDisabled = false;
    this.enableSave = true;
  }

  edit(){      
    this.petService.editPet(this.pet.id, this.pet.name, this.pet.age, 
                            this.pet.gender, this.pet.weight, this.pet.castrated, 
                            this.pet.disease, this.pet.specie, this.pet.photo_link).subscribe(
      r => {
        // this.reload(); 
      },
      r =>{
        alert(r.error.error);
      }
    );

  }

  delete(){
    this.petService.deletePet(this.pet.id).subscribe(
      r =>{

      },
      r => {
        alert(r.error.error);
      }
    );
    this.reload();
    this.router.navigate(['/']);
  }

  open(content, pet) {
    this.pet = pet;
    this.modalService.open(content, this.modalOptions).result.then((result) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
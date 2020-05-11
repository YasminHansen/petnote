import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/Services/pet.service';
import { Pet } from 'src/app/Models/pet';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-newpet',
  templateUrl: './newpet.component.html',
  styleUrls: ['./newpet.component.scss']
})
export class NewpetComponent implements OnInit {
  selectControl:FormControl = new FormControl();

  pet = {} as Pet;

  selectedGender;
  selectedCastrated;
  

  constructor(private petService: PetService, private router: Router) { }

  ngOnInit(): void {
  }

  petRegister(pet: Pet){

    if(this.selectedGender == "Fêmea"){
      pet.gender = 0;
    }
    else{
      pet.gender = 1;
    }


    if(this.selectedCastrated == "Não"){
      pet.castrated = 0;
    }
    else{
      pet.castrated = 1;
    }

    this.petService.createPet(
      pet.name, pet.age, pet.weight, 
      pet.gender, pet.castrated, pet.disease).subscribe(
        r => {
          alert(`Pet cadastrado com sucesso!`);
          this.router.navigate(['/profile']);
        },
        r => {
          alert(r.error.error);
        }
      )

  }

}



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-update-halls',
  templateUrl: './update-halls.component.html',
  styleUrls: ['./update-halls.component.css']
})
export class UpdateHallsComponent implements OnInit {
  updateForm!: FormGroup;
  partyHallId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private partyHallService: PartyHallService
  ) {}

  ngOnInit(): void {
    this.partyHallId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.partyHallService.getPartyHall(this.partyHallId).subscribe((partyHall) => {
      this.updateForm = this.formBuilder.group({
        name: [partyHall.name,Validators.required],
        address: this.formBuilder.group({
          street: [partyHall.address.street],
          city: [partyHall.address.city],
          state: [partyHall.address.state],
          country: [partyHall.address.country],
          postalcode: [partyHall.address.postalcode],
        }),
        capacity: [partyHall.capacity],
        amenities: this.formBuilder.array(partyHall.amenities),
        pricing: this.formBuilder.group({
          perHour: [partyHall.pricing.perHour],
          perDay: [partyHall.pricing.perDay],
          perWeek: [partyHall.pricing.perWeek],
        }),
        images: this.formBuilder.array(partyHall.images),
        geolocation: this.formBuilder.group({
          longitude: [partyHall.geolocation.longitude],
          latitude: [partyHall.geolocation.latitude],
        }),
      });
    });
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('name', this.updateForm.get('name')!.value);
      formData.append('address', JSON.stringify(this.updateForm.get('address')!.value));
      formData.append('capacity', this.updateForm.get('capacity')!.value);

      const amenityControls = (this.updateForm.get('amenities') as FormArray).controls;
      for (let i = 0; i < amenityControls.length; i++) {
        formData.append(`amenities[${i}]`, amenityControls[i].value);
      }

      formData.append('pricing', JSON.stringify(this.updateForm.get('pricing')!.value));

      const imageControls = (this.updateForm.get('images') as FormArray).controls;
      for (let i = 0; i < imageControls.length; i++) {
        formData.append(`images[${i}]`, imageControls[i].value);
      }

      formData.append('geolocation', JSON.stringify(this.updateForm.get('geolocation')!.value));

      this.partyHallService.updatePartyHall(this.partyHallId, formData).subscribe(() => {
        // do something on success
      });
    }
  }

  removeAmenity(index: number): void {
    const amenitiesArray = this.updateForm.get('amenities') as FormArray;
    amenitiesArray.removeAt(index);
  }

  addAmenity(): void {
    const amenitiesArray = this.updateForm.get('amenities') as FormArray;
    amenitiesArray.push(this.formBuilder.control(''));
  }

  removeImage(index: number): void {
    const imagesArray = this.updateForm.get('images') as FormArray;
    imagesArray.removeAt(index);
  }

  addImage(): void {
    const imagesArray = this.updateForm.get('images') as FormArray;
    imagesArray.push(this.formBuilder.control(''));
  }
}
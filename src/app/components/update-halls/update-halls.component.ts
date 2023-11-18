import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyHall } from 'src/app/models/party-hall';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-update-halls',
  templateUrl: './update-halls.component.html',
  styleUrls: ['./update-halls.component.css']
})
export class UpdateHallsComponent implements OnInit {

  updateForm!: FormGroup;
  partyHallId!: string;
  ownerId!: string;
  selectedPartyHall: PartyHall | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private partyHallService: PartyHallService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: [''],
      capacity: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        postalcode: ['']
      }),
      pricing: this.formBuilder.group({
        perHour: [''],
        perDay: [''],
        perWeek: ['']
      }),
      availability: [''],
      images: this.formBuilder.array([]),
      amenities: this.formBuilder.array([]),
      geolocation: this.formBuilder.group({
        longitude: [''],
        latitude: ['']
      }),
    });
  
    this.partyHallService.getSelectedPartyHall().subscribe(partyHall => {
      if (partyHall) {
        this.selectedPartyHall = partyHall;
        this.updateForm.patchValue({
          name: partyHall.name,
          capacity: partyHall.capacity,
          pricing: {
            perHour: partyHall.pricing.perHour,
            perDay: partyHall.pricing.perDay,
            perWeek: partyHall.pricing.perWeek
          },
          address: {
            street: partyHall.address.street,
            city: partyHall.address.city,
            state: partyHall.address.state,
            country: partyHall.address.country,
            postalcode: partyHall.address.postalcode
          },
          geolocation: {
            longitude: partyHall.geolocation.longitude,
            latitude: partyHall.geolocation.latitude
          },
          availability: partyHall.availability
        });
  
        const existingImages = partyHall.images;
        const imageControls = existingImages.map(img => this.formBuilder.control(img));
        this.updateForm.setControl('images', this.formBuilder.array(imageControls));
  
        const existingAmenities = partyHall.amenities;
        const amenityControls = existingAmenities.map(amenity => this.formBuilder.control(amenity));
        this.updateForm.setControl('amenities', this.formBuilder.array(amenityControls));
      }
    });
  }

  onUpdateSubmit() {
    const formValue = this.updateForm.value;
    const updatedPartyHall: PartyHall = {
      ...this.selectedPartyHall!,
      name: formValue.name,
      capacity: formValue.capacity,
      pricing: {
        perHour: formValue.pricing.perHour,
        perDay: formValue.pricing.perDay,
        perWeek: formValue.pricing.perWeek
      },
      address: {
        street: formValue.address.street,
        city: formValue.address.city,
        state: formValue.address.state,
        country: formValue.address.country,
        postalcode: formValue.address.postalcode
      },
      geolocation: {
        longitude: formValue.geolocation.longitude,
        latitude: formValue.geolocation.latitude
      },
      availability: formValue.availability,
      images: formValue.images,
      amenities: formValue.amenities
    };

    this.partyHallService.updatePartyHall(updatedPartyHall.id, updatedPartyHall).subscribe(
      (response: any) => {
        console.log('Party hall successfully updated!');
        // display success alert
      alert('Party hall information updated successfully!');
      
      // navigate to owner details page
      this.router.navigate(['/owner-dashboard/owner-details']);
      },
      error => {
        console.log(error);
      }
    );
  }

  get images(): FormArray {
    return this.updateForm.get('images') as FormArray;
  }

  addImage(): void {
    this.images.push(this.formBuilder.control(''));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  get amenities(): FormArray {
    return this.updateForm.get('amenities') as FormArray;
  }

  addAmenity(): void {
    this.amenities.push(this.formBuilder.control(''));
  }

  removeAmenity(index: number): void {
    this.amenities.removeAt(index);
  }

}
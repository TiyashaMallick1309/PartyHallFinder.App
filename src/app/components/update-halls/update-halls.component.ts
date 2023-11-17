import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyHall } from 'src/app/models/party-hall';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-update-halls',
  templateUrl: './update-halls.component.html',
  styleUrls: ['./update-halls.component.css']
})
export class UpdateHallsComponent {
  uploadForm!: FormGroup;
  uploadFailed = false;
  submitted = false;
  ownerId!: string;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private partyHallService: PartyHallService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.partyHallService.ownerId$.subscribe(id => {
      this.ownerId = id;
    });

    this.uploadForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, Validators.required],
      amenities: this.formBuilder.array([''], Validators.required),
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalcode: ['', Validators.required],
      }),
      pricing: this.fb.group({
        perHour: [0, Validators.required],
        perDay: [0, Validators.required],
        perWeek: [0, Validators.required]
      }),
      images: this.formBuilder.array([''], Validators.required),
      geolocation: this.fb.group({
        longitude: [0, Validators.required],
        latitude: [0, Validators.required]
      }),
    });
  }

  get amenities() {
    return this.uploadForm.get('amenities') as FormArray;
  }

  get images() {
    return this.uploadForm.get('images') as FormArray;
  }

  addAmenity() {
    this.amenities.push(this.formBuilder.control(''));
  }

  removeAmenity(index: number) {
    this.amenities.removeAt(index);
  }

  addImage() {
    this.images.push(this.formBuilder.control(''));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

async onUpload() {
    this.submitted = true; // set the property to true when the form is submitted
    if (this.uploadForm.errors !== null) {
      return;
    }

    const partyHallData: PartyHall = {
      id: this.uploadForm.get('id')?.value,
      availability: this.uploadForm.get('availability')?.value,
      ownerId: this.ownerId,
      name: this.uploadForm.get('name')?.value,
      capacity: this.uploadForm.get('capacity')?.value,
      amenities: this.uploadForm.get('amenities')?.value,
      images: this.uploadForm.get('images')?.value,
      address: {
        street: this.uploadForm.get('address.street')?.value,
        city: this.uploadForm.get('address.city')?.value,
        state: this.uploadForm.get('address.state')?.value,
        country: this.uploadForm.get('address.country')?.value,
        postalcode: this.uploadForm.get('address.postalcode')?.value,
      },
      pricing: {
        perHour: this.uploadForm.get('pricing.perHour')?.value,
        perDay: this.uploadForm.get('pricing.perDay')?.value,
        perWeek: this.uploadForm.get('pricing.perWeek')?.value
      },
      geolocation: {
        longitude: this.uploadForm.get('geolocation.longitude')?.value,
        latitude: this.uploadForm.get('geolocation.latitude')?.value
      }
    };

    try {
      this.partyHallService.addPartyHall(partyHallData).subscribe(response => {
        console.log(response);
      });

      const success = await this.partyHallService.uploadHall(
        partyHallData.name
      );

      if (success) {
        console.log("Upload successful!")
        this.uploadForm.reset();
      } else {
        this.uploadFailed = true;
      }
    } catch (error: any) {
      console.error('UPLOAD ERROR:', error);
      this.uploadFailed = true;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  fileName: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      eventDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      image: ['', [Validators.pattern('https?://.+')]], // URL validation
      maxParticipants: ['', [Validators.required, Validators.min(1)]],
      participantsCount: [0, [Validators.required, Validators.min(0)]],
      priceCents: ['', [Validators.required, Validators.min(0)]],
      resourceFile: [null],
      status: ['A_VENIR', Validators.required] // Added status field
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.eventForm.patchValue({ resourceFile: this.selectedFile });
    } else {
      this.selectedFile = null;
      this.fileName = null;
      this.eventForm.patchValue({ resourceFile: null });
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      const formValue = this.eventForm.value;

      // Append form fields to FormData
      Object.keys(formValue).forEach(key => {
        if ((key === 'eventDate' || key === 'endDate') && formValue[key]) {
          formData.append(key, `${formValue[key]}:00`);
        } else if (key !== 'resourceFile' && formValue[key] != null) {
          formData.append(key, formValue[key].toString());
        }
      });

      // Append file and file name
      if (this.selectedFile) {
        formData.append('resourceFile', this.selectedFile, this.selectedFile.name);
        formData.append('resourceFileName', this.selectedFile.name);
      }

      // Log FormData contents for debugging
      const formDataDebug: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        formDataDebug[key] = value;
      });
      console.log('FormData contents:', formDataDebug);

      this.eventService.addEvenement(formData).subscribe({
        next: (response) => {
          console.log('Événement créé avec succès', response);
          this.router.navigate(['/eventAdmin']);
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'événement', error);
        }
      });
    } else {
      console.log('Form is invalid:', this.eventForm.errors);
    }
  }

  onCancel(): void {
    this.eventForm.reset();
    this.fileName = null;
    this.selectedFile = null;
    this.router.navigate(['/eventAdmin']);
  }
}
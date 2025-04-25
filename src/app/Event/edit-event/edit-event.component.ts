import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { EventStatus } from '../../models/EventStatus';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  fileName: string | null = null;
  selectedFile: File | null = null;
  eventId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      eventDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      image: ['', [Validators.pattern('https?://.+')]],
      maxParticipants: ['', [Validators.required, Validators.min(1)]],
      participantsCount: [0, [Validators.required, Validators.min(0)]],
      priceCents: ['', [Validators.required, Validators.min(0)]],
      resourceFile: [null],
      status: ['A_VENIR', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.eventId)) {
      this.error = 'ID d\'événement invalide';
      this.loading = false;
      return;
    }
    this.loadEvent();
  }

  loadEvent(): void {
    if (this.eventId) {
      this.eventService.getEvenementById(this.eventId).subscribe({
        next: (event) => {
          console.log('Raw backend event:', event);
          const transformedEvent: Event = {
            id: event.id,
            resourceLink: event.resourceLink,
            resourceFileName: event.resourceFileName,
            title: event.title || 'Untitled Event',
            image: event.image,
            description: event.description || null,
            eventDate: this.convertDate(event.eventDate),
            endDate: this.convertDate(event.endDate),
            location: event.location || 'Unknown Location',
            maxParticipants: event.maxParticipants || 0,
            participantsCount: event.participantsCount || 0,
            priceCents: event.priceCents ?? 0,
            status: event.status || EventStatus.A_VENIR
          };
          this.eventForm.patchValue({
            title: transformedEvent.title,
            description: transformedEvent.description,
            eventDate: this.formatDateForInput(transformedEvent.eventDate),
            endDate: this.formatDateForInput(transformedEvent.endDate), // Fixed typo
            location: transformedEvent.location,
            image: transformedEvent.image,
            maxParticipants: transformedEvent.maxParticipants,
            participantsCount: transformedEvent.participantsCount,
            priceCents: transformedEvent.priceCents,
            status: transformedEvent.status
          });
          this.fileName = transformedEvent.resourceFileName || null;
          this.loading = false;
          console.log('Form populated:', this.eventForm.value);
        },
        error: (err) => {
          this.error = 'Échec du chargement de l\'événement';
          this.loading = false;
          console.error('Erreur lors du chargement:', err);
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.eventForm.patchValue({ resourceFile: this.selectedFile });
    } else {
      this.selectedFile = null;
      this.fileName = this.eventForm.get('resourceFileName')?.value || null;
      this.eventForm.patchValue({ resourceFile: null });
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid && this.eventId) {
      const formData = new FormData();
      const formValue = this.eventForm.value;

      Object.keys(formValue).forEach(key => {
        if ((key === 'eventDate' || key === 'endDate') && formValue[key]) {
          formData.append(key, `${formValue[key]}:00`);
        } else if (key !== 'resourceFile' && formValue[key] != null) {
          formData.append(key, formValue[key].toString());
        }
      });

      if (this.selectedFile) {
        formData.append('resourceFile', this.selectedFile, this.selectedFile.name);
        formData.append('resourceFileName', this.selectedFile.name);
      } else if (this.fileName) {
        formData.append('resourceFileName', this.fileName);
      }

      const formDataDebug: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        formDataDebug[key] = value;
      });
      console.log('FormData contents:', formDataDebug);

      this.eventService.updateEvenement(this.eventId, formData).subscribe({
        next: (response) => {
          console.log('Événement modifié avec succès', response);
          this.router.navigate(['/eventAdmin']);
        },
        error: (error) => {
          console.error('Erreur lors de la modification de l\'événement', error);
          this.error = 'Échec de la mise à jour de l\'événement';
        }
      });
    } else {
      console.log('Form is invalid:', this.eventForm.errors);
    }
  }

  onCancel(): void {
    this.eventForm.reset();
    fileName: null;
    this.selectedFile = null;
    this.router.navigate(['/eventAdmin']);
  }

  private convertDate(date: string | number[] | Date | null | undefined): string {
    if (date instanceof Date) {
      return date.toISOString();
    } else if (Array.isArray(date) && date.length >= 5) {
      const d = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
      return d.toISOString();
    } else if (typeof date === 'string') {
      return date;
    }
    return new Date().toISOString();
  }

  private formatDateForInput(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}